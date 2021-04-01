import React from 'react';
import { Transition } from 'react-spring/renderprops-universal';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';

const Alert = ({ children, items }) => (
  <div className='fixed z-30 bottom-0 flex justify-center w-full sm:pb-4'>
    <Transition
      items={items}
      from={{
        opacity: 0,
        transform: 'translateY(50%)',
      }}
      enter={{
        opacity: 1,
        transform: 'translateY(0)',
      }}
      leave={{
        opacity: 0,
        transform: 'translateY(50%)',
      }}>
      {show => props =>
        show && (
          <div
            style={props}
            className='relative flex-1 p-4 bg-white rounded-none sm:max-w-screen-sm sm:rounded-lg sm:shadow-lg'>
            <div className='absolute -top-6 inset-x-0 flex justify-center'>
              <StaticImage
                src='../../images/smsoftware-icon.png'
                alt='SMSoftware Logo'
                placeholder='blurred'
                quality={100}
                formats={['AUTO', 'PNG']}
                layout='fixed'
                width={64}
              />
            </div>
            {children}
          </div>
        )}
    </Transition>
  </div>
);

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.any.isRequired,
};

export default Alert;
