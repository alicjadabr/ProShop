import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Message } from '../components'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderContants'

const OrderScreen = () => {
  const order_id = useParams().id
  const dispatch = useDispatch()

  const [sdkReady, setSdkReady] = useState(false)

  const { order, error, loading } = useSelector(state => state.orderDetails)
  const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPay)

  if(!loading && !error) {
    order.itemsPrice = order.orderItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2)
  }

  const addPaypalScript = () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.paypal.com/sdk/js?client-id=ASr9i4CqPmyXG-5BNXK0jUoIvIpvjVhRX_2ffs01TVUX7JsHJHbdJjfG8aqPQRbA78BHFqYOd6RnJcy_'
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if(!order || successPay || order._id !== Number(order_id)) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(order_id))
    } else if (!order.isPaid) {
      if(!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, order, order_id, successPay])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order_id, paymentResult))
  } 

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address},{' '}
                {order.shippingAddress.postalCode} {order.shippingAddress.city},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant='warning'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='warning'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant='info'>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            className='link'
                          >
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton 
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
              </ListGroup.Item>
              )}

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default OrderScreen