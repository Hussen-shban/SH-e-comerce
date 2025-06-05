"use client"
import { useParams } from "next/navigation"
import { useCategore } from "../Reactquery/reactqueryhook"
import Image from "next/image"
import Map from "../components/Map"


const Prodact = () => {
    const params = useParams()
    const id = params?.prodactid
    const { data: product = [], isLoading } = useCategore(id)
    console.log(id)
    return (


        <div className="min-h-screen sm:h-screen overflow-hidden px-[50px] pt-[120px] pb-[40px] 
            max-lg:px-[10px] text-white bg-[#111111] 
            max-sm:py-[80px] max-sm:pb-[10px]">

<Map/>
            {isLoading ?
            
            <div className=" flex items-center justify-around
            max-sm:flex-col-reverse gap-5  animate-pulse
            ">
                <div className="w-[40%]  max-sm:w-full pb-4">
                    <p className="text-[42px] font-semibold
                    max-sm:text-[26px] max-w-[400px] truncate mb-3
                    ">product title</p>

                    <p className="max-sm:px-[10px] max-w-[600px] relative text-[18px] ddd font-medium mb-3
                max-sm:text-[14px]">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis, omnis. Nobis iusto adipisci sequi ex maxime suscipit ducimus accusamus non vero cumque magni libero autem veritatis, nemo ullam vel eius!
                    </p>
                    {/* Delivery Time & Price Buttons */}
                    <div className="flex gap-5 text-white mt-5">
                        <button className="btnn py-[10px] px-[30px] max-sm:px-[20px] bg-[#2a2a2a] rounded-xl   flex flex-col items-start">
                            <p className="text-[14px] font-medium max-sm:text-[12px]">Delivery Time</p>
                            <p className="text-[22px] font-semibold flex items-center max-sm:text-[18px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 72 72">
                                    <defs>
                                        <path id="openmojiFourOclock0" d="M36 18.989v17m10.057 5.791l-10-5.774" />
                                    </defs>
                                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2">
                                        <circle cx="35.958" cy="35.99" r="23" />
                                        <use href="#openmojiFourOclock0" />
                                    </g>
                                    <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2">
                                        <circle cx="35.958" cy="35.99" r="23" />
                                        <use href="#openmojiFourOclock0" />
                                    </g>
                                </svg>
                                25 mins
                            </p>
                        </button>

                        <button className="py-[10px] rounded-xl px-[30px] max-sm:px-[20px] bg-[#38b000] flex flex-col items-start">
                            <p className="text-[14px] font-medium max-sm:text-[12px]">Price</p>
                            <p className="text-[22px] font-semibold max-sm:text-[18px]">$ 22.22</p>
                        </button>
                    </div>

                    {/* Add to Cart & Quantity Controls */}
                    <div className="mt-10 text-white flex items-center gap-10 max-sm:gap-8">
                        <button className="btnn py-[10px] px-[30px] max-sm:px-[20px] rounded-lg  bg-[#233a95] w-fit">
                            <p className="text-[18px] max-sm:text-[16px] font-semibold">Add To Cart</p>
                        </button>

                        <div className="flex items-center justify-center gap-3 max-sm:gap-2">
                            <button className="p-6 max-sm:p-2 rounded-full bg-card bg-[#2a2a2a] w-[35px] h-[35px] flex items-center justify-center">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path fill="#fff" d="M5 13v-1h13v1z" />
                                    </svg>
                                </span>
                            </button>

                            <p className="text-[20px] max-sm:text-[18px] w-[30px] text-center">1</p>

                            <button className="p-6 max-sm:p-2 rounded-full bg-card bg-[#2a2a2a]
                             w-[35px] h-[35px] flex items-center justify-center">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path fill="#fff" d="M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6z" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-[400px] sm:h-[400px] h-[300px] max-sm:w-[70%] flex justify-end bg-[#ffffff38] rounded-[30px]
               
                ">
                   
                        <div
                            
                       
                           
                        
                            
                            className=" w-[700px] h-[500px] max-sm:h-[200px] bg object-cover max-sm:w-full rounded-[30px] "
                            
                        />
                  
                </div>
            </div>
                :

                <div className=" flex items-center justify-around
            max-sm:flex-col-reverse gap-5
            ">
                    <div className="w-[40%]  max-sm:w-full pb-4">
                        <p className="text-[42px] font-semibold
                    max-sm:text-[26px] max-w-[400px] truncate mb-3
                    ">{product.title}</p>

                        <p className="max-sm:px-[10px] max-w-[600px] relative text-[18px] ddd font-medium mb-3
                max-sm:text-[14px]">
                            {product.description}
                        </p>
                        {/* Delivery Time & Price Buttons */}
                        <div className="flex gap-5 text-white mt-5 flex-wrap">
                            <button className="btnn py-[10px] px-[30px] max-sm:px-[20px] bg-[#2a2a2a] rounded-xl   flex flex-col items-start">
                                <p className="text-[14px] font-medium max-sm:text-[12px]">Delivery Time</p>
                                <p className="text-[22px] font-semibold flex items-center max-sm:text-[18px]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 72 72">
                                        <defs>
                                            <path id="openmojiFourOclock0" d="M36 18.989v17m10.057 5.791l-10-5.774" />
                                        </defs>
                                        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2">
                                            <circle cx="35.958" cy="35.99" r="23" />
                                            <use href="#openmojiFourOclock0" />
                                        </g>
                                        <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2">
                                            <circle cx="35.958" cy="35.99" r="23" />
                                            <use href="#openmojiFourOclock0" />
                                        </g>
                                    </svg>
                                    25 mins
                                </p>
                            </button>

                            <button className="py-[10px] rounded-xl px-[30px] max-sm:px-[20px] bg-[#38b000] flex flex-col items-start">
                                <p className="text-[14px] font-medium max-sm:text-[12px]">Price</p>
                                <p className="text-[22px] font-semibold max-sm:text-[18px]">$ {product.price}</p>
                            </button>
                        </div>

                        {/* Add to Cart & Quantity Controls */}
                        <div className="mt-10 text-white flex items-center gap-10 max-sm:gap-8">
                            <button className="btnn py-[10px] px-[30px] max-sm:px-[20px] rounded-lg  bg-[#233a95] w-fit">
                                <p className="text-[18px] max-sm:text-[16px] font-semibold">Add To Cart</p>
                            </button>

                            <div className="flex items-center justify-center gap-3 max-sm:gap-2">
                                <button className="p-6 max-sm:p-2 rounded-full bg-card bg-[#2a2a2a] w-[35px] h-[35px] flex items-center justify-center">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <path fill="#fff" d="M5 13v-1h13v1z" />
                                        </svg>
                                    </span>
                                </button>

                                <p className="text-[20px] max-sm:text-[18px] w-[30px] text-center">1</p>

                                <button className="p-6 max-sm:p-2 rounded-full bg-card bg-[#2a2a2a]
                             w-[35px] h-[35px] flex items-center justify-center">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <path fill="#fff" d="M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6z" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-[40%]  max-sm:w-[70%] flex justify-end
               
                ">
                        {product?.image && (
                            <Image
                                src={product.image}
                                width={200}
                                height={300}
                                alt={product.title || "Product Image"}
                                placeholder="blur"
                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3a..."
                                className=" w-[300px] max-w-[700px] max-h-[500px] object-cover max-sm:w-full rounded-[30px] "
                                style={{ objectFit: "cover", }}
                            />
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default Prodact
