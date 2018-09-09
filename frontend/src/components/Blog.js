import React from 'react'
import blogService from './../services/blogs'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actionFor as blogsActionFor } from './../reducers/blogReducer'
import { actionFor as notificationActionFor } from './../reducers/notificationReducer'
import { Form, Button, Message, Menu, Grid, Image, Icon, Accordion } from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'
const uuidv1 = require('uuid/v1');

const blogStyle = {
  paddingTop: 0,
  paddingLeft: 0,
  border: '',
  borderWidth: 0,
  marginBottom: 20
}

class Blog extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      bShowAll: this.props.ownProps.bShowAll,
      comments: this.props.ownProps.blog.comments
    }
    this.parentRender = props.parentRender
    this.hideDelete = false
    

  }

  static propTypes = {
    blog: PropTypes.object.isRequired,
    parentRender: PropTypes.func.isRequired
  }


  toggleShowAll = () => {
    this.setState({ bShowAll: !this.state.bShowAll })
  }

  handleLikeClick = async (event) => {
    this.props.like(
      {title:this.props.ownProps.blog.title, 
      author: this.props.ownProps.blog.author, 
      url: this.props.ownProps.blog.url, 
      adderid: this.props.ownProps.blog.user,
      likes:this.props.ownProps.blog.likes,
      blogid: this.props.ownProps.blog.id})
  }

  handleDeleteClick = async (event) => {
    if (window.confirm("Delete blog?")) {
      this.props.deleteBlog(this.props.ownProps.blog.id)
      //const updated = await blogService.deleteBlog(this.props.ownProps.blog.id) 
      //this.parentRender()
    }
  }

  
  //<div className="namediv" onClick={() => this.setState({bShowAll:false})}>
  showAll = () => {

  //   <Table striped celled>
  //   <Table.Body>
  //    {anecdotes.map(anecdote => 
  //       <Table.Row key={anecdote.id} >
  //         <Table.Cell>
  //           <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
  //         </Table.Cell>
  //       </Table.Row>
  //     )}
  //   </Table.Body>
  // </Table>
            // <div className="namediv" onClick={() => null}>
            //   <h1>{ this.props.ownProps.blog.title} {this.props.ownProps.blog.author}</h1>
            // </div>

            // <div>
            //     <a href={this.props.ownProps.blog.url}>{this.props.ownProps.blog.url}</a>
            //   </div>
    const addedby = (this.props.ownProps.blog.user) ? this.props.ownProps.blog.user.name : '';
    return(
      <div>
      <Table > 
        <Table.Body>
          
          <Table.Row>
            <Table.Cell>
              <div className="namediv" onClick={() => null}>
                <h1>{ this.props.ownProps.blog.title} {this.props.ownProps.blog.author}</h1>
              </div>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              {this.props.ownProps.blog.likes} likes                        
              <Button floated={"right"} name='like' onClick={this.handleLikeClick}>like</Button>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <div>
                <a href={this.props.ownProps.blog.url}>{this.props.ownProps.blog.url}</a>
              </div>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <div>
                added by: {addedby}
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        
      </Table>
      <h1>Comments</h1>
      {this.renderComments(this.props.ownProps.blog.comments)}
      <input name = 'commentInput'  ref={input=>{this.myInput=input}} />
      <button name='addCommentButton' ref={commentbtn=>{this.commentbtn=commentbtn}} onClick={this.handleAddComment.bind(this)}>add comment</button>
      </div>
      

    )
  }

  handleAddComment = async () => {
    // Todo: with redux!
    console.log("handleAddcommmet")
    console.log(this.myInput.value)
    console.log(this.props.ownProps.blog.id)
    const updated = this.props.ownProps.blog
    updated.comments = [...updated.comments, this.myInput.value]
    const ut = await blogService.addComment(updated)
    this.setState({comments:ut.comments})
    this.props.notify("Comment: "+this.myInput.value,3,0)

  }


  renderComments = (comments) =>
  {
    if (comments) {
      return comments.map(comment=>{
        return(<div key={uuidv1()}>{comment}</div>)
      })

    }
  }

  //this.setState({bShowAll:true})
  //this.props.ownProps.history.push(`/users/${this.props.ownProps.blog.id}`
  showLimited = () => {
    return(
      <div className="namediv" onClick={() => this.props.ownProps.history.push(`/blogs/${this.props.ownProps.blog.id}`)}>
        {this.props.ownProps.blog.title} {this.props.ownProps.blog.author} 
      </div>)
  }

  render() {
    //console.log('adder here',this.state.adder.name)
    let show = this.showAll
    if (this.state.bShowAll) {
      show = this.showAll
    } else {
      show = this.showLimited
    }
    
    let showDelete = () => {return null}
    if (window.localStorage.getItem('loggeUser'))
    {
      let loggeduser = window.localStorage.getItem('loggeUser')
      let blogadder = this.props.ownProps.blog.user
      //console.log('user', blogadder)
      if (!this.props.ownProps.bShowAll) {
        if (!blogadder) {
        
          showDelete = () =>{
            //<Button animated>
            return <Button name='delete' onClick={this.handleDeleteClick}>delete</Button>
          }
        
        }
        else { 
          loggeduser = JSON.parse(loggeduser).username
          blogadder = blogadder.username
          if (loggeduser === String(blogadder)) {
            showDelete = () =>{
              return <Button name='delete' onClick={this.handleDeleteClick}>delete</Button>
            }
          }
        }
      }
    }
       
    return (
      <div className="maindiv" style={blogStyle}> 
      <Grid>
        <Grid.Column width={13} >
          {show()}
        </Grid.Column>
        <Grid.Column width={3}>
          {showDelete()}
        </Grid.Column>
      </Grid>
      </div>
    )
  }
}

Blog.propTypes = {
  like: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  like: blogsActionFor.liking,
  deleteBlog: blogsActionFor.deletion,
  notify: notificationActionFor.notify,
}

const mapStateToProps = (state, ownProps) => {
  return {
      ownProps: ownProps
    //notificationData: state.notification,
    //blogs: state.blogs
  }
}


//export default Blog
export default connect(mapStateToProps,mapDispatchToProps)(Blog)