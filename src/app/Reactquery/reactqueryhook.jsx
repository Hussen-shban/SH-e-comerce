import { useQueries, useQuery } from "@tanstack/react-query"

import axios from "axios"



const fetchcategory = async (id) => {
    const url = id ? `https://fakestoreapi.com/products/${id}`
        : "https://fakestoreapi.com/products"

    const { data } = await axios.get(url)
    return data
}

export const useCategore = (id) => {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () => fetchcategory(id)
    })
}