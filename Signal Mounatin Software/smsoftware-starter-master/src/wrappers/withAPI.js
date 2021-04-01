import React from 'react';
import Amplify, { Analytics, Auth } from 'aws-amplify';
import { AUTH_TYPE, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache, split } from '@apollo/client';

Analytics.configure({ disabled: true });
Amplify.configure({
  Auth: {
    identityPoolId: process.env.COGNITO_IDENTITY_POOL,
    region: process.env.COGNITO_REGION || 'us-east-1',
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_USER_POOL_WEB_CLIENT_ID,
  },
  ssr: true,
});

/*
  This AppSync/Apollo implementation is currently a workaround taken from the awslabs/aws-mobile-appsync-sdk-js repo.
  Link to PR comment: https://github.com/awslabs/aws-mobile-appsync-sdk-js/pull/561#issuecomment-701696316
  
  TODO: Be on the lookout for a more official version of aws-appsync that allows integration with Apollo (or even Relay)
*/

const httpLink = new HttpLink({
  uri: process.env.APPSYNC_ENDPOINT,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    createAuthLink({
      url: process.env.APPSYNC_ENDPOINT,
      region: process.env.APPSYNC_REGION || 'us-east-1',
      auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
      },
    }),
    split(
      op => {
        const { operation } = op.query.definitions[0];
        return operation !== 'subscription';
      },
      httpLink,
      createSubscriptionHandshakeLink(
        {
          url: process.env.APPSYNC_ENDPOINT,
          region: process.env.APPSYNC_REGION || 'us-east-1',
          auth: {
            type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
            jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
          },
        },
        httpLink
      )
    ),
  ]),
});

const withAPI = Component => props => (
  <ApolloProvider client={client}>
    <Component {...props} />
  </ApolloProvider>
);

export default withAPI;
