import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import HomePage from './pages/HomePage'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  // Removes a single item at the given position in the cart
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
