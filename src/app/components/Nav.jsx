"use client"
import Image from "next/image"
import { LOGOBLACK } from "../assets/img"
import { ARROWNAV, CART, MENU, PERSON, SEARCH, XMARK } from "../../../public/svg/svg"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Link from "next/link"
import { Link as ScrollLink } from "react-scroll";
import { useMove } from "../context/ausmovecontext"
import { useRouter } from "next/navigation"
import { useCart } from "../context/Cart"

const Nav = ({ color }) => {

    const [open, setopen] = useState(false)
    const [openmenu, setopenmenu] = useState(false)
    const { setScrollParams } = useMove()
    const Categoreref = useRef(null)
    const de = useRef(null)
    const navref = useRef(null)
    const nav1ref = useRef(null)
    const menuref = useRef(null)
    const arrowref = useRef(null)
    const leftref = useRef(null)
    const rightref = useRef(null)
    const { cart } = useCart()
    const router = useRouter();
    const handleGoTo = (path) => {
        if (isMobile) {
            handleopenmenu()

        }

        if (!isMobile & path==="category") {
            handleopen()

        }
        router.push(`/#${path}`)

    }

    function handleshopen() {
        if (openmenu) {
            handleopenmenu()
        }
    }

    // Handle mobile detection
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1022px)")
        setIsMobile(mediaQuery.matches)

        const handleResize = () => setIsMobile(mediaQuery.matches)
        mediaQuery.addEventListener("change", handleResize)

        return () => mediaQuery.removeEventListener("change", handleResize)
    }, [])


    const [cartQuantity, setCartQuantity] = useState(0)
    useEffect(() => {

        const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)
        setCartQuantity(totalQuantity)
    }, [cart])
    // Authentication state
    const [Authentication, setAuthentication] = useState(false)

    // Check localStorage for user data
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userdata"))) {
            setAuthentication(true)
        } else {
            setAuthentication(false)
        }
    }, [Authentication])

    // Toggle desktop category dropdown
    function handleopen() {
        if (!open) {
            gsap.fromTo(
                Categoreref.current,
                { y: "60%", opacity: 0, display: "none", duration: 0.3, ease: "power2.in" },
                { y: "65%", opacity: 1, display: "block" }
            )
            gsap.to(arrowref.current, { rotate: 180, duration: 0.3, ease: "power2.out" })
            setopen(true)
        } else {
            gsap.fromTo(
                Categoreref.current,
                { y: "65%", opacity: 1, display: "block" },
                { y: "30%", opacity: 0, display: "none", duration: 0.3, ease: "power2.in" }
            )
            gsap.to(arrowref.current, { rotate: "0deg", duration: 0.3, ease: "power2.in" })
            setopen(false)
        }
    }

    // Toggle mobile menu
    function handleopenmenu() {
        const isOpening = !openmenu;
        setopenmenu(isOpening);

        gsap.killTweensOf(menuref.current);
        gsap.killTweensOf(de.current);

        if (isOpening) {
            gsap.fromTo(
                menuref.current,
                { width: "0px", height: "0px" },
                { width: "2500px", height: "2500px", duration: 1.2, ease: "power2.out" }
            )
            gsap.fromTo(
                de.current,
                { display: "none", opacity: 0 },
                { display: "flex", opacity: 1, delay: 0.5 }
            )
        } else {
            gsap.fromTo(
                menuref.current,
                { width: "1500px", height: "1500px" },
                { width: "0px", height: "0px", duration: 0.7, ease: "power2.out" }
            )
            gsap.fromTo(
                de.current,
                { display: "flex", opacity: 1 },
                { opacity: 0, display: "none", duration: 0.1 }
            )
        }
    }

    // Animate navbar on mount
    useEffect(() => {
        gsap.fromTo(navref.current, { y: "-100px" }, { y: "0px", delay: 0.5 })
        gsap.fromTo(nav1ref.current, { y: "-100px" }, { y: "0px", delay: 0.5 })
    }, [])


    function handleright() {
        gsap.fromTo(rightref.current, { right: "0%" }, { right: "-100%", duration: "0.1s" })
        gsap.fromTo(leftref.current, { left: "-100%" }, { left: "0%", })


    }


    function handleleft() {
        gsap.fromTo(rightref.current, { right: "100%" }, { right: "0%", })
        gsap.fromTo(leftref.current, { left: "0%" }, { left: "-100%", })


    }

    // Disable body scroll when mobile menu is open
    useEffect(() => {
        if (openmenu) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';

        return () => { document.body.style.overflow = 'auto'; };
    }, [openmenu])

    return (
        <div>
            {/* Desktop Navbar */}
            <nav ref={navref} className={` ${color ? "bg-[#111111]" : ""} max-lg:hidden bgnav fixed z-[1000] flex gap-3 items-center justify-between py-[10px] px-[50px] w-full h-[90px] translate-y-[-100px]`}>
                <Link href="/">
                    <Image src={LOGOBLACK} width={70} height={70} alt="LOGO" className="rounded-[20px] bg-white cursor-pointer" />
                </Link>
                <div>
                    <ul className="relative flex items-center justify-center gap-10 text-white text-[22px] font-[200]">
                        <li onClick={handleopen} className="flex items-center justify-center gap-3 cursor-pointer">
                            Category
                            <div ref={arrowref}><ARROWNAV /></div>
                            <div ref={Categoreref} onClick={(e) => e.stopPropagation()} className="absolute z-50 left-[-20px] translate-y-[-105%] bgcategore">
                                <ul>
                                    <li onClick={() => handleGoTo("category")}>all</li>


                                    <li onClick={() => handleGoTo("category")}>women's clothing</li>



                                    <li onClick={() => handleGoTo("category")}>men's clothing</li>




                                    <li onClick={() => handleGoTo("category")}>jewelery</li>



                                </ul>
                            </div>
                        </li>
                        <Link href="/Find-a-Store"><li className="cursor-pointer lihover">Find a Store</li></Link>
                        {/* <ScrollLink to="about" smooth={true} duration={500}> */}

                        <li onClick={() => handleGoTo("about")} className="cursor-pointer lihover">About</li>

                        {/* </ScrollLink> */}
                    </ul>
                </div>
                <div className="flex items-center justify-center gap-5">
                    {/* <div className="cursor-pointer border-white border-[1px] rounded-full p-3"><SEARCH /></div> */}
                    <Link href="/cart" className=" relative cursor-pointer border-white border-[1px] rounded-full p-3">
                        <div className=" absolute w-5 h-5 rounded-full flex items-center justify-center bg-red-700 -top-1 -right-1">
                            <p className="text-white text-[12px]">{cartQuantity}</p>
                        </div>
                        <CART />

                    </Link>
                    <Link href={Authentication ? "/profile" : "/auth"} className="cursor-pointer bg-white flex items-center justify-center gap-2 p-1 pl-2 pr-5 rounded-full">
                        <div className="bg-black rounded-full p-3"><PERSON className="text-white" /></div>
                        <p>Profile</p>
                    </Link>
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav ref={nav1ref} className={`  ${color ? "bg-[#111111]" : ""} z-[1000] lg:hidden bgnav fixed  flex gap-3 items-center justify-between py-[0px] px-[50px] w-full h-[90px] max-lg:px-[10px] max-sm:h-[80px] translate-y-[-100px]`}>
                <Link href="/"
                    onClick={handleshopen}
                >

                    <Image src={LOGOBLACK} width={70} height={70} alt="LOGO" className="rounded-[20px] bg-white cursor-pointer max-sm:w-[60px]" />
                </Link>
                <div className="flex  items-center justify-center gap-5">
                    <Link className=" relative" href="cart">
                        <div className=" absolute w-5 h-5 rounded-full flex items-center justify-center bg-red-700 -top-1 -right-1">
                            <p className="text-white text-[12px]">{cartQuantity}</p>
                        </div>
                        <div className="cursor-pointer border-white border-[1px] rounded-full p-3"><CART /></div>

                    </Link>
                    <div className="border-white border-[1px] z rounded-full p-3 relative  ">
                        {!openmenu ? <MENU onClick={handleopenmenu} className="cursor-pointer" /> : <XMARK onClick={handleopenmenu} className="text-[#fff] cursor-pointer" />}
                        <div ref={menuref} className="rounded-full z-[-2] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#111111]" ></div>

                        <div ref={de} className="text-white w-[100vw] h-[100vh] absolute z[-1] right-[0px] max-sm:mt-[80px] hidden justify-start mt-[90px]">
                            <div ref={rightref} className="relative  right-[0%] max-sm:px-[20px] px-[100px]">
                                <ul className="flex flex-col text-[24px] gap-5">


                                    <Link href="/"
                                        onClick={handleopenmenu}
                                    >
                                        <li className="flex cursor-pointer items-center justify-start gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#fff" d="M6 19h3.692v-5.884h4.616V19H18v-9l-6-4.538L6 10zm-1 1V9.5l7-5.288L19 9.5V20h-5.692v-5.884h-2.616V20zm7-7.77" /></svg>
                                            <p> Home</p>
                                        </li>
                                    </Link>
                                    <li onClick={handleright} className="flex cursor-pointer items-center justify-start gap-2">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#fff" d="M12 2c-.5 0-1 .19-1.41.59l-3.3 3.29l4.71 4.7l4.71-4.7l-3.3-3.29C13 2.19 12.5 2 12 2M5.88 7.29l-3.29 3.3c-.79.78-.79 2.04 0 2.82l3.29 3.3l4.7-4.71zm12.24 0L13.42 12l4.7 4.71l3.29-3.3c.79-.78.79-2.04 0-2.82zM12 13.42l-4.71 4.7l3.3 3.29c.78.79 2.04.79 2.82 0l3.3-3.29z" /></svg>

                                        <p>Category</p>
                                        <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 12 24"><defs><path id="weuiArrowOutlined0" fill="#fff" d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z" /></defs><use fillRule="evenodd" href="#weuiArrowOutlined0" transform="rotate(-180 5.02 9.505)" /></svg>

                                    </li>

                                    <li onClick={() => handleGoTo("about")} className="flex cursor-pointer items-center justify-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#fff" d="M11.5 16.5h1V11h-1zm.5-6.923q.262 0 .439-.177t.176-.439t-.177-.438T12 8.346t-.438.177t-.177.439t.177.438t.438.177M12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>
                                        <p>About Us</p>
                                    </li>


                                    <Link href='/Find-a-Store'

                                    >
                                        <li className="flex cursor-pointer items-center justify-start gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M12.56 20.82a.96.96 0 0 1-1.12 0C6.611 17.378 1.486 10.298 6.667 5.182A7.6 7.6 0 0 1 12 3c2 0 3.919.785 5.333 2.181c5.181 5.116.056 12.196-4.773 15.64" /><path d="M12 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4" /></g></svg>
                                            <p>Find a Store</p>
                                        </li>
                                    </Link>
                                </ul>
                                {Authentication ? (
                                    <Link href="/profile" className="mt-10 cursor-pointer bg-white flex w-fit items-center justify-center gap-2 p-1 pl-2 pr-5 rounded-full">
                                        <div className="bg-black rounded-full p-3"><PERSON className="text-white" /></div>
                                        <p className="text-black">Profile</p>
                                    </Link>
                                ) : (
                                    <>
                                        <p className="max-w-[400px] mt-10">Pecome a SH Member for the best products, inspiration and stories in sport</p>
                                        <div className="flex items-center justify-cente gap-5 mt-5">
                                            <Link href="/auth" className="w-[100px] h-[40px] flex items-center justify-center rounded-full hover:bg-white hover:text-black hover:font-semibold transition border-[1px] border-white">Sign In</Link>
                                            <Link href="/auth" className="w-[100px] h-[40px] flex items-center justify-center rounded-full border-[1px] hover:bg-white hover:text-black hover:font-semibold transition border-white">Join Us</Link>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div ref={leftref} className=" absolute left-[100%] max-sm:left-[100%] max-sm:px-[20px] px-[100px]">
                                <ul className="flex flex-col text-[24px] gap-5">
                                    <li onClick={handleleft} className=" ml-5 mb-5 rotate-180 flex items-start justify-end">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 12 24"><defs><path id="weuiArrowOutlined0" fill="#fff" d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z" /></defs><use fillRule="evenodd" href="#weuiArrowOutlined0" transform="rotate(-180 5.02 9.505)" /></svg>
                                    </li>


                                    <li onClick={() => handleGoTo("category")} className="flex cursor-pointer items-center justify-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#fff" d="M6.5 11L12 2l5.5 9zm11 11q-1.875 0-3.187-1.312T13 17.5t1.313-3.187T17.5 13t3.188 1.313T22 17.5t-1.312 3.188T17.5 22M3 21.5v-8h8v8z" /></svg>
                                        <p> all</p>
                                    </li>

                                    <li onClick={() => handleGoTo("category")} className="flex cursor-pointer items-center justify-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 21H6s1.66-4.825 1.5-8c-.1-1.989-1.524-3.079-1-5c.23-.842 1-2 1-2S9 7 12 7s4.5-1 4.5-1s.77 1.158 1 2c.524 1.921-.9 3.011-1 5c-.16 3.175 1.5 8 1.5 8M7.5 6V3m9 3V3" /></svg>
                                        <p>women's clothing</p>
                                    </li>

                                    <li onClick={() => handleGoTo("category")} className="flex cursor-pointer items-center justify-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48"><g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><path d="M6 10L18 4H30L42 10L40 35H34V44H24H14V35H8L6 10Z" /><path d="M14 35L14 20" /><path d="M34 35V20" /><path d="M24 10C27.3137 10 30 7.31371 30 4H18C18 7.31371 20.6863 10 24 10Z" /></g></svg>
                                        <p>men's clothing</p>
                                    </li>



                                    <li onClick={() => handleGoTo("category")} className="flex cursor-pointer items-center justify-start gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#fff" d="M12 10L8 4.4L9.6 2h4.8L16 4.4zm3.5-3.2l-1.2 1.7c2.2.9 3.7 3 3.7 5.5a6 6 0 0 1-6 6a6 6 0 0 1-6-6c0-2.5 1.5-4.6 3.7-5.5L8.5 6.8C5.8 8.1 4 10.8 4 14a8 8 0 0 0 8 8a8 8 0 0 0 8-8c0-3.2-1.8-5.9-4.5-7.2" /></svg>
                                        <p>jewelery</p>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav
