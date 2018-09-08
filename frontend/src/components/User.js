import React from 'react'
//import blogService from './../services/blogs'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import { actionFor as usersActionFor } from './../reducers/userReducer'
const uuidv1 = require('uuid/v1');

class User extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    return (
      // TODO: make a table!
    //   //<h1>User</h1>
    //     {this.props.userinfos.map(user => 
    //       <div key={uuidv1()}>{user.name} {user.blogno}</div>
    //     )}    
      <div>
        show user info here!
      </div>
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
      userinfos: formUserInfo(state.users)
  }
}


//export default Blog
export default connect(mapStateToProps,mapDispatchToProps)(User)