"use client"
import { dummyProducts } from '@/public/data'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

 const AppContext = createContext()

export const useAppContext = ()=>{
    return useContext(AppContext)
}

const AppContextProvider = (prop) => {
    const [products, setProducts] = useState([])
    const [isSeller, setIsSeller] = useState(true)
    const [cartItems, setCartItems] = useState({})
    const {user} = useUser()
    const router = useRouter()
    const currency = process.env.NEXT_PUBLIC_CURRENCY || "$"

    const getProducts = ()=>{
        setProducts(dummyProducts)
    }

    const addToCart = (itemId)=>{
      let cartData = structuredClone(cartItems)
      if (cartData[itemId]) {
        cartData[itemId] += 1
      }else {
        cartData[itemId] = 1
      }

      setCartItems(cartData)
      console.log(cartItems)
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

    const updateCartQuantity = (itemId, quantity)=>{
      let cartData = structuredClone(cartItems)
      if (quantity === 0){
        delete cartData[itemId]
      }else {
        cartData[itemId] = quantity
      }
      setCartItems(cartData)
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
        getProducts()
    }, [])

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


    }

  return (
    <div>
      <AppContext.Provider value={value}>{prop.children}</AppContext.Provider>
    </div>
  )
}

export default AppContextProvider 
