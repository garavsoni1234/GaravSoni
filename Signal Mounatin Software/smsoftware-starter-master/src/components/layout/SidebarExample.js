import React from 'react';
import { Transition, config } from 'react-spring/renderprops';
import { useRecoilState } from 'recoil';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import useOutsideClickListener from '../../hooks/useOutsideClickListener';
import BellIcon from '../icons/Bell';
import MenuAlt2Icon from '../icons/MenuAlt2';
import UserCircleIcon from '../icons/UserCircle';
import XIcon from '../icons/X';
import menuState from '../../states/menuState';
import SidebarMenu from './SidebarMenu';
import { navbarHeight } from './layout.module.css';

const SidebarExample = ({ children, title }) => {
  const [menu, setMenu] = useRecoilState(menuState);
  const [popup, setPopup] = React.useState(false);
  const popupRef = React.useRef();
  useOutsideClickListener(popupRef, () => {
    setPopup(false);
  });

  const toggleMenuState = () => {
    if (menu === 'open') {
      setMenu('closed');
    } else {
      setMenu('open');
    }
  };

  const toggleUserMenu = () => {
    setPopup(!popup);
  };

  return (
    <>
      {/* off-canvas menu for mobile */}
      <div className='md:hidden'>
        <Transition
          items={menu === 'open'}
          from={{
            opacity: 0,
            transform: 'translateX(-100%)',
          }}
          enter={{
            opacity: 1,
            transform: 'translateX(0)',
          }}
          leave={{
            opacity: 0,
            transform: 'translateX(-100%)',
          }}
          config={{ duration: 250 }}>
          {show =>
            show &&
            (props => (
              <div className='fixed z-40 inset-0 flex'>
                <div className='fixed inset-0' aria-hidden='true'>
                  <div className='absolute inset-0 bg-gray-600 opacity-75' />
                </div>
                <div
                  style={props}
                  className='relative flex flex-1 flex-col pb-4 pt-5 w-full max-w-xs bg-gradient-to-b from-smsoftware-blue to-smsoftware-blue-700'>
                  <div className='absolute right-0 top-0 -mr-12 pt-2'>
                    <button
                      className='flex items-center justify-center ml-1 w-10 h-10 rounded-full focus:outline-none focus:ring-white focus:ring-2 focus:ring-inset'
                      onClick={toggleMenuState}>
                      <span className='sr-only'>Close sidebar</span>
                      <XIcon className='w-8 h-8 text-white sm:w-6 sm:h-6' />
                    </button>
                  </div>
                  <SidebarMenu title={title} />
                </div>
                <div className='flex-shrink-0 w-14' aria-hidden='true' />
              </div>
            ))
          }
        </Transition>
      </div>

      {/* static sidebar for desktop */}
      <div className='hidden bg-gradient-to-b from-smsoftware-blue to-smsoftware-blue-700 md:flex md:flex-shrink-0'>
        <div className='flex flex-col w-64'>
          <div className='flex flex-col flex-grow pb-4 pt-5 overflow-y-auto'>
            <SidebarMenu title={title} />
          </div>
        </div>
      </div>

      {/* container for main content */}
      <div className='flex flex-1 flex-col w-0 overflow-hidden'>
        <div className={clsx('relative z-10 flex flex-shrink-0 bg-white shadow', [navbarHeight])}>
          <button
            className='px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-smsoftware-blue focus:ring-2 focus:ring-inset md:hidden'
            onClick={toggleMenuState}>
            <span className='sr-only'>Open sidebar</span>
            <MenuAlt2Icon className='w-8 h-8 sm:w-6 sm:h-6' />
          </button>

          <div className='flex flex-1 justify-between px-4'>
            <div className='flex flex-1 items-center'>
              <h1 className='hidden ml-2 text-2xl font-semibold sm:block md:hidden'>{title}</h1>
            </div>

            <div className='flex items-center ml-4 md:ml-6'>
              <button className='p-1 text-gray-400 hover:text-gray-500 bg-white rounded-full focus:outline-none focus:ring-smsoftware-blue focus:ring-offset-2 focus:ring-2'>
                <span className='sr-only'>View notifications</span>
                <BellIcon className='w-8 h-8 sm:w-6 sm:h-6' />
              </button>

              <div ref={popupRef} className='relative ml-3'>
                <button
                  id='user-menu'
                  className='flex items-center text-gray-400 hover:text-gray-500 bg-white rounded-full focus:outline-none focus:ring-smsoftware-blue focus:ring-offset-2 focus:ring-2'
                  aria-expanded={popup}
                  aria-haspopup='true'
                  onClick={toggleUserMenu}>
                  <span className='sr-only'>Open user menu</span>
                  <UserCircleIcon className='w-10 h-10 sm:w-8 sm:h-8' />
                </button>
                <Transition
                  items={popup}
                  from={{
                    opacity: 0,
                    transform: 'scale(0.9)',
                  }}
                  enter={{
                    opacity: 1,
                    transform: 'scale(1)',
                  }}
                  leave={{
                    opacity: 0,
                    transform: 'scale(0.9)',
                  }}
                  config={config.wobbly}>
                  {show =>
                    show &&
                    (props => (
                      <div
                        style={props}
                        className='absolute right-0 mt-2 py-1 w-48 bg-white rounded-md focus:outline-none shadow-lg origin-top-right ring-black ring-opacity-5 ring-1'
                        role='menu'
                        aria-orientation='vertical'
                        aria-labelledby='user-menu'>
                        <a href='/' className='block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100' role='menuitem'>
                          Your Profile
                        </a>
                        <a href='/' className='block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100' role='menuitem'>
                          Settings
                        </a>
                        <a href='/' className='block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100' role='menuitem'>
                          Sign out
                        </a>
                      </div>
                    ))
                  }
                </Transition>
              </div>
            </div>
          </div>
        </div>

        <main className='relative flex-1 focus:outline-none overflow-y-auto'>
          <div className='mx-auto px-2 max-w-7xl sm:px-6 lg:px-8'>{children}</div>
        </main>
      </div>
    </>
  );
};

SidebarExample.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default SidebarExample;
