import React from 'react'
import blogService from './../services/blogs'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actionFor as blogsActionFor } from './../reducers/blogReducer'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

class Blog extends React.Component {
  
  constructor(props) {
    super(props)

    //console.log("OWN PROPS:")
    //console.log(this.props.ownProps)
    //console.log(blogsActionFor.liking)

    this.state = {
      bShowAll: false,
      title: props.ownProps.blog.title,
      author: props.ownProps.blog.author,
      url: props.ownProps.blog.url,
      likes: props.ownProps.blog.likes,
      adder: props.ownProps.blog.user,
      blogid: props.ownProps.blog.id
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
    //this.parentRender()  

    // const updated = await blogService.updateLikes(
    //   this.state.title, 
    //   this.state.author, 
    //   this.state.url, 
    //   this.state.adder._id,
    //   this.state.likes,
    //   this.state.blogid) 
    // console.log('paivitetty', updated)
    // console.log(this.state.blogid)
    // console.log(this.state.adder._id)
    // console.log("@handleLikeClick")
    // this.setState({likes:updated.data.likes},this.parentRender)
    // const allblogs = await blogService.getAll()
    // console.log('allafterlikeclick',allblogs)
    // this.parentRender()
  }

  handleDeleteClick = async (event) => {
    if (window.confirm("Delete blog?")) {
      const updated = await blogService.deleteBlog(this.state.blogid) 
      this.parentRender()
    }
  }

  showAll = () => {
    const addedby = (this.state.adder) ? this.state.adder.name : '';
    return(
      <div>
        <div className="namediv" onClick={() => this.setState({bShowAll:false})}>
          {this.state.title} {this.state.author}
        </div>
        <div>
          <a href={this.state.url}>{this.state.url}</a>
        </div>
        <div>
          {this.props.ownProps.blog.likes} likes
          <button name='like' onClick={this.handleLikeClick}>like</button>
        </div>
        <div>
          added by: {addedby}
        </div>

        
      </div>
    )
  }

  showLimited = () => {
    return(
      <div className="namediv" onClick={() => this.setState({bShowAll:true})}>
        {this.state.title} {this.state.author} 
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
      let blogadder = this.state.adder
      if (!blogadder) {
        showDelete = () =>{
          return <button name='delete' onClick={this.handleDeleteClick}>delete</button>
        }
      }
      else { 
        loggeduser = JSON.parse(loggeduser).username
        blogadder = blogadder.username
        if (loggeduser === String(blogadder)) {
          showDelete = () =>{
            return <button name='delete' onClick={this.handleDeleteClick}>delete</button>
          }
        }
      }
    }
       
    return (
      <div className="maindiv" style={blogStyle}> 
      {show()}
      {showDelete()}
      </div>
    )
  }
}

Blog.propTypes = {
  like: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  like: blogsActionFor.liking
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