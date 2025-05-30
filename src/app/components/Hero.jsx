"use client"
import Image from "next/image"
import { hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8, LOGO, LOGOBLACK, LOGOWHITE } from "../assets/img"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ARROW } from "../../../public/svg/svg"
import { Typewriter } from "react-simple-typewriter"

const Hero = () => {

    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)")
        setIsMobile(mediaQuery.matches)

        const handleResize = () => setIsMobile(mediaQuery.matches)
        mediaQuery.addEventListener("change", handleResize)

        return () => mediaQuery.removeEventListener("change", handleResize)
    }, [])

    const img1ref = useRef(null)
    const img2ref = useRef(null)
    const img3ref = useRef(null)

    const img6ref = useRef(null)
    const [showText, setShowText] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true)
        }, 3500)

        return () => clearTimeout(timer) 
    }, [])
    useEffect(() => {
        const images = img1ref.current.querySelectorAll("img");
        const images1 = img3ref.current.querySelectorAll("img");

        const firstimg = images[0]
        const secondImg = images[1];
        const thirdImg = images1[0];
        const fourthImg = images1[1];


        gsap.fromTo(
            img1ref.current,
            { y: "-150%" },
            {
                y: 0,

                duration: 1.2,
                delay: 0,
                ease: "power3.out"
            }
        )





        gsap.fromTo(
            img2ref.current,
            { y: "-150%" },
            {
                y: 0,

                duration: 1.2,
                delay: 0.2,
                ease: "power3.out"
            }
        )


        gsap.fromTo(
            img3ref.current,
            { y: "-150%" },
            {
                y: 0,

                duration: 1.2,
                delay: 0.4,
                ease: "power3.out"
            }
        )



        gsap.fromTo(
            secondImg
            ,
            {
                display: "none",
                y: "100%"

            },
            {
                display: "block",
                y: "0%",
                marginTop: "3%",
                delay: 1.3,
                duration: 0.9,
                ease: "power3.out"


            }
        )


        gsap.fromTo(
            firstimg
            ,
            {

                height: "100%"
            },
            {

                delay: 1.3,
                height: "48%",
                duration: 0.9,
                ease: "power3.out"

            }
        )




        gsap.fromTo(
            thirdImg
            ,
            {
                display: "none",
                y: "-100%",


            },
            {
                display: "block",
                y: "0%",
                marginBottom: "3%",
                delay: 1.3,
                duration: 1,
                ease: "power3.out"

            }
        )


        gsap.fromTo(
            fourthImg
            ,
            {

                height: "100%"
            },
            {

                delay: 1.3,
                height: "48%",
                duration: 1,
                ease: "power3.out",


            }
        )





        gsap.fromTo(
            img1ref.current,
            {
                opacity: 1,
                display: "block",

            },
            {
                opacity: 0,
                display: "none",
                delay: 2.4,
                duration: 0.3


            }
        )
        if (!isMobile) {
            gsap.fromTo(
                img2ref.current,
                {
                    opacity: 1,
                    display: "block"

                },
                {
                    opacity: 0,
                    display: "none",
                    delay: 2.4,
                    duration: 0.3

                }
            )
        }



        gsap.fromTo(
            img3ref.current,
            {
                opacity: 1,
                display: "block"
            },
            {
                opacity: 0,
                display: "none",
                delay: 2.4,
                duration: 0.3

            }
        )







        gsap.fromTo(
            img6ref.current,
            {
                width: "0%",
                x: "2500px"

            },
            {

                width: "100%",
                x: "0px",
                delay: 2.5,
                duration: 1,

            }
        )



    }, [])

    return (
        <section className="h-screen overflow-hidden px-[50px] pt-[100px] pb-[40px] flex items-center justify-center
        max-lg:px-[10px]
        max-sm:py-[80px] max-sm:pb-[10px] 
        
        ">

            <div className=" h-full w-full
             max-sm:flex flex-col items-center justify-center gap-[2%]
             ">

                <div className="flex items-center justify-between gap-5 h-[85%]  relative
                max-sm:h-[85%] max-sm:flex-grow max-sm:gap-2 max-sm:justify-center w-full
                ">
                    <div ref={img1ref} className="w-[30%] h-[100%]  overflow-hidden  -translate-y-[150%]
                    max-sm:w-[50%]
                    ">
                        <Image
                            src={hero3}
                            alt="hero1"
                            placeholder="blur"
                            style={{ objectFit: "cover", height: "100%", width: "100%", borderRadius: "25px" }}
                            width={500}
                            height={300}
                        />
                        <Image
                            src={isMobile ? hero1 : hero2}
                            alt="hero1"
                            placeholder="blur"
                            style={{ objectFit: "cover", height: "48%", filter: "grayscale(200%)", width: "100%", display: "none", borderRadius: "25px", overflow: "hidden" }}
                            width={500}
                            height={300}

                        />
                    </div>
                    {!isMobile &&
                        <div ref={img2ref} className=" max-sm:hidden  w-[40%] rounded-[25px] overflow-hidden h-[100%] -translate-y-[150%] ">
                            <Image
                                src={hero5}
                                alt="hero5"
                                placeholder="blur"
                                style={{ objectFit: "cover", objectPosition: "center", height: "100%", width: "100%", }}
                                width={500}
                                height={300}
                            />
                        </div>}

                    <div ref={img3ref} className="w-[30%] rounded-[25px] overflow-hidden h-[100%] -translate-y-[150%] flex flex-col items-end justify-end
                      max-sm:w-[50%]
                    ">

                        <Image
                            src={hero4}
                            alt="hero1"
                            placeholder="blur"
                            style={{ objectFit: "cover", filter: "grayscale(200%)", height: "48%", width: "100%", display: "none", borderRadius: "25px", overflow: "hidden" }}
                            width={500}
                            height={300}

                        />

                        <Image
                            src={isMobile ? hero2 : hero1}
                            alt="hero3"
                            placeholder="blur"
                            style={{ objectFit: "cover", filter: "grayscale(200%)", height: "100%", width: "100%", borderRadius: "25px" }}
                            width={500}
                            height={300}
                        />


                    </div>




                    <div ref={img6ref} className="w-[0%] rounded-[25px] overflow-hidden h-[100%] z-10   translate-x-[2500px]  ">
                        <div className="w-full h-full relative">
                            <Image
                                src={isMobile ? hero3 : hero6}
                                alt="hero5"
                                placeholder="blur"
                                style={{ objectFit: "cover", objectPosition: "center", height: "100%", width: "100%" }}
                                width={500}
                                height={300}
                            />
                            <div className=" text-white cursor-pointer max-sm:w-[300px]  absolute top-[50%] left-[10%] text-[24px] font-[200] ">
                                {showText && (
                                    <Typewriter
                                        words={['ONLY THE FINEST MOST FLAWLESS DID']}
                                        loop={1}
                                        cursor
                                        cursorStyle=''
                                        typeSpeed={40}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                    />
                                )}

                            </div>
                        </div>


                    </div>
                </div>

                <div className="   overflow-hidden flex gap-5 items-center justify-between w-full text-white mt
                max-sm:h-[10%]
                 ">
                    <Image
                        src={LOGOWHITE}
                        width={130}
                        alt="hero5"
                        height={130}
                        className=" max-sm:w-[90px]  fill-white"
                    />
                    <p className="max-w-[800px] max-lg:hidden font-[200] ">
                        exercitationem. Recusandae nam fuga impedit ipsa necessitatibus. Perferendis consequuntur est maiores?
                    </p>
                    <div className="flex">
                        <button className="bg-white w-[150px] h-[50px] rounded-3xl text-black text-[14px] font-semibold
                        max-sm:w-[130px] max-sm:h-[40px] max-sm:text-[12px]
                        ">EXPLORE MORE</button>
                        <button className="w-[50px] h-[50px] rounded-full bg-white relative right-1 rotate-[90deg] flex items-center justify-center
                        max-sm:w-[40px] max-sm:h-[40px]
                        "><ARROW /></button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
