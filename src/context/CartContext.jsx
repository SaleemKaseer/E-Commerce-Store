import { createContext, useState, useContext, useEffect } from 'react'

const STORAGE_KEY = 'cart'

// Read the saved cart from local storage (empty cart if nothing saved or it can't be read)
function loadCart() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : []
    } catch {
        return []
    }
}

// Create a context
const CartContext = createContext()

// Cart Provider Component
export function CartProvider({ children }) {
    // Each cart item is a product plus a `quantity` field
    const [cart, setCart] = useState(loadCart)

    // Save the cart to local storage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
        } catch (err) {
            console.error('Error saving cart:', err)
        }
    }, [cart])

    // Adds a product, or bumps its quantity if it's already in the cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id)
            if (existing) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
    }

    // Sets a product's quantity; going below 1 removes it from the cart
    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId)
            return
        }
        setCart((prevCart) =>
            prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
        )
    }

    // Total number of items, counting quantities
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext value={{ cart, cartCount, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext>
    )
}

// Custom hook for using cart context
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    return useContext(CartContext)
}
