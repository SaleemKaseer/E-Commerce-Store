import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
    // Whether the "remove all items?" confirmation is open
    const [showConfirm, setShowConfirm] = useState(false)
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    if (cart.length === 0) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-600">Your cart is empty.</p>
                <Link to="/" className="text-teal-700 hover:underline mt-2 inline-block">Continue shopping</Link>
            </div>
        )
    }

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>
            <ul className="space-y-4">
                {cart.map((item) => (
                    <li key={item.id} className="p-4 bg-white rounded-lg shadow flex flex-wrap items-center gap-4">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                        <Link to={`/product/${item.id}`} className="flex-1 min-w-40 font-semibold text-gray-800 hover:text-teal-700">
                            {item.title}
                        </Link>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold"
                                aria-label="Decrease quantity"
                            >
                                −
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 font-bold"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                        <p className="w-24 text-right text-blue-600 font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="py-1 px-3 rounded bg-red-500 text-white hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-6 flex items-center justify-between gap-4">
                <button
                    onClick={() => setShowConfirm(true)}
                    className="py-2 px-4 rounded border border-red-500 text-red-600 transition duration-200 hover:bg-red-50 active:scale-95"
                >
                    Clear Cart
                </button>
                <p className="text-xl font-bold text-gray-800">
                    Total: ${total.toFixed(2)}
                </p>
            </div>

            {showConfirm && (
                // Dark overlay; clicking outside the box cancels
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
                    onClick={() => setShowConfirm(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="clear-cart-title"
                        className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h2 id="clear-cart-title" className="text-lg font-bold text-gray-800">
                            Remove all items?
                        </h2>
                        <p className="text-gray-600 mt-2">
                            This will empty your cart. This can't be undone.
                        </p>
                        <div className="mt-6 flex justify-center gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="py-2 px-4 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    clearCart()
                                    setShowConfirm(false)
                                }}
                                className="py-2 px-4 rounded bg-red-500 text-white hover:bg-red-600"
                            >
                                Yes, remove all
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage
