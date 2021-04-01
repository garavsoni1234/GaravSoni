import React from 'react';
import clsx from 'clsx';
import Alert from '../shared/Alert';
import InformationCircleIcon from '../icons/InformationCircle';

const SWUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = React.useState(false);
  const buttonClasses = clsx(
    'text-sm font-medium rounded-md',
    'focus:outline-none focus:ring-smsoftware-blue focus:ring-offset-smsoftware-blue-50 focus:ring-offset-2 focus:ring-2'
  );

  const onUpdate = () => {
    window.location.reload(true);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      const available = document.getElementById('___gatsby').dataset.updateAvailable === 'true';
      if (available) {
        setUpdateAvailable(true);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Alert items={updateAvailable}>
      <div className='flex pt-10'>
        <div className='flex-shrink-0'>
          <InformationCircleIcon className='w-5 h-5 text-smsoftware-blue-400' />
        </div>
        <div className='flex-1 ml-3 md:flex md:justify-between'>
          <p className='text-smsoftware-blue text-sm'>A new update is available. Reload to see changes.</p>
          <div className='mt-3 md:ml-6 md:mt-0'>
            <button
              className={clsx('text-smsoftware-blue hover:bg-blue-50 bg-white', buttonClasses)}
              onClick={onUpdate}>
              Reload
            </button>
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default SWUpdate;
