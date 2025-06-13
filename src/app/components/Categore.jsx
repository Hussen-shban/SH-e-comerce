"use client"

import { useCategory } from "../Reactquery/reactqueryhook"
import Image from "next/image"
import { useEffect, useReducer, useState } from "react"
import { initialstate, reducer } from "../Reducer/categoryreducer"
import { CART1 } from "../../../public/svg/svg"
import Link from "next/link"
import Aos from "aos"
import "aos/dist/aos.css"
import { useCart } from "../context/Cart"
import Swal from "sweetalert2"
import { useMove } from "../context/ausmovecontext"
import { useRouter, useSearchParams } from "next/navigation"

const Category = () => {
    // Fetch products from custom hook
    const { data: product = [], isLoading, isError } = useCategory()
    const all = product.filter((p) => p.category !== "electronics")
    const categories = ["all", "women's clothing", "men's clothing", "jewelery"]
    const { scrollParams } = useMove();
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'all';
    console.log(category)

    useEffect(() => {



        Aos.init({
            duration: 800,
        })

    }, [])

    useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#category") {
        setTimeout(() => {
            const element = document.getElementById("category");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }, 300); // ننتظر قليلًا حتى يكون العنصر ظهر
    }
}, []);

    useEffect(() => {
        if (category) {
            dispatch({ type: "SET_CATEGORY", payload: category });

        }
    }, [category]);

    function handleCategoryClick(cat) {
        router.push(`/?category=${encodeURIComponent(cat)}#category`);
        dispatch({ type: "SET_CATEGORY", payload: cat });
    }

    //  love
    const [love, setlove] = useState([])
    const handlelove = (id) => {
        if (love.includes(id)) {
            setlove(love.filter((p) => p !== id))
        }
        else {
            setlove([...love, id])
        }

    }
    // Add To Cart
    const { cart, AddToCart } = useCart()

    function handleAddToCart(item) {

        const token = localStorage.getItem("userdata")
        if (!token) {
            router.push("/auth")
        }
        else {
            AddToCart(item)
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Product added to cart"
            });
        }

        console.log(cart)
    }

    // State management for selected category
    const [state, dispatch] = useReducer(reducer, initialstate)

    // Filter products based on selected category
    const filteredProducts = state.selectCategory === "all"
        ? all
        : product.filter((pro) => pro.category === state.selectCategory)

    return (
        <section id="category" className="min-h-screen overflow-hidden px-[50px] pt-[100px] pb-[40px] 
            max-lg:px-[10px]
            max-sm:py-[80px] max-sm:pb-[10px]">

            {/* Header and category filter buttons */}
            <div className="flex items-center justify-between
             max-sm:flex-col max-sm:items-start gap-4">
                <p className="text-white text-[42px] font-semibold
                max-sm:text-[32px]
                ">Trending</p>
                <ul className="flex items-center flex-wrap justify-center gap-3 font-medium
                max-sm:justify-start
                ">
                    {categories.map((cat) => (
                        <li
                            key={cat}
                            onClick={() => handleCategoryClick(cat)}
                            className={`px-4 py-3 rounded-[20px] cursor-pointer 
                                max-sm:text-[14px] max-sm:px-2 max-sm:py-3
                                ${state.selectCategory === cat ? "bg-black text-white" : "bg-white"}`}>
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Loading Skeleton */}
            {isLoading ? (
                <div className="flex items-center justify-around gap-16 flex-wrap mt-16 w-full animate-pulse">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div
                            key={i}
                            className="text-white relative h-[300px] w-[250px] mb-24 max-sm:w-[90%] max-sm:h-[350px]">

                            <div className="h-full w-[250px] max-sm:w-full rounded-[30px] bg-[#ffffff38]" />

                            {/* Heart Icon */}
                            <div className="bge w-[40px] h-[40px] flex items-center top-3 right-4 justify-center rounded-full absolute">

                            </div>

                            {/* Add to Cart Icon */}
                            <div className="bg-[#111111] rounded-full absolute left-[50%] translate-x-[-50%] bottom-[-10%] w-[70px] h-[70px] flex items-center justify-center">
                                <div className="bg-white p-[10px] w-[54px] h-[54px] rounded-full">

                                </div>
                            </div>

                            {/* Title & Price */}
                            <p className="mt-8 text-center text-[22px] font-[300]">Bomber jackets</p>
                            <p className="text-center text-[18px] mt-1">$44.99</p>
                        </div>
                    ))}
                </div>
            )

                : isError ? (
                    <div className="flex items-center justify-center h-screen">


                        <div className="tv-container">
                            <div className="tv-screen">
                                <div className="static"></div>
                                <div className="error-text">ERROR</div>
                            </div>
                            <div className="tv-stand"></div>
                        </div>


                    </div>
                )

                    : (
                        // Render Filtered Products
                        <div className="flex items-center justify-around gap-16 flex-wrap mt-16 w-full">
                            {filteredProducts.map((pro) => {
                                const isInCart = cart.some((e) => e.id === pro.id)
                                return (
                                    <div data-aos="fade-up"
                                        key={pro.id}
                                        className="text-white relative h-[300px] w-[250px] mb-24 max-sm:w-[70%] max-sm:h-[350px]">

                                        {/* Product Image */}
                                        <Link href={`/${pro.id}`}>

                                            <Image
                                                src={pro.image}
                                                width={200}
                                                height={300}
                                                alt={pro.title}
                                                placeholder="blur"
                                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNlZWVlZWUiIC8+PC9zdmc+"
                                                className="h-full w-[250px] max-sm:w-full rounded-[30px] cursor-pointer"
                                                style={{ objectFit: "fill" }}
                                            />
                                        </Link>


                                        {/* Heart Icon */}
                                        <div onClick={() => handlelove(pro.id)} className="bge cursor-pointer w-[40px] h-[40px] flex items-center top-3 right-4 justify-center rounded-full absolute">
                                            {
                                                !love.includes(pro.id) ?
                                                    <svg className=" relative top-[1px] right-[-1px]" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 20 20"><path fill="#111111" fillRule="evenodd" d="M5.618 4.618C4.185 4.966 3 6.07 3 7.996c0 2.564 2.169 5.073 7 7.448c4.831-2.375 7-4.884 7-7.448c0-1.925-1.185-3.03-2.618-3.378c-1.471-.358-3.122.103-3.979 1.27a.5.5 0 0 1-.806 0C8.74 4.721 7.089 4.26 5.618 4.618m4.382.21C8.81 3.635 6.968 3.26 5.382 3.645C3.565 4.088 2 5.546 2 7.996c0 3.24 2.766 6.032 7.783 8.454a.5.5 0 0 0 .434 0C15.234 14.028 18 11.237 18 7.996c0-2.45-1.565-3.908-3.382-4.35c-1.586-.385-3.427-.01-4.618 1.181" clipRule="evenodd" /></svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 20 20"><path fill="#ff0000" fillRule="evenodd" d="M10 4.543c-1.25-.98-2.965-1.245-4.432-.895C3.678 4.1 2 5.621 2 8.163c0 3.326 2.88 6.016 7.571 8.24a1 1 0 0 0 .857 0C15.12 14.18 18 11.49 18 8.164c0-2.542-1.678-4.064-3.568-4.515c-1.467-.35-3.183-.084-4.432.895" clipRule="evenodd" /></svg>
                                            }
                                        </div>

                                        {/* Add to Cart Icon */}
                                        <div className="bg-[#111111] pro rounded-full absolute left-[50%] translate-x-[-50%] bottom-[-10%] w-[70px] h-[70px] flex items-center justify-center">
                                            <button onClick={() => handleAddToCart(pro)}
                                                disabled={isInCart}

                                                className={` cursor-pointer p-[10px] rounded-full ${isInCart ? "bg-green-500" : "bg-white"


                                                    }`}>
                                                <CART1 />
                                            </button>
                                        </div>

                                        {/* Product Title & Price */}
                                        <div className="w-full flex items-center justify-center">
                                            <p className="mt-8 text-center text-[22px] font-[300] max-w-[200px] truncate">
                                                {pro.title}
                                            </p>
                                        </div>
                                        <p className="text-center text-[18px] mt-1">${pro.price}</p>
                                    </div>
                                )

                            })}
                        </div>
                    )}
        </section>
    )
}

export default Category
