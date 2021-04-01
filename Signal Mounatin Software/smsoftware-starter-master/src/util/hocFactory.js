/**
 * A factory for wrapping a Component with specified HOCs (Higher-Order Components).
 *
 * (Note: set rtl = false if you want the OUTERMOST layer to be the LAST index)
 *
 * @author Jalo Moster <jlvmoster@gmail.com>
 * @version 3.0.0
 * @since 3/16/2021
 *
 * @param Component the component to wrap
 * @param wrappers the HOCs that wrap the Component
 * @param rtl wrap the component from the rightmost HOC to the leftmost HOC
 * @returns {React.Component}
 */
const hocFactory = (Component, wrappers = [], rtl = true) => {
  if (wrappers.length > 0) {
    if (rtl) {
      return wrappers.reduceRight((NewComponent, withWrapper) => withWrapper(NewComponent), Component);
    }
    return wrappers.reduce((NewComponent, withWrapper) => withWrapper(NewComponent), Component);
  }
  return Component;
};

export default hocFactory;
