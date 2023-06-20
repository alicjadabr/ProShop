import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'

const Header = () => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const logoutHandler = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header> 
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link as={Link} to='/cart'>
                <i className='fas fa-shopping-cart'></i> Cart
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                   <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                   </LinkContainer>
                   <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item> 
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <i className='fas fa-user'></i> Login
                </Nav.Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='admin_menu'>
                  <LinkContainer to='/admin/userList'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productList'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderList'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
