import React from 'react';
import clsx from 'clsx';

import useIosPrompt from '../../hooks/useIosPrompt';
import useWebPrompt from '../../hooks/useWebPrompt';
import Alert from '../shared/Alert';
import InformationCircleIcon from '../icons/InformationCircle';
import ShareIcon from '../icons/Share';

const A2HS = () => {
  const [confirm, setConfirm] = React.useState(false);
  const [iosInstallPrompt, onIosDecline] = useIosPrompt();
  const [webInstallPrompt, onWebDecline, onWebInstall] = useWebPrompt();
  const buttonClasses = clsx(
    'text-sm font-medium rounded-md',
    'focus:outline-none focus:ring-smsoftware-blue focus:ring-offset-smsoftware-blue-50 focus:ring-offset-2 focus:ring-2'
  );

  const onDismiss = () => {
    setConfirm(true);
  };

  const onCancelDismiss = () => {
    setConfirm(false);
  };

  const onConfirmDismiss = () => {
    if (iosInstallPrompt) {
      onIosDecline();
    } else {
      onWebDecline();
    }
  };

  if (!(iosInstallPrompt || webInstallPrompt)) return null;

  return (
    <Alert items={iosInstallPrompt || webInstallPrompt}>
      <div className='flex pt-8 sm:pt-4'>
        <div className='flex-shrink-0'>
          <InformationCircleIcon className='w-5 h-5 text-smsoftware-blue-400' />
        </div>

        <div className='flex-1 ml-3'>
          <h3 className='text-smsoftware-blue text-sm font-medium'>Install Available</h3>
          {iosInstallPrompt && (
            <div className='mt-4 text-smsoftware-blue text-sm sm:mt-6'>
              <p className='block sm:hidden'>For iOS:</p>
              <div className='flex flex-1 items-center mt-2 space-x-1 sm:mt-0'>
                <div>
                  <p className='hidden sm:block'>For iOS, tap</p>
                  <p className='block sm:hidden'>Tap </p>
                </div>
                <ShareIcon className='w-6 h-6' />
                <p>then "Add to Home Screen"</p>
              </div>
            </div>
          )}
          <div className='mt-4'>
            <div className='flex items-center justify-end -mx-2 -my-1.5 space-x-2'>
              {confirm ? (
                <>
                  <h3 className='text-smsoftware-blue text-sm font-medium'>Are you sure?</h3>
                  <button
                    className={clsx('px-2 py-1.5 text-smsoftware-blue hover:bg-blue-50 bg-white', buttonClasses)}
                    onClick={onConfirmDismiss}>
                    Yes
                  </button>
                  <button
                    className={clsx('px-2 py-1.5 text-smsoftware-blue hover:bg-blue-50 bg-white', buttonClasses)}
                    onClick={onCancelDismiss}>
                    No
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={clsx('px-2 py-1.5 text-gray-500 hover:bg-gray-100 bg-white', buttonClasses)}
                    onClick={onDismiss}>
                    Dismiss
                  </button>
                  {webInstallPrompt && (
                    <button
                      className={clsx('px-2 py-1.5 text-smsoftware-blue hover:bg-blue-50 bg-white', buttonClasses)}
                      onClick={onWebInstall}>
                      Install
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default A2HS;
