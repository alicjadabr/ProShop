import { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [next, setNext] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  if(!shippingAddress.address) {
    return <Navigate replace to="/shipping" />;
  }

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    setNext(prev => !prev);
  }

  if(next) {
    return <Navigate replace to="/placeorder" />;
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>

        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              className='my-4'
              type='radio'
              label='PayPal or Credit Card'
              id='paypal'
              name='paymentMethod'
              value={paymentMethod}
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            >
            </Form.Check>
          </Col>
        </Form.Group>
        <Button className='w-100' type='submit' variant='primary'>
          Continue
        </Button>
      </Form>

    </FormContainer>
  )
}

export default PaymentScreen