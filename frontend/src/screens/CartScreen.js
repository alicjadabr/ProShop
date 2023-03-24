import React, { useEffect } from "react";
import {
  Link,
  useSearchParams,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  ListGroupItem,
} from "react-bootstrap";

import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty"));

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=shipping`);
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="success">
            Your cart is empty. <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link className="link" to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                      as="select"
                      value={item.qty}
                      className="qty"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {/* cause array start 0 */}
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ${cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Button 
              type="button" 
              className="w-100" 
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}>
              Proceed to chceckout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;