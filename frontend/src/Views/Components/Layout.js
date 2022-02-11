import * as React from 'react';
import gun  from '../../Connection/P2P';
import { _user, UserContext } from '../../Connection/UserContext'; 

const Layout = ({children}) => {
	var user = gun.user()
	if (user.is)
		user = user.is;
	else
		user = _user;

	return (
	<>
		<UserContext.Provider value={user}>
			{children}	
		</UserContext.Provider>
	</>
	);
}

export default Layout;