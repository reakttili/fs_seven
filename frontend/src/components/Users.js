import React from 'react'
//import blogService from './../services/blogs'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import { actionFor as usersActionFor } from './../reducers/userReducer'
const uuidv1 = require('uuid/v1');

class Users extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    return (
      // TODO: make a table!
      <div>
        <h1>Users</h1>
        {this.props.userinfos.map(user => 
          <div key={uuidv1()}>{user.name} {user.blogno}</div>
        )}    
      </div>
    )
  }
}
Users.propTypes = {
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
export default connect(mapStateToProps,mapDispatchToProps)(Users)