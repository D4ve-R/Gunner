import { createContext } from 'react';

 const user = {
	alias: '',
	pub: '',
}

const UserContext = createContext({
	user: user,
	setUser: () => {},
});


export {user, UserContext};