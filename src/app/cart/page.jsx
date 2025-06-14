"use client"
import { useEffect, useState } from "react";
import { useCart } from "../context/Cart";
import { XMARK } from "../../../public/svg/svg";
import Link from "next/link";
import Nav from "../components/Nav";
import Image from "next/image";

export default function Cart() {

    const [shipping, setShipping] = useState(5);
    const [isFreeShipping, setIsFreeShipping] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [selectedShipping, setSelectedShipping] = useState("flat");
    const freeShippingThreshold = 500;


    const { cart, AddToCart, Remove, calculateSubtotal } = useCart()

    useEffect(() => {
        const newSubtotal = calculateSubtotal();
        const numericSubtotal = Number(newSubtotal);




        setSubtotal(isNaN(numericSubtotal) ? 0 : numericSubtotal);

        if (numericSubtotal >= freeShippingThreshold) {
            setShipping(0);
            setIsFreeShipping(true);
            setSelectedShipping("free")
        } else {
            setShipping(5);
            setIsFreeShipping(false);
            setSelectedShipping("flat")

        }
    }, [cart]);


    const total = selectedShipping === "pickup"
        ? subtotal
        : selectedShipping === "flat" && !isFreeShipping
            ? subtotal + 5
            : subtotal;

    const increaseQuantity = (item) => {
        AddToCart({ ...item, quantity: 1 });
    };

    const decreaseQuantity = (item) => {
        AddToCart({ ...item, quantity: -1 });
    };

    const handleShippingChange = (option) => {
        setSelectedShipping(option);
    };

    const cartItems = cart.map((item) => (


        <tr key={item.id} className="max-sm:hidden " >
            <td >
                <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="max-w-[4.375rem]"
                />


            </td>
            <td className=" max-w-[50px] truncate">{item.title}</td>
            <td className="text-[#202435]">${item.price}</td>
            <td>
                <div className="flex items-center justify-center gap-3 max-sm:gap-2">
                    <button onClick={() => decreaseQuantity(item)} className="p-2 rounded-full bg-[#111111] w-[35px] h-[35px] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M5 13v-1h13v1z" /></svg>
                    </button>
                    <p className="text-[20px] max-sm:text-[18px] w-[30px] text-center">{item.quantity}</p>
                    <button onClick={() => increaseQuantity(item)} className="p-2 rounded-full bg-[#111111] w-[35px] h-[35px] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6z" /></svg>
                    </button>
                </div>
            </td>
            <td className="text-[#202435]">{(item.price * item.quantity).toFixed(2)}</td>
            <td  >
                <div>
                    <XMARK onClick={() => Remove(item)} className={"text-[#202435]"} />
                </div>
            </td>
        </tr>



    ));

    const cartitems1 = cart.map((item) => (


        <tr key={item.id} className=" sm:hidden" >
            <td>
                <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="max-w-[4.375rem]"
                />
            </td>

            <td className="text-[#202435]">${item.price}</td>
            <td>
                <div className="flex items-center justify-center  ">
                    <button onClick={() => decreaseQuantity(item)} className="p-2 rounded-full bg-[#111111]  w-[30px] h-[30px] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="#fff" d="M5 13v-1h13v1z" /></svg>
                    </button>
                    <p className="text-[16px] w-[25px] text-center">{item.quantity}</p>
                    <button onClick={() => increaseQuantity(item)} className="p-2 rounded-full bg-[#111111]  w-[30px] h-[30px] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6z" /></svg>
                    </button>
                </div>
            </td>
        </tr>
    ))

    return (
        <div>
            <Nav color={true} />

            {cart.length !== 0 ? (
                <div className="  flex justify-around
                max-lg:flex max-md:flex-col  max-md:items-center  max-lg:justify-center 


                 px-[50px] pt-[100px] pb-[40px] 
        max-lg:px-[10px]
        max-sm:py-[80px] max-sm:pb-[10px] 
                ">
                    <div className=" w-[73%] max-lg:w-[100%]">
                        <div className="border-[1px] border-[#dee2e6]  rounded-lg  p-[20px] mb-[20px]">
                            <p className="text-[14px] pb-[0.625rem] font-medium">
                                {!isFreeShipping ? (
                                    <>
                                        Add <span className="text-[#ed174a] font-semibold">${(freeShippingThreshold - subtotal).toFixed(2)}</span> to cart and get free shipping!
                                    </>
                                ) : (
                                    <span className="text-green-600 font-semibold">Your order qualifies for free shipping!</span>
                                )}
                            </p>

                            <div className="h-[6px] bor bg-[#f2f3f5] rounded overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-300 ${subtotal >= freeShippingThreshold ? 'bg-green-500' : 'bg-[#ed174a]'
                                        }`}
                                    style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <table className="w-full max-sm:hidden">
                                <thead>
                                    <tr className="text-[#71778e] border-b-[1px] border-[#dee2e6]">
                                        <th></th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems}
                                </tbody>
                            </table>
                            <table className="w-full sm:hidden">
                                <thead>
                                    <tr className="text-[#71778e] border-[#dee2e6]">
                                        <th></th>

                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartitems1}
                                </tbody>
                            </table>
                        </div>

                        <div>

                        </div>
                    </div>



                    <div className=" border-[1px] border-[#dee2e6] rounded-lg  px-[20px] py-[20px] bor w-[23%] lon max-lg:w-[100%]">
                        <p className="bop pb-[20px] font-semibold text-[18px] Dosis">Cart totals</p>

                        <div className="flex items-center justify-between py-[15px] bop text-[14px] font-medium">
                            <p>Subtotal</p>
                            <p className="text-[16px]">{calculateSubtotal().toFixed(2)}</p>
                        </div>

                        <div className="flex items-center justify-between py-[15px] bop text-[14px]">
                            <p className="font-medium">Shipping</p>
                            <div className="flex flex-col items-end">
                                <ul className="flex flex-col items-end">
                                    {isFreeShipping && (
                                        <li className="mb-2 flex items-center gap-2">
                                            <label>Free shipping</label>
                                            <input type="radio" name="shipping" value="free" checked={selectedShipping === "free"} onChange={() => handleShippingChange("free")} />
                                        </li>
                                    )}
                                    {!isFreeShipping && (
                                        <li className="mb-2 flex items-center gap-2">
                                            <label>Flat rate: $5.00</label>
                                            <input type="radio" name="shipping" value="flat" checked={selectedShipping === "flat"} onChange={() => handleShippingChange("flat")} />
                                        </li>
                                    )}
                                    <li className="mb-2 flex items-center gap-2">
                                        <label>Local pickup</label>
                                        <input type="radio" name="shipping" value="pickup" checked={selectedShipping === "pickup"} onChange={() => handleShippingChange("pickup")} />
                                    </li>
                                </ul>
                                <p className="text-[#2bbef9] mt-2 text-[14px] font-[400]">Change address</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-[15px] bop text-[14px]">
                            <p className="font-medium">Total</p>
                            <p className="text-[20px] font-medium">${total.toFixed(2)}</p>
                        </div>

                        <button className="w-full font-[500] text-[16px] text-white h-[50px] text-center mt-[20px] rounded-[5px] bg-[#ed174a]">
                            Proceed to checkout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-10 h-screen">
                    <div className="bg-[#eaecef] w-[150px] h-[150px] rounded-full flex items-end justify-center overflow-hidden">
                        <img className="w-[75px] h-[75px]" alt="Empty Cart" src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20280.028%20280.028'%20width='280.028'%20height='80.028'%3e%3cpath%20class='c-01'%20d='M35.004%200h210.02v78.758H35.004V0z'%20fill='%23b7343e'%3e%3c/path%3e%3cpath%20class='c-02'%20d='M262.527%2061.256v201.27c0%209.626-7.876%2017.502-17.502%2017.502H35.004c-9.626%200-17.502-7.876-17.502-17.502V61.256h245.025z'%20fill='%23f04652'%3e%3c/path%3e%3cpath%20class='c-03'%20d='M35.004%2070.007h26.253V26.253L35.004%200v70.007zm183.767-43.754v43.754h26.253V0l-26.253%2026.253z'%20fill='%23f04652'%3e%3c/path%3e%3cpath%20class='c-04'%20d='M61.257%2061.256V26.253L17.503%2061.256h43.754zm157.514-35.003v35.003h43.754l-43.754-35.003z'%20fill='%23ab212b'%3e%3c/path%3e%3cpath%20class='c-05'%20d='M65.632%20105.01c-5.251%200-8.751%203.5-8.751%208.751s3.5%208.751%208.751%208.751%208.751-3.5%208.751-8.751c0-5.25-3.5-8.751-8.751-8.751zm148.764%200c-5.251%200-8.751%203.5-8.751%208.751s3.5%208.751%208.751%208.751%208.751-3.5%208.751-8.751c.001-5.25-3.501-8.751-8.751-8.751z'%20fill='%23f04652'%3e%3c/path%3e%3cpath%20class='c-06'%20d='M65.632%20121.637c5.251%200%206.126%206.126%206.126%206.126%200%2039.379%2029.753%2070.882%2068.257%2070.882s68.257-31.503%2068.257-70.882c0%200%20.875-6.126%206.126-6.126s6.126%206.126%206.126%206.126c0%2046.38-35.003%2083.133-80.508%2083.133s-80.508-37.629-80.508-83.133c-.001-.001.874-6.126%206.124-6.126z'%20fill='%23f04652'%3e%3c/path%3e%3cpath%20class='c-07'%20d='M65.632%20112.886c5.251%200%206.126%206.126%206.126%206.126%200%2039.379%2029.753%2070.882%2068.257%2070.882s68.257-31.503%2068.257-70.882c0%200%20.875-6.126%206.126-6.126s6.126%206.126%206.126%206.126c0%2046.38-35.003%2083.133-80.508%2083.133s-80.508-37.629-80.508-83.133c-.001%200%20.874-6.126%206.124-6.126z'%20fill='%23fdfbf7'%3e%3c/path%3e%3c/svg%3e" />
                    </div>
                    <p className="text-[#ed174a] font-[700] text-[18px] font-dosis">Your cart is currently empty.</p>
                    <Link
                        href="/"
                        state={{ scrollTo: 'menu', itemType: 'food' }}>
                        <button className="bg-[#233a95] px-[25px] py-[13px] text-white rounded-[30px] font-semibold text-[14px] font-dosis">Return to shop</button>

                    </Link>

                </div>
            )}


        </div>
    );
}
