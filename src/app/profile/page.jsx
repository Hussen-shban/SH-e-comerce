"use client"
import Image from "next/image"
import { hero1, hero2, hero3, people1 } from "../assets/img"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import Nav from "../components/Nav"
import { useCart } from "../context/Cart"

const Profile = () => {

    // Array of selectable background colors
    const arraycolor = [
        "#d0e60a", "#e01313", "#30099c", "#31c00d", "#0aafc5", "#000"
    ]

    // User profile state
    const [profiledata, setprofiledata] = useState({
        name: "",
        lastname: "",
        color: "",
        img: "",
    })
    const { ClearCart } = useCart();
    const router = useRouter()
    const [hidden, sethidden] = useState(true)

    // Toggle edit mode or save data to localStorage
    function handlehidden() {
        if (hidden) {
            sethidden(false)
        } else {
            const oldData = JSON.parse(localStorage.getItem("userdata"));
            const updatedData = {
                ...oldData,
                ...profiledata
            };
            localStorage.setItem("userdata", JSON.stringify(updatedData));
            sethidden(true)
        }
    }

    // Load saved user data on component mount
    useEffect(() => {
        const oldData = JSON.parse(localStorage.getItem("userdata"));
        setprofiledata((prev) => ({
            ...prev, ...oldData
        }))
    }, [])

    // Logout handler with confirmation
    function handlelogout(e) {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure you want to log out?",
            text: "You will need to log in again to access your account.",
            icon: "warning",
            confirmButtonText: "Yes, log out",
            cancelButtonText: "Cancel",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            showCloseButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                ClearCart()
                router.replace("/");
            }
        });
    }

    return (
        <>
            <Nav />

            <section className="bg-[#111111] text-white flex sm:items-center max-sm:items-start justify-center
            min-h-screen overflow-hidden px-[50px] pt-[100px] pb-[40px] 
            max-lg:px-[10px]
            max-sm:py-[80px] max-sm:pb-[10px]
        ">

                <div className="w-[95%] max-w-[800px] overflow-hidden border-[1px]  border-white rounded-2xl">

                    {/* Profile Header with color and image */}
                    <div className="max-sm:pt-20 max-sm:py-5  " style={{ background: profiledata.color }}>
                        <div className=" relative top-[70px] max-sm:top-0 left-5   ">
                            <div className="flex items-center gap-4 ">

                                <div className="flex flex-col items-center justify-center gap-2 max-sm:gap-4">
                                    <Image src={
                                        profiledata.img
                                            ?
                                            profiledata.img
                                            :
                                            hero2}

                                        width={130}
                                        height={130}

                                        alt="sdasd"
                                        className=" object-cover w-[130px] border-[2px] border-white h-[130px]"
                                    />
                                    <button
                                        onClick={handlehidden}
                                        className="px-6 py-1 border-[1px] border-black text-black rounded-lg text-[18px] max-sm:bg-white  "> {hidden ? "Edit profile" : "Save"}</button>

                                </div>

                                <div className="flex flex-col items-center">
                                    <p className="font-semibold text-[22px] relative bottom-12 ">{profiledata.name ? profiledata.name : "...."}</p>
                                    <p className="font-semibold text-[22px] relative bottom-14 ">{profiledata.lastname ? profiledata.lastname : "...."}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* User stats section */}
                    <div className="bg-[#f5f0f0] pb-10 pt-5 text-black flex gap-10 items-center justify-center sm:pl-36 ">
                        <div className="flex flex-col items-center justify-center">
                            <p>0</p>
                            <p>Item Bought</p>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <p>0</p>
                            <p>Item In Cart</p>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <p>0</p>
                            <p>Level</p>
                        </div>
                    </div>

                    {/* Edit profile form */}
                    <div className={`bg-white  px-5 ${hidden ? "h-0 py-0" : "h-full py-10 "}`} >

                        <form className="text-black" >

                            {/* First Name input */}
                            <div className="flex flex-col gap-2 w-[250px] mb-5">
                                <label htmlFor="firstname">First Name:</label>
                                <input onChange={(e) =>
                                    setprofiledata((prev) => ({
                                        ...prev,
                                        name: e.target.value
                                    }))
                                }
                                    id="firstname" className="border-[1px] border-black px-2 py-1" type="text" />
                            </div>

                            {/* Last Name input */}
                            <div className="flex flex-col gap-2 w-[250px] ">
                                <label htmlFor="lastname">Last Name:</label>
                                <input
                                    id="lastname"
                                    onChange={(e) =>
                                        setprofiledata((prev) => ({
                                            ...prev,
                                            lastname: e.target.value
                                        }))
                                    }
                                    className="border-[1px] border-black px-2 py-1" type="text" />
                            </div>

                            {/* Color selection */}
                            <div className="choosecolor  ">
                                <h3 className="mb-4">
                                    choose a color
                                </h3>

                                <div className="items5">
                                    {
                                        arraycolor.map((item) => {
                                            return (
                                                <div onClick={() =>
                                                    setprofiledata((prev) => ({
                                                        ...prev,
                                                        color: item
                                                    }))} key={item + 1} className="fo">
                                                    <div className={` h-[25px] w-[25px] rounded-full cursor-pointer`} style={{ backgroundColor: item }}></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {/* Profile photo upload */}
                            <label htmlFor="file" className="custum-file-upload">
                                <div className="icon">
                                    <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                                </div>
                                <div className="text">
                                    <span>Change Profile Photo</span>
                                </div>
                                <input
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        const reader = new FileReader();

                                        reader.onloadend = () => {
                                            setprofiledata((prev) => ({
                                                ...prev,
                                                img: reader.result, // Base64 image
                                            }));
                                        };

                                        if (file) {
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    id="file" type="file" />
                            </label>

                            {/* Logout button */}
                            <div className="mt-5">
                                <p>Account Managment</p>
                                <button onClick={handlelogout} className="text-red-600 border-[1px] border-red-600 px-4 py-1 rounded-2xl mt-2">Log Out</button>
                            </div>

                        </form>

                    </div>

                </div>

            </section>

        </>

    )
}

export default Profile
