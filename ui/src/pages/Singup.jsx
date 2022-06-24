import SignupForm from '../components/SingupForm'

const Signup = ({animateToast}) => {
    return (
        <div className='md:mt-6 flex content-center justify-center'>
            <SignupForm animateToast={animateToast}/>
        </div>
    )
}



export default Signup