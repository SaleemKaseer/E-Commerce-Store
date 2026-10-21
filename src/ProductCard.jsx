import { useState } from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ id, title, price, image, onAddToCart }) {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center text-center">
            <Link to={`/product/${id}`} className="flex flex-col items-center">
                <img src={image} alt={title} className="w-32 h-32 object-contain mb-4" />
                <h3 className="text-lg font-bold text-gray-800 line-clamp-2 hover:text-teal-700">
                    {title}
                </h3>
            </Link>
            <p className="text-blue-600 font-semibold mt-2">${price.toFixed(2)}</p>
            <div className="mt-auto pt-4 flex gap-2">
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`py-1 px-3 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
                >
                    {isFavorite ? 'Unfavorite' : 'Favorite'}
                </button>
                <button
                    onClick={onAddToCart}
                    className="py-1 px-3 rounded bg-teal-600 text-white hover:bg-teal-700"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard
