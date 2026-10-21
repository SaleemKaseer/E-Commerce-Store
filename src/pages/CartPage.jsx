import { Link } from 'react-router-dom'

function CartPage({ cart, removeFromCart }) {
    const total = cart.reduce((sum, item) => sum + item.price, 0)

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
                {cart.map((item, index) => (
                    <li key={index} className="p-4 bg-white rounded-lg shadow flex items-center gap-4">
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                        <Link to={`/product/${item.id}`} className="flex-1 font-semibold text-gray-800 hover:text-teal-700">
                            {item.title}
                        </Link>
                        <p className="text-blue-600 font-semibold">${item.price.toFixed(2)}</p>
                        <button
                            onClick={() => removeFromCart(index)}
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
