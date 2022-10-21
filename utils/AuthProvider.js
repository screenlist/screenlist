import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import AuthContext from './AuthContext';
import { auth } from '../utils/firebase-config';



const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const value = {currentUser, setCurrentUser}
	
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	)
}

export default AuthProvider