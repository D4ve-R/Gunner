import * as React from 'react';
import { Route, Routes, Navigate, } from 'react-router-dom';
import Home from './Views/Home';
import SignIn from './Views/SignIn';
import SignUp from './Views/SignUp';
import { UserContext, user } from './Connection/User';
import './App.css';
import Dashboard from './Views/Dashboard';

const Layout = ({children}) => {
	return (
	<>
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	</>
	);
}

function App() {
  return (
	<Routes>
      <Route path="/" element={<Layout children={<Home/>} />}>
		  <Route path=":alias" element={<Layout children={<Home/>} />}/>
	  </Route>
	  <Route path="/dashboard" element={<Layout children={<Dashboard/>} />}>
		  <Route path=":alias" element={<Layout children={<Dashboard/>} />}/>
	  </Route>
      <Route path="/signin" element={<Layout children={<SignIn/>} />} />
	  <Route path="/signup" element={<Layout children={<SignUp/>} />} />
	  <Route path="*" element={<Navigate to="/"/>}/>
	</Routes>
  );
}

export default App;
