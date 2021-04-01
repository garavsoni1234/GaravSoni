import React from 'react';
import { useSetRecoilState } from 'recoil';
import { gql, useQuery } from '@apollo/client';

import SEO from '../components/shared/SEO';
import shellState from '../states/shellState';

const IndexPage = () => {
  const setShell = useSetRecoilState(shellState);
  const { loading, error, data } = useQuery(
    gql`
      query GetItem($id: ID!) {
        getItem(id: $id) {
          id
          sub
          note
        }
      }
    `,
    { variables: { id: 'test' } }
  );

  const onClick = shell => () => {
    setShell(shell);
  };

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('loading:', loading);
      console.log('error:', error);
      console.log('data:', data);
    }
  }, [loading, error, data]);

  return (
    <>
      <SEO title='Home' />
      <div className='mt-4'>
        <span className='relative z-0 inline-flex rounded-md shadow-sm'>
          <button
            className='focus:border-ring-smsoftware-blue relative focus:z-10 inline-flex items-center px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-50 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-smsoftware-blue focus:ring-1'
            type='button'
            onClick={onClick('navbar')}>
            Navbar Example
          </button>
          <button
            className='focus:border-ring-smsoftware-blue relative focus:z-10 inline-flex items-center -ml-px px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-50 bg-white border border-gray-300 rounded-r-md focus:outline-none focus:ring-smsoftware-blue focus:ring-1'
            type='button'
            onClick={onClick('sidebar')}>
            Sidebar Example
          </button>
        </span>
      </div>
    </>
  );
};

export default IndexPage;
