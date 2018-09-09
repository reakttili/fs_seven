import { Form, Button, Message, Menu, Grid, Image, Icon, Accordion } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'

import React from 'react'
const CreateBlogForm = ({title, author, url, formChangeHandler, submitHandler}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submitHandler}>
      <div>
          title:
          <input 
          value = {title}
          onChange = {formChangeHandler}
          name = 'newTitle'
          />
      </div>
      <div>
          author:
          <input 
            value = {author}
            onChange = {formChangeHandler}
            name = 'newAuhtor'
          />
      </div>
      <div>
          url:
          <input 
            value = {url}
            onChange = {formChangeHandler}
            name = 'newUrl'
          />
      </div>
      <Button type='submit'>create</Button>
      </form>
    </div>
  )

}
export default CreateBlogForm

