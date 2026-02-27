import { useAppContext } from '@/context/AppContext'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function CartTotal() {
    const {router, currency, getCartAmount, cartItems, setCartItems, user, getToken } = useAppContext()
    const [showAddress, setShowAddress] = useState(false)
    const [selectAddress, setSelectAddress] = useState(null)
    const [userAddresses, setUserAddresses] = useState([])
    const [paymentType, setPaymentType] = useState("COD")

    const fetchUserAddresses = async ()=>{
        try {
            const token = await getToken()
            const {data} = await axios.get('/api/user/get-address', {headers: { Authorization: `Bearer ${token}`}})
            if(data.success){
              setUserAddresses(data.addresses)
              if(data.addresses.length > 0){
                setSelectAddress(data.addresses[0])
            }
            }else{
              toast.error(data.message)
            }
          } catch (error) {
            toast.error(error.message)
          }
        
    }

    const placeOrder = async ()=>{
        try {
            if(!selectAddress){
                return toast.error("Please select an address")
            }

            //Convert cart object into API-friendly array
            const items = Object.entries(cartItems).map(([product, quantity])=>({product, quantity})).filter(item=> item.quantity > 0)

            if(items.length === 0){
                return toast.error("Cart is empty")
            }

            const token = await getToken()

            const {data} = await axios.post("/api/order/create", {
                address: selectAddress._id,
                items,
            }, {headers: {Authorization: `Bearer ${token}`}})

            if(data.success){
                router.replace("/order-confirmation")
                toast.success(data.message)
                setCartItems({})
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const placeOrderStripe = async ()=>{
        try {
            if(!selectAddress){
                return toast.error("Please select an address")
            }

            //Convert cart object into API-friendly array
            const items = Object.entries(cartItems).map(([product, quantity])=>({product, quantity})).filter(item=> item.quantity > 0)

            if(items.length === 0){
                return toast.error("Cart is empty")
            }

            const token = await getToken()

            const {data} = await axios.post("/api/order/stripe", {
                address: selectAddress._id,
                items,
            }, {headers: {Authorization: `Bearer ${token}`}})

            if(data.success){
                window.location.href = data.url
                toast.success(data.message)
                setCartItems({})
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(()=>{
        if(user){
            fetchUserAddresses()
        }
    }, [user])

  return (
    <div className="max-w-[360px] w-full bg-white p-5 max-md:mt-16 rounded">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    < div className="relative flex justify-between items-start mt-2">
                        {selectAddress ?
                        <p className="text-gray-500">{selectAddress.streetAddress}, {selectAddress.city},{selectAddress.state}, {selectAddress.country}</p> :
                        <p className="text-gray-500">No address found</p>
                        }
                        <button onClick={() => setShowAddress(!showAddress)} className="text-destructive hover:underline ml-1 cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {userAddresses.map((address, index)=> (
                                    <p key={index} onClick={()=> {setSelectAddress(address); setShowAddress(false)}} className="text-gray-500 p-2 hover:bg-gray-100">
                                    {address.streetAddress}, {address.city},{address.state}, {address.country}
                                    </p>
                                ))}
                                <p onClick={() => {router.push('/add-address'); setShowAddress(false)}} className="text-destructive text-center cursor-pointer p-2 hover:bg-destructive/10">
                                    Add address
                                </p>
                            </div>
                        )}
                </div>

                <p className="text-sm font-medium uppercase mt-3">Promo Code</p>
                <input type="text" className='w-full border border-gray-200 bg-background px-3 pu-2 mt-2'/>

                <p className="text-sm font-medium uppercase mt-4">Payment Method</p>

                <select value={paymentType} onChange={(e)=>setPaymentType(e.target.value)} className="w-full border border-gray-300 bg-background px-3 py-2 mt-2 ">
                     <option value="COD">Cash On Delivery</option>
                     <option value="Stripe">Online Payment</option>
                </select>
            </div>

            <hr className="border-gray-300" />

            <div className="text-gray-500 mt-4 space-y-2">
                <p className="flex justify-between">
                <span>Price</span><span>{currency}{getCartAmount()}</span>
                </p>
                <p className="flex justify-between">
                <span>Shipping Fee</span><span className="text-green-600">Free</span>
                </p>
                <p className="flex justify-between">
                <span>Tax (2%)</span><span>{currency}{(getCartAmount() * 0.02).toFixed(2)} </span>
                </p>
                <p className="flex justify-between text-lg font-medium mt-3">
                <span>Total Amount:</span><span>{currency}{(getCartAmount() + getCartAmount() * 0.02).toFixed(2)}</span>
                </p>
            </div>

            <button onClick={paymentType === "COD" ?  placeOrder : placeOrderStripe} className="w-full py-3 mt-6 cursor-pointer bg-destructive text-white font-medium hover:bg-destructive/90 transition">
             Place Order
            </button>
        </div>
  )


}

export default CartTotal
