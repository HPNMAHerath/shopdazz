"use client"
import { useAuth, useUser } from '@clerk/nextjs'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

 const AppContext = createContext()

export const useAppContext = ()=>{
    return useContext(AppContext)
}

const AppContextProvider = (prop) => {
    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const {user} = useUser()
    const router = useRouter()
    const currency = process.env.NEXT_PUBLIC_CURRENCY || "$"
    const {getToken} = useAuth()

    const fetchProducts = async ()=>{
      try {
        const {data} = await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
          toast.error(error.message)
      }
    }

    const fetchUser = async ()=>{
      try{
        if(user.publicMetadata.role === 'seller'){
          setIsSeller(true)
        }
        const token = await getToken()
        const {data} = await axios.get('/api/user/profile', {headers: { Authorization: `Bearer ${token}`}})
        if(data.success){
          setUserData(data.user)
          setCartItems(data.user.cartItems)
        }else{
          toast.error(data.message)
        }
      }catch (error) {
        toast.error(error.message)

      }
    }

    const addToCart = async (itemId)=>{
      let cartData = structuredClone(cartItems)
      if (cartData[itemId]) {
        cartData[itemId] += 1
      }else {
        cartData[itemId] = 1
      }

      setCartItems(cartData)
      //console.log(cartItems)

      if(user){
        try {
          const token = await getToken()
          await axios.post('/api/cart/update', {cartData}, {headers: { Authorization: `Bearer ${token}`}})
          toast.success("Added to cart")
        }catch (error) {
          toast.error(error.message)
        }
      }
    }

    const updateCartQuantity = async (itemId, quantity)=>{
      let cartData = structuredClone(cartItems)
      if (quantity === 0){
        delete cartData[itemId]
      }else {
        cartData[itemId] = quantity
      }
      setCartItems(cartData)

      if(user){
        try {
          const token = await getToken()
          await axios.post('/api/cart/update', {cartData}, {headers: { Authorization: `Bearer ${token}`}})
          toast.success("cart updated")
        }catch (error) {
          toast.error(error.message)
        }
      }
    }

    const getCartCount = ()=>{
      let totalCount = 0
      for (const itemId in cartItems){
        if(cartItems[itemId] > 0){
          totalCount += cartItems[itemId]
        }
      }
      return totalCount
    }

    const getCartAmount = ()=>{
      let totalAmount = 0 
      for(const itemId in cartItems){
        let itemInfo = products.find(product => product._id ===itemId) 
        if(cartItems[itemId] > 0){
          totalAmount += itemInfo.offerPrice * cartItems[itemId]
        }
      }
      return Math.floor(totalAmount * 100) / 100
    }

    useEffect(()=>{
        fetchProducts()
        if(user){
          fetchUser()
        }else{
          setUserData(null)
          setCartItems({})
        }
    }, [user])

    const value = {
        products,
        isSeller,
        setIsSeller,
        currency,
        router,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateCartQuantity,
        getCartAmount,
        user,
        getToken,


    }

  return (
    <div>
      <AppContext.Provider value={value}>{prop.children}</AppContext.Provider>
    </div>
  )
}

export default AppContextProvider 
