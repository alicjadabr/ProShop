import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Message, FormContainer } from '../components'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
  const userId = useParams().id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { error, loading, user } = useSelector((state) => state.userDetails)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdate)

  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userList')
    } else {
      if (!user.name || user._id !== Number(userId)) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, userId, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    const body = {
      _id: user._id,
      name,
      email,
      isAdmin,
    }
    dispatch(updateUser(body))
  }

  return (
    <div>
      <Link to='/admin/userList'>Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label className='mt-3 mb-0'>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin' className='mt-3'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button className='w-100 mt-5' type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default UserEditScreen
