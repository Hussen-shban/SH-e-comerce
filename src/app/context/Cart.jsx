"use client"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useReducer } from "react"
import Swal from "sweetalert2"




const Cartcontext = createContext()
export const useCart = () => useContext(Cartcontext)



const cartReducer = (state, action) => {

    switch (action.type) {

        case "ADD":
            const additem = state.find((item) => item.id === action.payload.id)
            if (additem) {
                const newQuantity = additem.quantity + action.payload.quantity
                if (newQuantity <= 0) {
                    return state.filter((prev) => prev.id !== action.payload.id)
                }

                return state.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + action.payload.quantity }
                        : item
                )



            }
            else {

                return [...state, { ...action.payload, quantity: action.payload.quantity || 1 }]

            }

        case "REMOVE":

            return state.filter((item) => item.id !== action.payload.id)

        case "CLEAR":
            return [];


        default:
            return state;
    }

}







const CartProvider = ({ children }) => {

    const initialCart = () => {
        if (typeof window !== "undefined") {
            const storedCart = localStorage.getItem("cart")
            return storedCart ? JSON.parse(storedCart) : []
        }
        return []
    }
    const [cart, dispatch] = useReducer(cartReducer, [], initialCart)
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const router = useRouter()
    const AddToCart = (item) => {



        dispatch({ type: "ADD", payload: item })





    }

    const Remove = (item) => {

        dispatch({ type: "REMOVE", payload: item })
    }

    const ClearCart = () => {
        dispatch({ type: "CLEAR" });
    }
    const calculateSubtotal = () => {
        return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    };

    return (
        <Cartcontext.Provider value={{ cart, AddToCart, Remove, ClearCart, calculateSubtotal }}>
            {children}
        </Cartcontext.Provider>


    )
}

export default CartProvider