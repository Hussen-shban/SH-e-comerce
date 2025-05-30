"use client"
import Image from "next/image"
import { LOGOBLACK } from "../assets/img"
import { ARROWNAV, CART, EMAIL, EMAILWHITE, MENU, SEARCH } from "../../../public/svg/svg"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

const Nav = () => {
    const [open, setopen] = useState(false)
    const Categoreref = useRef(null)
    const arrowref = useRef(null)


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
        else {
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



    return (
        <div>

            <nav className="max-lg:hidden fixed z-30 flex gap-3 items-center justify-between py-[10px] px-[50px] w-full h-[90px]  ">


                <Image
                    src={LOGOBLACK}
                    width={70}
                    height={70}
                    alt="LOGO"
                    className=" rounded-[20px] bg-white cursor-pointer"
                />

                <div>
                    <ul className=" relative flex items-center justify-center gap-10 text-white text-[22px] font-[200]">
                        <li onClick={handleopen} className=" flex items-center justify-center gap-3 cursor-pointer ">Categore
                            <div ref={arrowref} className=" " >
                                <ARROWNAV />
                                {/* rotate-180 */}
                            </div>

                            <div ref={Categoreref} className=" absolute left-[-20px] translate-y-[-105%] bgcategore ">
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



                    <div className="cursor-pointer bg-white flex items-center justify-center gap-2 p-1 pl-2 pr-5 rounded-full">
                        <div className="bg-black rounded-full p-3">
                            <EMAILWHITE />
                        </div>
                        <p>
                            Contact
                        </p>

                    </div>

                </div>

            </nav>

            <nav className="lg:hidden fixed z-30 flex gap-3 items-center justify-between py-[0px] px-[50px]  w-full h-[90px]
            max-lg:px-[10px] max-sm:h-[80px]
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

                    <div className="cursor-pointer border-white border-[1px] rounded-full p-3">
                        <MENU/>
                    </div>





                </div>
            </nav>

        </div>

    )
}
export default Nav