"use client"
import Image from "next/image"
import { hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8, LOGO, LOGOBLACK, LOGOWHITE } from "../assets/img"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ARROW } from "../../../public/svg/svg"
import { Typewriter } from "react-simple-typewriter"
import { Link } from "react-scroll"

const Hero = () => {
    let hasAnimated = false;
    // Handle mobile detection
    const [isMobile, setisMobile] = useState(false)
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1022px)")
        setisMobile(mediaQuery.matches)

        const handleResize = () => setisMobile(mediaQuery.matches)
        mediaQuery.addEventListener("change", handleResize)

        return () => mediaQuery.removeEventListener("change", handleResize)
    }, [])

    // Refs for animating images
    const img1ref = useRef(null)
    const img2ref = useRef(null)
    const img3ref = useRef(null)
    const img6ref = useRef(null)
    const endref = useRef(null)

    // Handle text typing animation visibility
    const [showText, setShowText] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText(true)
        }, 4000)
        return () => clearTimeout(timer)
    }, [])

    const [showText1, setShowText1] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowText1(true)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])

    // GSAP Animations


    useEffect(() => {

        if (hasAnimated) return;

      
        hasAnimated = true;

        const images = img1ref.current.querySelectorAll("img");
        const images1 = img3ref.current.querySelectorAll("img");

        const firstimg = images[0]
        const secondImg = images[1];
        const thirdImg = images1[0];
        const fourthImg = images1[1];

        // Animate img1 container entrance
        gsap.fromTo(
            img1ref.current,
            { y: "-150%" },
            {
                y: 0,
                duration: 1.2,
                delay: 1,
                ease: "power3.out"
            }
        )

        // Animate img2 container entrance
        gsap.fromTo(
            img2ref.current,
            { y: "-150%" },
            {
                y: 0,
                duration: 1.2,
                delay: 1.2,
                ease: "power3.out"
            }
        )

        // Animate img3 container entrance
        gsap.fromTo(
            img3ref.current,
            { y: "-150%" },
            {
                y: 0,
                duration: 1.2,
                delay: 1.4,
                ease: "power3.out"
            }
        )

        // Animate second image inside img1 to appear from below
        gsap.fromTo(
            secondImg,
            {
                display: "none",
                y: "100%"
            },
            {
                display: "block",
                y: "0%",
                marginTop: "3%",
                delay: 2.3,
                duration: 0.9,
                ease: "power3.out"
            }
        )

        // Animate first image inside img1 to shrink
        gsap.fromTo(
            firstimg,
            {
                height: "100%"
            },
            {
                delay: 2.3,
                height: "48%",
                duration: 0.9,
                ease: "power3.out"
            }
        )

        // Animate third image in img3 to appear from top
        gsap.fromTo(
            thirdImg,
            {
                display: "none",
                y: "-100%",
            },
            {
                display: "block",
                y: "0%",
                marginBottom: "3%",
                delay: 2.3,
                duration: 1,
                ease: "power3.out"
            }
        )

        // Animate fourth image inside img3 to shrink
        gsap.fromTo(
            fourthImg,
            {
                height: "100%"
            },
            {
                delay: 2.3,
                height: "48%",
                duration: 1,
                ease: "power3.out"
            }
        )

        // Hide img1 after animation
        gsap.fromTo(
            img1ref.current,
            {
                opacity: 1,
                display: "block",
            },
            {
                opacity: 0,
                display: "none",
                delay: 3.4,
                duration: 0.3
            }
        )

        // Hide img2 if not mobile
        
            gsap.fromTo(
                img2ref.current,
                {
                    opacity: 1,
                    display: "block"
                },
                {
                    opacity: 0,
                    display: "none",
                    delay: 3.4,
                    duration: 0.3
                }
            )
   

        // Hide img3 after animation
        gsap.fromTo(
            img3ref.current,
            {
                opacity: 1,
                display: "block"
            },
            {
                opacity: 0,
                display: "none",
                delay: 3.4,
                duration: 0.3
            }
        )

        // Animate main final image container (img6) entrance
        gsap.fromTo(
            img6ref.current,
            {
                width: "0%",
                x: "2500px"
            },
            {
                width: "100%",
                x: "0px",
                delay: 3.5,
                duration: 1,
            }
        )
        // Animate end
        gsap.fromTo(
            endref.current,
            {
                y: "100px"
            },
            {
                y: "0px",
                delay: 0.5
            })






    }, [])

    return (
        <section className="h-screen overflow-hidden px-[50px] pt-[100px] pb-[40px] flex items-center justify-center
        max-lg:px-[10px]
        max-sm:py-[80px] max-sm:pb-[10px] 
        ">

            <div className=" h-full w-full
             max-sm:flex flex-col items-center justify-center gap-[2%]
             ">

                {/* Initial 3-image layout animation section */}
                <div className="max-sm:hidden flex items-center justify-between gap-5 h-[85%]  relative
                max-sm:h-[85%] max-sm:flex-grow max-sm:gap-2 max-sm:justify-center w-full
                ">
                    {/* Left image block */}
                    <div ref={img1ref} className="w-[30%] h-[100%]  overflow-hidden  -translate-y-[150%]
                    max-sm:w-[50%]
                    ">
                        <Image
                            src={hero3}
                            alt="hero1"
                            placeholder="blur"
                            style={{ objectFit: "cover", height: "100%", width: "100%", borderRadius: "25px" }}

                        />
                        <Image
                            src={hero2}
                            alt="hero1"
                            placeholder="blur"
                            style={{ objectFit: "cover", height: "48%", filter: "grayscale(200%)", width: "100%", display: "none", borderRadius: "25px", overflow: "hidden" }}

                        />
                    </div>

                    {/* Center image block (hidden on mobile) */}
                  
                        <div ref={img2ref} className=" max-sm:hidden  w-[40%] rounded-[25px] overflow-hidden h-[100%] -translate-y-[150%] ">
                            <Image
                                src={hero5}
                                alt="hero5"
                                placeholder="blur"
                                style={{ objectFit: "cover", objectPosition: "center", height: "100%", width: "100%", }}

                            />
                        </div>

                    {/* Right image block */}
                    <div ref={img3ref} className="w-[30%] rounded-[25px] overflow-hidden h-[100%] -translate-y-[150%] flex flex-col items-end justify-end
                      max-sm:w-[50%]
                    ">
                        <Image
                            src={hero4}
                            alt="hero1"
                            placeholder="blur"
                            style={{ objectFit: "cover", filter: "grayscale(200%)", height: "48%", width: "100%", display: "none", borderRadius: "25px", overflow: "hidden" }}

                        />

                        <Image
                            src={isMobile ? hero2 : hero1}
                            alt="hero3"
                            placeholder="blur"
                            style={{ objectFit: "cover", filter: "grayscale(200%)", height: "100%", width: "100%", borderRadius: "25px" }}

                        />
                    </div>

                    {/* Final animated image with text */}
                    <div ref={img6ref} className="w-[0%] rounded-[25px] overflow-hidden h-[100%] z-10   translate-x-[2500px]  ">
                        <div className="w-full h-full relative">

                            <Image
                                src={hero6}
                                alt="main hero" placeholder="blur"
                                style={{ objectFit: "cover", height: "100%", width: "100%" }}
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

                <div className=" sm:hidden flex items-center justify-between gap-5 h-[85%]  relative
                max-sm:h-[85%] max-sm:flex-grow max-sm:gap-2 max-sm:justify-center w-full
                ">




                    {/* Final animated image with text */}
                    <div className="w-[100%] rounded-[25px] overflow-hidden h-[100%] z-10     ">
                        <div className="w-full h-full relative">

                            <Image
                                src={hero3}
                                alt="main hero" placeholder="blur"
                                style={{ objectFit: "cover", height: "100%", width: "100%" }}
                            />

                            <div className=" text-white cursor-pointer max-sm:w-[300px]  absolute top-[50%] left-[10%] text-[24px] font-[200] ">

                                {showText1 && (
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

                {/* Footer section with logo and call to action */}
                <div ref={endref} className="overflow-hidden flex gap-5 items-center justify-between w-full text-white mt
                max-sm:h-[10%]

                 translate-y-[100px]
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
                    <Link
                        to="category"
                        smooth={true}
                        duration={100}
                    >

                        <div className="flex">
                            <button className="bg-white w-[150px] h-[50px] rounded-3xl text-black text-[14px] font-semibold
                        max-sm:w-[130px] max-sm:h-[40px] max-sm:text-[12px]
                        ">EXPLORE MORE</button>
                            <button className="w-[50px] h-[50px] rounded-full bg-white relative right-1 rotate-[90deg] flex items-center justify-center
                        max-sm:w-[40px] max-sm:h-[40px]
                        "><ARROW /></button>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero
