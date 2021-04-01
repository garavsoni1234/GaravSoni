import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { menuLink, menuLinkSelected } from './layout.module.css';

const NavbarMenuLink = ({ label, path, selected, onClick }) => (
  <Link
    className={clsx('px-3 py-2 text-base font-medium rounded-md', {
      [menuLink]: !selected,
      [menuLinkSelected]: selected,
    })}
    to={path}
    onClick={onClick}>
    {label}
  </Link>
);

NavbarMenuLink.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

NavbarMenuLink.defaultProps = {
  selected: false,
  onClick: () => {
    console.log('NavbarMenuLink onClick property not set');
  },
};

export default NavbarMenuLink;
