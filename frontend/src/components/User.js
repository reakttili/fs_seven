import React from 'react'
//import blogService from './../services/blogs'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import { actionFor as usersActionFor } from './../reducers/userReducer'
const uuidv1 = require('uuid/v1');

class User extends React.Component {
  render() {
    let f = () => null
    if (this.props.ownProps.user)
    {
     f = () =>
      {
        return (
          <div>
            <h1>{this.props.ownProps.user.name}</h1>
            <h2>Added blogs</h2>
            {this.props.ownProps.user.blogs.map(blog=>
              <div key={uuidv1()}>{blog.title} by {blog.author}</div>)}
          </div>
        )
      }
    }
    return (
      f()
    )
  }
}
User.propTypes = {
}
const mapDispatchToProps = {
}
const formUserInfo = (users) =>
{
  const m = users.map(user => {
    return {
      name: user.username,
      blogno: user.blogs.length
    }
      
  })
  return m
}
const mapStateToProps = (state, ownProps) => {
  return {
      userinfos: formUserInfo(state.users),
      ownProps: ownProps
  }
}
//export default Blog
export default connect(mapStateToProps,mapDispatchToProps)(User)