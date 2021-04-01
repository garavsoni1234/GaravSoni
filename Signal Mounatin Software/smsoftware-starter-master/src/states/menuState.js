import { atom } from 'recoil';

const menuState = atom({
  key: 'menuState',
  default: 'open',
});

export default menuState;
