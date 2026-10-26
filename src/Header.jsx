import { Link } from 'react-router-dom'
import { useCart } from './context/CartContext'

function Header() {
    const { cartCount } = useCart()

    return (
        <header className="p-6 bg-teal-700 shadow-md flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-white">
                Welcome To Mega Store
            </Link>
            <Link
                to="/cart"
                className="bg-white text-teal-700 font-semibold py-2 px-4 rounded-lg hover:bg-teal-50"
            >
                🛒 Cart ({cartCount})
            </Link>
        </header>
    )
}

export default Header
