import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Message, Menu, Grid, Image, Icon, Accordion } from 'semantic-ui-react'
import { Container, Checkbox} from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'

const LoginForm = ({userName, password, loginFormChangeHandler, submitHandler}) => {
  return (
    <div>
      <h2>Login to Blog App</h2>
      <form onSubmit={submitHandler}>
      <div>
          username:
          <input 
          value = {userName}
          onChange = {loginFormChangeHandler}
          name = 'userName'
          />
      </div>
      <div>
          password:
          <input 
            value = {password}
            onChange = {loginFormChangeHandler}
            name = 'password'
          />
      </div>
      <button type='submit'>login</button>
      </form>
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



// <h1>Create New Blog</h1>
<Form onSubmit={submitHandler}>
<Form.Field>
  <label>Title</label>
  <input  placeholder="title" value = {title} onChange = {formChangeHandler} name = 'newTitle' />
</Form.Field>
<Form.Field>
  <label>Author</label>
  <input placeholder="author" value = {author} onChange = {formChangeHandler} name = 'newAuhtor' />
</Form.Field>
<Form.Field>
  <label>Url</label>
  <input placeholder="url"  value = {url} onChange = {formChangeHandler} name = 'newUrl' />
</Form.Field>
<Button type='submit'>Create</Button>
</Form> 