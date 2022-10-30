import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import AuthContext from './AuthContext';
import { auth } from '../utils/firebase-config';



const AuthProvider = ({ children, value }) => {	
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	)
}

export default AuthProvider