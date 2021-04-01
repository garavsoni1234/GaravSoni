import React from 'react';
import { useRecoilState } from 'recoil';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';

import CubeTransparentIcon from '../icons/CubeTransparent';
import HomeIcon from '../icons/Home';
import pageState from '../../states/pageState';
import NavbarMobileMenuLink from './NavbarMobileMenuLink';
import NavbarMenuLink from './NavbarMenuLink';

import { navbarHeight } from './layout.module.css';

const NavbarExample = ({ children, title }) => {
  const [page, setPage] = useRecoilState(pageState);

  const onMenuLinkClick = path => () => {
    setPage(path);
  };

  return (
    <>
      <div className='bg-gradient-to-r shadow-md from-smsoftware-blue to-smsoftware-blue-700'>
        <div className='mx-auto px-2 max-w-7xl sm:px-6 lg:px-8'>
          <div className={clsx('relative flex items-center justify-between', [navbarHeight])}>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='flex flex-1 items-center justify-center sm:justify-start'>
                <StaticImage
                  className='block sm:hidden'
                  src='../../images/smsoftware-icon.png'
                  alt='SMSoftware Logo'
                  placeholder='blurred'
                  quality={100}
                  formats={['AUTO', 'PNG']}
                  layout='fixed'
                  width={64}
                />
                <StaticImage
                  className='hidden sm:block'
                  src='../../images/smsoftware-icon.png'
                  alt='SMSoftware Logo'
                  placeholder='blurred'
                  quality={100}
                  formats={['AUTO', 'PNG']}
                  layout='fixed'
                  width={32}
                />
                <h1 className='hidden ml-2 text-white text-2xl sm:block'>{title}</h1>
              </div>
              <nav className='hidden sm:block'>
                <div className='flex space-x-4'>
                  <NavbarMenuLink label='Home' path='/' selected={page === '/'} onClick={onMenuLinkClick('/')} />
                  <NavbarMenuLink
                    label='Example'
                    path='/example'
                    selected={page === '/example'}
                    onClick={onMenuLinkClick('/example')}
                  />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <main className='container mx-auto px-2 max-w-7xl sm:px-6 lg:px-8'>{children}</main>
      <nav className='fixed bottom-0 inset-x-0 block w-full bg-gradient-to-r shadow-md from-smsoftware-blue to-smsoftware-blue-700 sm:hidden'>
        <div className='mx-auto px-2'>
          <div className='relative flex items-center justify-center h-16'>
            <NavbarMobileMenuLink
              Icon={HomeIcon}
              iconProps={{
                className: clsx({
                  'w-8 h-8': page === '/',
                  'w-6 h-6': page !== '/',
                }),
              }}
              path='/'
              selected={page === '/'}
              onClick={onMenuLinkClick('/')}
            />
            <NavbarMobileMenuLink
              Icon={CubeTransparentIcon}
              iconProps={{
                className: clsx({
                  'w-8 h-8': page === '/example',
                  'w-6 h-6': page !== '/example',
                }),
              }}
              path='/example'
              selected={page === '/example'}
              onClick={onMenuLinkClick('/example')}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

NavbarExample.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default NavbarExample;
