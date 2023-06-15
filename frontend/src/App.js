import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  PaymentScreen,
  PlaceOrderScreen,
  ProductScreen,
  ProfileScreen,
  RegisterScreen,
  ShippingScreen
} 
from './screens'


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/product/:id' element={<ProductScreen />}/>
            <Route path='/cart/' element={<CartScreen />}>
              <Route path='/cart/:id' element={<CartScreen />}/>
            </Route>
            <Route path='/profile' element={<ProfileScreen />}/>
            <Route path='/shipping' element={<ShippingScreen />}/>
            <Route path='/payment' element={<PaymentScreen />}/>
            <Route path='/placeorder' element={<PlaceOrderScreen />}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
