import SignIn from "../components/SignIn"
import SignUp from "../components/SignUp"
import MoveProvider from "../context/ausmovecontext"


const Auth = () => {
    return (
        <div className=" relative flex items-center justify-center sm:h-screen bg-gray-100
                        max-sm:min-h-[100vh] 
        ">
            <MoveProvider>
                <SignIn />
                <SignUp />
            </MoveProvider>


        </div>
    )
}


export default Auth