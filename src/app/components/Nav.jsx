"use client"
import Image from "next/image"
import { LOGOBLACK } from "../assets/img"
import { ARROWNAV, CART, EMAIL, EMAILWHITE, MENU, PERSON, SEARCH, XMARK } from "../../../public/svg/svg"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Nav = () => {
    const [open, setopen] = useState(false)
    const [openmenu, setopenmenu] = useState(false)
    const Categoreref = useRef(null)
    const de = useRef(null)
    const navref = useRef(null)
    const nav1ref = useRef(null)
    const menuref = useRef(null)

    const arrowref = useRef(null)
    const router = useRouter



    function handleopen() {
        if (!open) {

            gsap.fromTo(
                Categoreref.current,

                {
                    y: "60%",
                    opacity: 0,
                    display: "none",
                    duration: 0.3,
                    ease: "power2.in",


                },
                {
                    y: "65%",
                    opacity: 1,
                    display: "block",



                }
            )
            gsap.to(arrowref.current, {
                rotate: 180,
                duration: 0.3,
                ease: "power2.out",
            })
            setopen(true)
        }
        else if (open) {
            gsap.fromTo(
                Categoreref.current,

                {
                    y: "65%",
                    opacity: 1,
                    display: "block"


                },
                {
                    y: "30%",
                    opacity: 0,
                    display: "none",
                    duration: 0.3,
                    ease: "power2.in",

                }

            )
            gsap.to(arrowref.current, {
                rotate: "0deg",
                duration: 0.3,
                ease: "power2.in",
            })
            setopen(false)
        }
    }

    function handleopenmenu() {
        const isOpening = !openmenu;
        setopenmenu(isOpening);

        gsap.killTweensOf(menuref.current); // 💡 يمنع تراكب الأنيميشنات

        if (isOpening) {
            gsap.fromTo(
                menuref.current,
                {
                    width: "0px",
                    height: "0px",
                },
                {
                    width: "2500px",
                    height: "2500px",
                    duration: 1.2,
                    ease: "power2.out",
                }
            );

            gsap.fromTo(
                de.current,
                {
                    display: "none",
                    opacity: 0,
                },
                {
                    display: "flex",
                    opacity: 1,
                    delay: 0.7

                }
            );
        } else {
            gsap.fromTo(
                menuref.current,
                {
                    width: "1500px",
                    height: "1500px",
                },
                {
                    width: "0px",
                    height: "0px",
                    duration: 0.7,
                    ease: "power2.out"
                }
            );


            gsap.fromTo(
                de.current,
                {
                    display: "flex",
                    opacity: 1,
                },
                {
                    opacity: 0,
                    display: "none",
                    duration: 0.2


                }
            );
        }
    }


    useEffect(() => {

        gsap.fromTo(
            navref.current,
            {
                y: "-100px"
            },
            {
                y: "0px",
                delay: 0.5
            })

        gsap.fromTo(
            nav1ref.current,
            {
                y: "-100px"
            },
            {
                y: "0px",
                delay: 0.5
            })


    }, [])



    console.log(openmenu)



    return (
        <div>

            <nav
                ref={navref}
                className="max-lg:hidden bgnav fixed z-30 flex gap-3 items-center justify-between py-[10px] px-[50px] w-full h-[90px]
                translate-y-[-100px]
                ">

                <Link href="/">
                    <Image
                        src={LOGOBLACK}
                        width={70}
                        height={70}
                        alt="LOGO"
                        className=" rounded-[20px] bg-white cursor-pointer"
                    />
                </Link>


                <div>
                    <ul className=" relative flex items-center justify-center gap-10 text-white text-[22px] font-[200]">
                        <li onClick={handleopen} className=" flex items-center justify-center gap-3 cursor-pointer ">Categore
                            <div ref={arrowref} className=" " >
                                <ARROWNAV />

                            </div>

                            <div ref={Categoreref} onClick={(e) => e.stopPropagation()} className=" absolute left-[-20px] translate-y-[-105%] bgcategore  ">
                                <ul>
                                    <li>test1</li>
                                    <li >test2</li>
                                    <li >test3</li>
                                    <li >test4</li>

                                </ul>

                            </div>

                        </li>
                        <li className=" cursor-pointer lihover">Sale</li>

                        <li className=" cursor-pointer lihover">About</li>

                    </ul>

                </div>

                <div className="flex items-center justify-center gap-5 ">
                    <div className=" cursor-pointer border-white border-[1px] rounded-full p-3">
                        <SEARCH />
                    </div>



                    <div className="cursor-pointer border-white border-[1px] rounded-full p-3">
                        <CART />
                    </div>



                    <Link href="/auth" className="cursor-pointer bg-white flex items-center justify-center gap-2 p-1 pl-2 pr-5 rounded-full">
                        <div className="bg-black rounded-full p-3">
                            <PERSON className=" text-white" />
                        </div>
                        <p>
                            Profile
                        </p>

                    </Link>

                </div>

            </nav>

            <nav ref={nav1ref} className="lg:hidden bgnav fixed z-30 flex gap-3 items-center justify-between py-[0px] px-[50px]  w-full h-[90px]
            max-lg:px-[10px] max-sm:h-[80px]  translate-y-[-100px]
            ">
                <Image
                    src={LOGOBLACK}
                    width={70}
                    height={70}
                    alt="LOGO"
                    className=" rounded-[20px] bg-white cursor-pointer
                    max-sm:w-[60px]
                    "
                />

                <div className="flex items-center justify-center gap-5 ">




                    <div className="cursor-pointer border-white border-[1px] rounded-full p-3">
                        <CART />
                    </div>


                    <div

                        className="cursor-pointer border-white border-[1px] z rounded-full p-3 relative">
                        {
                            !openmenu ?
                                <MENU onClick={handleopenmenu} />
                                :
                                <XMARK onClick={handleopenmenu} />


                        }



                        <div ref={menuref} className="  rounded-full z-[-2] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  bg-[#111111]   " >

                        </div>

                        <div ref={de} className="text-white w-[100vw] h-[100vh] absolute  z[-1]
                          top-0 right-[-11px]
                         max-sm:mt-[80px] hidden  justify-center    mt-[90px]
                         ">
                            <div className=" relative left-[11px]">

                                <ul>
                                    <li>
                                        Categore
                                    </li>

                                    <li>
                                        Sale
                                    </li>

                                    <li>
                                        About
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