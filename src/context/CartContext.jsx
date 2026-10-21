import { createContext, useState, useContext } from 'react'

// Create a context
const CartContext = createContext()

// Cart Provider Component
export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product])
    }

    // Removes a single item at the given position in the cart
    // (by index, so duplicates of the same product are removed one at a time)
    const removeFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index))
    }

    return (
        <CartContext value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext>
    )
}

// Custom hook for using cart context
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    return useContext(CartContext)
}
