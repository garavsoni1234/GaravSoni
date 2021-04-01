import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import iconTypes from '../icons/types';
import { mobileMenuLink, mobileMenuLinkSelected } from './layout.module.css';

const NavbarMobileMenuLink = ({ Icon, iconProps, path, selected, onClick }) => (
  <Link
    className={clsx('flex items-center justify-center p-1 w-24 h-16 focus:outline-none', {
      [mobileMenuLink]: !selected,
      [mobileMenuLinkSelected]: selected,
    })}
    to={path}
    onClick={onClick}>
    <Icon {...iconProps} />
  </Link>
);

NavbarMobileMenuLink.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  iconProps: PropTypes.shape(iconTypes),
  path: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

NavbarMobileMenuLink.defaultProps = {
  selected: false,
  onClick: () => {
    console.log('NavbarMobileMenuLink onClick property not set');
  },
};

export default NavbarMobileMenuLink;
