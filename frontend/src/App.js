import * as React from 'react';
import { Route, Routes, Navigate, } from 'react-router-dom';
import Home from './Views/Home';
import SignIn from './Views/SignIn';
import SignUp from './Views/SignUp';
import Dashboard from './Views/Dashboard';
import Layout from './Views/Components/Layout';
import Test from './Views/Test';
import { GunContext, gun } from './hooks/useGun';
import './App.css';

function App() {
  return (
	<GunContext.Provider value={gun}>
	<Routes>
	  <Route path="/dashboard" element={<Layout children={<Dashboard/>} />}/>
      <Route path="/signin" element={<Layout children={<SignIn/>} />} />
	  <Route path="/signup" element={<Layout children={<SignUp/>} />} />
	  <Route path="/test" element={<Test></Test>}/>
	  <Route path="/" element={<Layout children={<Home/>} />}>
		  <Route path=":alias" element={<Layout children={<Home/>} />}/>
	  </Route>
	  <Route path="*" element={<Navigate to="/"/>}/>
	</Routes>
	</GunContext.Provider>
  );
}

export default App;
