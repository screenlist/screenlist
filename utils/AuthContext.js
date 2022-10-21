import { createContext } from "react"

const AuthContext = createContext({
	currentUser: null,
	setCurrentuser: () => {}
})
export default AuthContext