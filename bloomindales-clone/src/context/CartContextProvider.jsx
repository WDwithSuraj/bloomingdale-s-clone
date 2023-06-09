import React,{createContext, useState} from 'react'

export const CartContext = createContext();

let cardData = JSON.parse(localStorage.getItem('cartData')) || [];
const initialValue = (cardData.length || 0)
export default function CartContextProvider({children}) {
    const [cartCount, setCartCount] = useState(initialValue)
    const [cartData, setCartData] = useState(cardData)
    const [searchProduct, setSearchProduct] = useState([])
    const [isAuth, setIsAuth] = useState(false)
  return (
   <CartContext.Provider value={{cartData, cartCount, setCartData, setCartCount, searchProduct, setSearchProduct, isAuth, setIsAuth}}>
    {children}
   </CartContext.Provider>
  )
}
