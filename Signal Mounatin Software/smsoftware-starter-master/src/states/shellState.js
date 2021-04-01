import { atom } from 'recoil';

const shellState = atom({
  key: 'shellState',
  default: 'navbar',
});

export default shellState;
