import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'
import { Rating, Loader, Message } from '../components'

const ProductScreen = () => {
  const [qty, setQty] = useState(1)

  const product_id = useParams().id
  let navigate = useNavigate()

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { error, loading, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(product_id))
    }, [dispatch, product_id])

  const addToCartHandler = () => {
    navigate(`/cart/${product_id}?qty=${qty}`)
  }

  return (
    <div>
      <Link to='/' className='btn btn-secondary my-3'>Go Back</Link>
      { loading ? <Loader />
      : error ? <Message variant='danger'>{error}</Message>
      : 
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating 
                value={product.rating} 
                text={`${product.numReviews} reviews`}
                color={'#f8e825'}
              />
            </ListGroup.Item>

            <ListGroup.Item>
              <h6>Price: ${product.price}</h6>
            </ListGroup.Item>

            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>

          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                  <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                  <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Quantity:</Col>
                    <Col className='my-1'>
                      <Form.Control 
                        onChange={e => setQty(e.target.value)}
                        as='select' 
                        value={qty}
                      >
                        {
                          [...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x+1}>
                              {/* cause array start 0 */}
                              {x + 1} 
                            </option>
                          )) 
                        } 
                          
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button 
                  className='w-100' 
                  disabled={product.countInStock === 0 } 
                  type='button'
                  onClick={addToCartHandler}
                  >
                    Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
}
    </div>
  )
}

export default ProductScreen
