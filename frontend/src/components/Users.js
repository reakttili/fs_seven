import React from 'react'
//import blogService from './../services/blogs'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect  } from 'react-router-dom'
//import { actionFor as usersActionFor } from './../reducers/userReducer'
const uuidv1 = require('uuid/v1');

class Users extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  handleOnClick = (id) =>
  {
    this.props.history.push(`/user/${id}`)
  }
  render() {
    return (
      // TODO: make a table!
      //<Redirect to="/user" />
      //<Route exact path="/notes/:id" render={({match}) =>
      //<Note note={noteById(match.params.id)} />}
      //<a href='aa' onClick={()=>this.handleOnClick(user.id)}>{user.name}</a>
      ///>

      <div>
        <h1>Users</h1>
        {this.props.userinfos.map(user => 
          <div key={uuidv1()}>
            <div onClick={()=>this.handleOnClick(user.id)}>{user.name}</div>
            {user.blogno}
            {user.id}
          </div>
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
    console.log(user)
    return {
      id: user.id,
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