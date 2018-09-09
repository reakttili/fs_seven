import React from 'react'
import { Table } from 'semantic-ui-react'
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
    this.props.history.push(`/users/${id}`)
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
        <Table > 
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Blog Count</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        <Table.Body>
          <Table.Row>
            {this.props.userinfos.map(user => 
              <div key={uuidv1()}>
                <Table.Cell><div onClick={()=>this.handleOnClick(user.id)}>{user.name}</div></Table.Cell>
                <Table.Cell>{user.blogno}</Table.Cell>
              </div>
            )}    
          </Table.Row>


          <Table.Row>
            <Table.Cell>
              
            </Table.Cell>
            <Table.Cell>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
            </Table.Cell>
            <Table.Cell>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table > 


        <h1>Users</h1>
        {this.props.userinfos.map(user => 
          <div key={uuidv1()}>
            <div onClick={()=>this.handleOnClick(user.id)}>{user.name}</div>
            blogno: {user.blogno}
            userid: {user.id}
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
    //console.log(user)
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