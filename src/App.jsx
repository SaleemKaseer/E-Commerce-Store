import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './Header'
import HomePage from './pages/HomePage'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
