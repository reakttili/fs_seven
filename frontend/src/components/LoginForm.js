import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Message, Menu, Grid, Image, Icon, Accordion } from 'semantic-ui-react'
import { Container, Checkbox} from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'

const LoginForm = ({userName, password, loginFormChangeHandler, submitHandler}) => {
  return (
    <div>
      <h2>Login to Blog App</h2>
      <Form onSubmit={submitHandler}>
        <Form.Field>
          <label>username</label>
          <input
            placeholder ="username"
            value = {userName}
            onChange = {loginFormChangeHandler}
            name = 'userName'
          />
        </Form.Field>
        <Form.Field>
          <label> password:</label>
          <input
            placeholder ="password"
            value = {password}
            onChange = {loginFormChangeHandler}
            name = 'password'
          />
        </Form.Field>
        <Button type='submit'>login</Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  userName: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loginFormChangeHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func.isRequired
}

export default LoginForm


