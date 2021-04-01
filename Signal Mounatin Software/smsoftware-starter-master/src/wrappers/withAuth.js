import React from 'react';
import { Auth } from 'aws-amplify';

const SignIn = ({ credentials, setCredentials, onSubmit }) => {
  const onChange = type => event => {
    setCredentials(credentials => ({ ...credentials, [type]: event.target.value }));
  };

  return (
    <div>
      <input type='text' value={credentials.username} onChange={onChange('username')} />
      <input type='password' value={credentials.password} onChange={onChange('password')} />
      <button onClick={onSubmit}>login</button>
    </div>
  );
};

const withAuth = Component => props => {
  const [credentials, setCredentials] = React.useState({ username: '', password: '' });
  const [authenticated, setAuthenticated] = React.useState(false);

  const onSubmit = () => {
    Auth.signIn({
      username: credentials.username,
      password: credentials.password,
    })
      .then(user => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          const { requiredAttributes } = user.challengeParam;
          if (process.env.NODE_ENV === 'development') {
            console.log('required attributes:', requiredAttributes);
          }
        }

        if (user) {
          setAuthenticated(true);
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }
      });
  };

  React.useEffect(() => {
    let mounted = true;

    Auth.currentAuthenticatedUser()
      .then(user => {
        if (mounted && user) {
          setAuthenticated(true);
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }
        setAuthenticated(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!authenticated) {
    return <SignIn credentials={credentials} setCredentials={setCredentials} onSubmit={onSubmit} />;
  }

  return <Component {...props} />;
};

export default withAuth;
