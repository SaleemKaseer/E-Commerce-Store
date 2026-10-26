import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ id, title, price, image, onAddToCart }) {
    const [isFavorite, setIsFavorite] = useState(false)
    // Briefly true after clicking "Add to Cart", to show the "Added" feedback
    const [justAdded, setJustAdded] = useState(false)

    // Switch the button back to "Add to Cart" after a moment
    useEffect(() => {
        if (!justAdded) return
        const timer = setTimeout(() => setJustAdded(false), 1200)
        return () => clearTimeout(timer)
    }, [justAdded])

    function handleAddToCart() {
        onAddToCart()
        setJustAdded(true)
    }

    return (
        <div className="group p-4 bg-white rounded-lg shadow flex flex-col items-center text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link to={`/product/${id}`} className="flex flex-col items-center">
                <img
                    src={image}
                    alt={title}
                    className="w-32 h-32 object-contain mb-4 transition duration-300 group-hover:scale-110"
                />
                <h3 className="text-lg font-bold text-gray-800 line-clamp-2 transition-colors group-hover:text-teal-700">
                    {title}
                </h3>
            </Link>
            <p className="text-blue-600 font-semibold mt-2">${price.toFixed(2)}</p>
            <div className="mt-auto pt-4 flex gap-2">
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`py-1 px-3 rounded transition duration-200 hover:scale-110 ${
                        isFavorite
                            ? 'bg-red-500 text-white hover:bg-red-600'
                            : 'bg-gray-300 hover:bg-red-100 hover:text-red-600'
                    }`}
                >
                    {isFavorite ? '♥ Unfavorite' : '♡ Favorite'}
                </button>
                <button
                    onClick={handleAddToCart}
                    className={`py-1 px-3 rounded text-white transition duration-200 active:scale-90 ${
                        justAdded ? 'bg-green-600 scale-105' : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                >
                    {justAdded ? '✓ Added!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    )
}

export default ProductCard
