import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer, CheckoutSteps } from '../components'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = () => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()

  const [next, setNext] = useState(false)

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = e => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    setNext(prev => !prev)
  }

  if(next) {
    return <Navigate replace to='/payment' />
  }

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter address'
              value={address ? address : ''}
              onChange={(e) => setAddress(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label className='my-2'>City</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter city'
              value={city ? city : ''}
              onChange={(e) => setCity(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='Postal Code'>
            <Form.Label className='my-2'>Postal Code</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter postal code'
              value={postalCode ? postalCode : ''}
              onChange={(e) => setPostalCode(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
            <Form.Label className='my-2'>Country</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter country'
              value={country ? country : ''}
              onChange={(e) => setCountry(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Button className='mt-5 w-100'type='submit' variant='primary'>
            Continue
          </Button>

      </Form>

    </FormContainer>
  )
}

export default ShippingScreen