import React from 'react';
import hocFactory from '../util/hocFactory';
import Layout from '../components/layout/Layout';
import Root from '../components/Root';
import withAPI from './withAPI';
import withAuth from './withAuth';
import withRecoil from './withRecoil';

const BootstrapRoot = hocFactory(Root, [withRecoil, withAPI]);
const BootstrapPage = hocFactory(Layout, [withAuth]);

export const _wrapRootElement = ({ element }) => <BootstrapRoot>{element}</BootstrapRoot>;
export const _wrapPageElement = ({ element, props }) => <BootstrapPage {...props}>{element}</BootstrapPage>;
