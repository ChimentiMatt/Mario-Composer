import { Navigate } from "react-router-dom";
import { useGlobal } from "reactn"

const LogoutButton = (props) => {
    const [logginLoad, setLogginLoad] = useGlobal("logginLoad")
    const [token, setToken] = useGlobal("token")
    const [user, setUser] = useGlobal("user")
    const [songList, setsongList ] = useGlobal("songList")
    
    const handleClick = () =>{
        setToken(null)
        setUser(null)
        setsongList([])
    }

    return (
        <>
            {!user && <Navigate replace to={props.to || "/"}/>}
            <button onClick={handleClick} className="md:relative z-50 ml-2 pl-2 md:mt-6 pr-2 pt-1 md:text-2xl text-center rounded-lg">Logout</button>
        
        </>
    )
}

export default LogoutButton