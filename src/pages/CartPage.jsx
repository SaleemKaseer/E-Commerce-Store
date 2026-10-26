import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart()
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
            <p className="text-right text-xl font-bold text-gray-800 mt-6">
                Total: ${total.toFixed(2)}
            </p>
        </div>
    )
}

export default CartPage
