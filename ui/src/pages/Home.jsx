import { Link } from 'react-router-dom'
import { useGlobal } from 'reactn'
import LogoutButton from '../components/LogoutButton'

const Home = () => {
  const [user, setUser] = useGlobal("user")

  return (
    <nav className='flex'>
      {!user && <>
        <Link className="ml-2 pl-2 pr-2 md:mt-6 pt-1 md:text-2xl md:h-[2.5rem] text-center  bg-white border-2 border-black rounded-lg" to="/login">LOGIN</Link>
        <p className=' p-1 pl-2 pr-2 text-white'>  </p>
        <Link className="ml-2 md:pl-2 md:mt-6 pr-2 pt-1 md:text-2xl text-center text-white  rounded-lg hover:text-black" to="/signup">SIGN-UP</Link>
      </>}
      {user && <LogoutButton to="/" >Logout</LogoutButton>}
    </nav>
  )
}

export default Home