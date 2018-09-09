import { Form, Button, Message, Menu, Grid, Image, Icon, Accordion } from 'semantic-ui-react'
import { Container, Checkbox} from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'


import React from 'react'
const CreateBlogForm = ({title, author, url, formChangeHandler, submitHandler}) => {

  // <Grid>
  // <Grid.Row>
  //    <Grid.Column>
  return (
    <div>
      <h1>Create New Blog</h1>
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
  </div>

    // <div>
    //   <h2>Create New</h2>
    //   <form onSubmit={submitHandler}>
    //   <div>
    //       Title
    //       <input 
    //       value = {title}
    //       onChange = {formChangeHandler}
    //       name = 'newTitle'
    //       />
    //   </div>
    //   <div>
    //       Author
    //       <input 
    //         value = {author}
    //         onChange = {formChangeHandler}
    //         name = 'newAuhtor'
    //       />
    //   </div>
    //   <div>
    //       Url
    //       <input 
    //         value = {url}
    //         onChange = {formChangeHandler}
    //         name = 'newUrl'
    //       />
    //   </div>
    //   <Button type='submit'>create</Button>
    //   </form>
    // </div>
  )

}
export default CreateBlogForm

