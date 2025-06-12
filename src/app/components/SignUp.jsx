"use client"
import { useEffect, useState } from "react"
import { EMAIL, FacebookIcon, GOOGLE, LINKEDIN, LOCK, PERSON } from "../../../public/svg/svg"
import { useMove } from "../context/ausmovecontext"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import app from "../firebase/firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation"


const SignUp = () => {
    const [errormessage, seterrormessage] = useState("")
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [hidden, sethidden] = useState(true)
    const { move, handleMove } = useMove()
    const router = useRouter()




    const handleMovee = () => {
        handleMove()
        setdataauth({
            username: "",
            password: "",
            email: "",
        })
        seterrormessage("")
    }


    useEffect(() => {

        router.refresh("/")
    }, [])


    // SIGN UP
    const [dataauth, setdataauth] = useState({
        username: "",
        password: "",
        email: "",

    })
    const handleSubmit = (e) => {
        e.preventDefault()

        mutation.mutate(dataauth)
    }

    const mutation = useMutation({



        mutationFn: (newUser) => axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfSSIAwCs9q_aeCz8LEhi2O6gFdb-VLkk', {
            email: newUser.email,
            password: newUser.password,
            returnSecureToken: true
        })
            .then(res => res.data),
        onSuccess: (data) => {

            // setdataauth({
            //     username: "",
            //     password: "",
            //     email: "",
            // })
            localStorage.setItem(
                "userdata",
                JSON.stringify({
                    ...data,
                   name:dataauth.username
                })
            ); router.replace("/")

        },
        onError: (error) => {
            console.error('Signup error', error);

            if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
                seterrormessage(error.response.data.error.message);
            } else if (error.message === 'Network Error') {
                seterrormessage("Failed to connect to the server. Please check your internet connection or try using a VPN.");
            } else {
                seterrormessage("An unexpected error occurred. Please try again later.");
            }
        }

    });

    // SIGN UP


    // GOOGLEAUTH
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const handleGoogleSignIn = async () => {
        setLoadingGoogle(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (user && user.emailVerified !== false) {
                console.log("تم تسجيل الدخول بـ Google", user);
                localStorage.setItem("userdata", JSON.stringify(user));
                router.replace("/");
            } else {
                seterrormessage("Failed to retrieve user data.")
            }

        } catch (error) {
            seterrormessage("Google login error")


        }
        finally {
            setLoadingGoogle(false);
        }
    };
    // GOOGLEAUTH


    //  INPUT FOCUS
    const [focused, setFocused] = useState({
        email1: false,
        PassWord1: false,
        name: false
    })
    const handleBlur = (field) => {
        setFocused((prev) => ({ ...prev, [field]: false }))
    }
    const handleFocus = (field) => {
        setFocused((prev) => (
            { ...prev, [field]: true }
        )
        )

    }
    //  INPUT FOCUS
    return (


        <div className={`${move ? "inde2" : ""} absolute  ausshadow  flex sm:h-[85%]  h-[90%] items-center justify-center  lg:w-[70%]   bg-white rounded-md overflow-hidden 
            max-lg:w-[95%]
            max-sm:flex-col-reverse 
           

            
            `}>
            <div className={` ${move ? "move3" : "move1"} ${!move ? "hidden-move" : ""} flex-shrink-0 w-[60%] flex flex-col items-center justify-center overflow-hidden max-sm:overflow-y-auto 
                max-sm:h-[75%] max-sm:w-full 
                
                `}>
                <h1 className="text-[42px] px-5 text-center text-[#111111] font-semibold  pb-5 
                     max-sm:text-3xl max-sm:pb-6
                      hide-on-small-height

                    ">Create Account </h1>
                <div className="flex items-center gap-5  pb-5 ">
                    <div className="rounded-full overflow-hidden ewew relative border-[1px] p-2 border-gray-300 cursor-pointer">
                        <FacebookIcon />
                        <div className="" />
                    </div>
                    <div
                        onClick={handleGoogleSignIn}
                        className="rounded-full border-[1px] overflow-hidden ewew relative p-2 border-gray-300 cursor-pointer">
                        {loadingGoogle ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#141e30" strokeDasharray="16" strokeDashoffset="16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" /><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
                            : <GOOGLE />}

                    </div>
                    <div className="rounded-full border-[1px] overflow-hidden ewew relative p-2 border-gray-300 cursor-pointer">
                        <LINKEDIN />
                    </div>
                </div>
                <p className="pb-3 text-gray-600">
                    or use your email for registration
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 items-center w-[70%] pb-1">
                    <label htmlFor="name" className={`flex items-center bg-[#f3f3f3] px-[15px] py-[12px] w-full  ${focused.name && "ausinputhover"} `}>

                        <div>
                            <PERSON className=" text-[#8A8686]" />

                        </div>

                        <input
                            onFocus={() => handleFocus("name")}
                            onBlur={() => handleBlur("name")}
                            onChange={(e) => (setdataauth({ ...dataauth, username: e.target.value }))}
                            value={dataauth.username}
                            required
                            placeholder="name"
                            className="  outline-none border-none bg-transparent px-3 w-full"
                            id="name" type="text" />

                    </label>

                    <label htmlFor="email1" className={`flex items-center bg-[#f3f3f3] px-[15px] py-[12px] w-full  ${focused.email1 && "ausinputhover"} `}>

                        <div>
                            <EMAIL />
                        </div>


                        <input
                            onFocus={() => handleFocus("email1")}
                            onBlur={() => handleBlur("email1")}
                            onChange={(e) => (setdataauth({ ...dataauth, email: e.target.value }))}
                            value={dataauth.email}
                            required
                            placeholder="Email"
                            className="  outline-none border-none bg-transparent px-3 w-full"
                            id="email1" type="email" />

                    </label>

                    <label htmlFor="PassWord1" className={`flex items-center bg-[#f3f3f3] px-[15px] py-[12px] w-full  ${focused.PassWord1 && "ausinputhover"} `}>

                        <div>
                            <LOCK />
                        </div>


                        <input
                            placeholder="PassWord"
                            onFocus={() => handleFocus("PassWord1")}
                            onBlur={() => handleBlur("PassWord1")}
                            onChange={(e) => (setdataauth({ ...dataauth, password: e.target.value }))}
                            value={dataauth.password}
                            required
                            className=" outline-none border-none bg-transparent px-3 w-full"
                            id="PassWord1" type={hidden ? "password" : "text"} />


                        <label className="container ">
                            <input type="checkbox"
                                onChange={() => sethidden((prev) => !prev)}
                                checked={hidden}

                            />



                            <svg className="eye" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                            <svg className="eye-slash" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"></path></svg>
                        </label>

                    </label>
                    <p className="w-full max-sm:text-[12px] max-sm:font-medium text-red-600 text-center font-semibold">
                        {mutation.error ? errormessage : ""}
                    </p>
                    <button
                        disabled={mutation.isPending}

                        className=" text-white  w-32 h-12 rounded-3xl mt-1 ausbg cursor-pointer
                            max-sm:text-[12px] max-sm:w-24 max-sm:h-10 flex items-center justify-center "
                        type="submit"
                    >
                        {mutation.isPending ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="none" stroke="#fff" strokeDasharray="16" strokeDashoffset="16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" /><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>

                            : "SIGN UP"}
                    </button>

                </form>

            </div>

            <div className={` ${move ? "move4" : "move1"} ${!move ? "hidden-move" : ""} overflow-hidden max-sm:overflow-y-auto  py-5 w-[40%] h-[100%] text-white ausbg flex flex-col items-center justify-center px-5 
                max-sm:h-[25%]  max-sm:w-full 

                `}>
                <h1 className=" pb-7 text-center text-5xl font-semibold
                    max-sm:text-3xl max-sm:pb-4
                    ">Welcome Back!</h1>
                <div>
                    <p className=" max-w-60 pb-8 text-center text-gray-300 text-wrap
                    max-sm:text-[12px] max-sm:pb-4  max-sm:hidden
                    ">
                        To keep connected with us please login with your personal info
                    </p>
                </div>


                <button
                    onClick={handleMovee}
                    className="border-[1px] w-32 h-12 rounded-3xl
                    max-sm:text-[12px] max-sm:w-24 max-sm:h-10

                    hover:bg-white transition-all hover:text-[#141e30] hover:font-semibold
                    "

                >SIGN IN</button>
            </div>
        </div>






    )
}

export default SignUp