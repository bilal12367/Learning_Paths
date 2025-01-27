import { useLocation } from "react-router-dom"


const IsAuthPage = (): boolean => {
    const location = useLocation()
    return location.pathname.startsWith("/auth") || location.pathname.startsWith("auth")
}

export default IsAuthPage