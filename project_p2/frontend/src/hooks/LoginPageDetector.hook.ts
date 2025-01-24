import { useLocation } from "react-router-dom"


const IsLoginPage = () : boolean => {
    const location = useLocation()
    return location.pathname == '/login'
}

export default IsLoginPage