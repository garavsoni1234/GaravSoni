/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import './src/styles/global.css';
import { _wrapRootElement, _wrapPageElement } from './src/wrappers';

export const wrapRootElement = _wrapRootElement;
export const wrapPageElement = _wrapPageElement;

export const onRouteUpdate = () => {
  if (process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      reg.update();
    });
  }
};

export const onServiceWorkerUpdateReady = () => {
  if (process.env.NODE_ENV === 'production') {
    document.getElementById('___gatsby').setAttribute('data-update-available', 'true');
    console.info('PWA update available.');
  }
};
