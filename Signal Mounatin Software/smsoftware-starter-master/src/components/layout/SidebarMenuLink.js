import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import iconTypes from '../icons/types';
import { menuLink, menuLinkSelected } from './layout.module.css';

const SidebarMenuLink = ({ label, path, Icon, iconProps, selected, onClick }) => (
  <Link
    className={clsx('group flex items-center px-3 py-2 text-lg font-medium rounded-md sm:text-base', {
      [menuLink]: !selected,
      [menuLinkSelected]: selected,
    })}
    to={path}
    onClick={onClick}>
    <Icon {...iconProps} />
    {label}
  </Link>
);

SidebarMenuLink.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  iconProps: PropTypes.shape(iconTypes),
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};

SidebarMenuLink.defaultProps = {
  selected: false,
  onClick: () => {
    console.log('SidebarMenuLink onClick property not set');
  },
};

export default SidebarMenuLink;
