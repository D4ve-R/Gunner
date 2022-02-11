import { createContext } from 'react';

const _user = {
	alias: '',
	pub: '',
	epub: ''
}

const UserContext = createContext(_user);

export {_user, UserContext};