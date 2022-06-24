import Login from '../pages/Login'
import Signup from '../pages/Singup'
import Home from '../pages/Home'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

const Navbar = ({animateToast}) => {
  return (
    <div className='flex w-full md:justify-center '>
      <div className=" md:h-[5rem] flex text-[1rem] md:w-5/6 justify-between content-center  ">
        <div className="flex text-[1.5rem] md:text-8xl">
          <h1 className='logo'>
            <span className='text-red-600'>M</span>
            <span className='text-green-600'>A</span>
            <span className='text-yellow-400'>R</span>
            <span className='text-blue-500'>I</span>
            <span className='text-green-600 mr-5'>O</span>
          </h1>

          <h1 className='logo '>
            <span className='text-blue-500'>M</span>
            <span className='text-yellow-400'>u</span>
            <span className='text-red-600'>s</span>
            <span className='text-blue-400'>i</span>
            <span className='text-green-600'>c</span>
          </h1>
        </div>
      
        <BrowserRouter>
          <Routes>
            <Route className="pr-1" path="/" element={<Home />} />
            <Route path="/login" element={<Login animateToast={animateToast}/>} />
            <Route path="/signup" element={<Signup animateToast={animateToast}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default Navbar