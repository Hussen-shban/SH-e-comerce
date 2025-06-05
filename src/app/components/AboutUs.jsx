"use client"

import Image from "next/image"
import { QUOTES } from "../../../public/svg/svg"
import { people1, people2, people3 } from "../assets/img"

import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
const AboutUs = () => {
    useEffect(() => {

        Aos.init({
            duration: 800,
        })

    }, [])

    const details = [
        {
            id: "1",
            name: "Hussen Jensen",
            img: people3,
            description: "Warning: shopping here is addictive. I came for one shirt and left with half the store. My wallet is mad but I’m happy!"

        },

        {
            id: "2",
            name: "Steve Mark",
            img: people2,
            description: "Got a necklace for my wife and a hoodie for myself — both were a hit! Fast delivery and great packaging too."

        },
        {
            id: "3",
            name: "Kenn Gallagher",
            img: people1,
            description: "I’m obsessed with the quality of the clothes! The fabric feels premium and the fit is perfect. Will definitely order again!"

        }
    ]
    return (
        <section className="min-h-screen overflow-hidden px-[50px] pt-[100px] pb-[40px] 
            max-lg:px-[10px]
            max-sm:py-[80px] max-sm:pb-[10px]">
            <div className="w-full flex justify-between
            items-center md:flex-row flex-col 
            sm:mb-16 mb-6 relative z-[1] gap-4
            ">
                <h1 className=" pl-5 font-poppins font-semibold sm:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[56.8px] w-full">

                    Whate people are
                    <br />
                    saying about us
                </h1>
                <p className="font-poppins font-normal
                     text-dimWhite text-[18px]
                      leading-[30.8px] text-left max-w[450px]
                      text-[#ffffff62] pl-5
                      ">
                    Everything you need to express your style — from timeless jewelry to fashion that fits every moment. Dress with confidence, anywhere in the world.
                </p>

            </div>


            <div className="flex items-center justify-around  flex-wrap
            max-sm:justify-center
            ">
                {details.map((item) => {
                    return (
                        <div
                            data-aos="fade-up"
                            key={item.id}
                            className=" 
        flex justify-between flex-col
        px-10 py-12 rounded-[20px] max-w-[370px]
        md:mr-10 sm:mr-5 mr-0 my-5 hover:bg-[#ffffff27] transition
        ">
                            <QUOTES />
                            <p
                                className="font-normal text-[22px]
                               leading-[32px] text-white my-10
            "
                            >{item.description}</p>
                            <div className="flex items-center gap-5">

                                <Image
                                    src={item.img}
                                    className="w-[60px] h-[60px] rounded-full"
                                    alt="ss"
                                />

                                <p
                                    className="font-poppins font-semibold
                    text-[20px] leading-[32px]
                    text-white 
                    "
                                >{item.name}</p>
                            </div>
                        </div>
                    )

                })}
            </div>



        </section>
    )
}

export default AboutUs