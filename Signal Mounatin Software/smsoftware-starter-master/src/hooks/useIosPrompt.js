import useIosCheck from './useIosCheck';
import useShowPrompt from './useShowPrompt';

const useIosPrompt = () => {
  const isIOS = useIosCheck();
  const [showPrompt, onPromptViewed] = useShowPrompt('ios');
  return [showPrompt && isIOS, onPromptViewed];
};

export default useIosPrompt;
