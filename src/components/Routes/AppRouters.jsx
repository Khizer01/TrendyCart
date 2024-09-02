import { Navigate, Route, Routes } from 'react-router-dom';
import { Cart, Home, Login, ProductDetail, ProductList, SignUp, Success } from '../export';
import { useSelector } from 'react-redux';

export default function AppRouters() {
  const user = useSelector(state => state.user.currentUser);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={user ? <Navigate to='/' /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to='/' /> : <SignUp />} />

      <Route path='/products' element={<ProductList />} />

      <Route path='/products/:category' element={<ProductList />} />

      <Route path='/product/:id' element={<ProductDetail />} />
      <Route path='/cart' element={user ? <Cart /> : <Navigate to='/login' /> } />
      <Route path='/success' element={<Success />} />
    </Routes>
  )
}
