import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';

import CubeTransparentIcon from '../icons/CubeTransparent';
import HomeIcon from '../icons/Home';
import menuState from '../../states/menuState';
import pageState from '../../states/pageState';
import SidebarMenuLink from './SidebarMenuLink';

const SidebarMenu = ({ title }) => {
  const setMenu = useSetRecoilState(menuState);
  const [page, setPage] = useRecoilState(pageState);
  const iconClasses = 'mr-4 w-8 h-8 sm:w-6 sm:h-6 text-smsoftware-blue-200';

  const onMenuLinkClick = path => () => {
    setMenu('closed');
    setPage(path);
  };

  return (
    <>
      <div className='flex flex-shrink-0 items-center px-4'>
        <StaticImage
          src='../../images/smsoftware-icon.png'
          alt='SMSoftware Logo'
          placeholder='blurred'
          quality={100}
          formats={['AUTO', 'PNG']}
          layout='fixed'
          width={32}
        />
        <h1 className='ml-2 text-white text-xl font-semibold'>{title}</h1>
      </div>
      <nav className='flex flex-1 flex-col mt-5'>
        <div className='flex-1 px-2 space-y-2'>
          <SidebarMenuLink
            label='Home'
            path='/'
            Icon={HomeIcon}
            iconProps={{ className: iconClasses }}
            selected={page === '/'}
            onClick={onMenuLinkClick('/')}
          />
          <SidebarMenuLink
            label='Example'
            path='/example'
            Icon={CubeTransparentIcon}
            iconProps={{ className: iconClasses }}
            selected={page === '/example'}
            onClick={onMenuLinkClick('/example')}
          />
        </div>
      </nav>
    </>
  );
};

SidebarMenu.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SidebarMenu;
