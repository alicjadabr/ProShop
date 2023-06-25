import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header, Footer } from './components'
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  OrderScreen,
  PaymentScreen,
  PlaceOrderScreen,
  ProductEditScreen,
  ProductScreen,
  ProductListScreen,
  ProfileScreen,
  RegisterScreen,
  ShippingScreen,
  UserEditScreen,
  UserListScreen
} from './screens'

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
            <Route path='/order/:id' element={<OrderScreen />}/>

            <Route path='/admin/userList' element={<UserListScreen />}/>
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />}/>
            <Route path='/admin/productList' element={<ProductListScreen />}/>
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
