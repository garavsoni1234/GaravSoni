import React from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import shellState from '../../states/shellState';
import A2HS from './A2HS';
import SWUpdate from './SWUpdate';
import NavbarExample from './NavbarExample';
import SidebarExample from './SidebarExample';

const ShellSwitch = ({ children, title }) => {
  const shell = useRecoilValue(shellState);
  switch (shell) {
    case 'navbar':
      return (
        <div className='flex flex-col h-screen bg-gray-100 overflow-hidden'>
          <NavbarExample title={title}>{children}</NavbarExample>
        </div>
      );
    case 'sidebar':
      return (
        <div className='flex h-screen bg-gradient-to-b from-gray-100 to-gray-400 overflow-hidden'>
          <SidebarExample title={title}>{children}</SidebarExample>
        </div>
      );
    default:
      return (
        <div className='flex flex-col h-screen bg-gray-100 overflow-hidden'>
          <NavbarExample title={title}>{children}</NavbarExample>
        </div>
      );
  }
};

const Layout = ({ children }) => {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <ShellSwitch title={site.siteMetadata.title}>{children}</ShellSwitch>
      <A2HS />
      <SWUpdate />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
