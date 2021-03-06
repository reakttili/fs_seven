import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect  } from 'react-router-dom'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { connect } from 'react-redux'
import { actionFor as notificationActionFor } from './reducers/notificationReducer'
import { actionFor as blogsActionFor } from './reducers/blogReducer'
import { actionFor as usersActionFor } from './reducers/userReducer'
import { actionFor as loggedActionFor } from './reducers/loggedUserReducer'
import PropTypes from 'prop-types'
import { Form, Button, Message, Menu, Grid, Image, Icon, Accordion } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'

//import userService from './services/users'


const MenuC = () => (
  <Menu inverted>
    <Menu.Item link>
      <NavLink exact to="/blogs"  activeStyle={{fontWeight: 'bold', color: 'red'}}>Blogs</NavLink> 
    </Menu.Item>
    <Menu.Item link>
      <NavLink exact to="/users"  activeStyle={{fontWeight: 'bold', color: 'red' }}>Users</NavLink>
    </Menu.Item>
  </Menu>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      userName: '',
      password: '',
      newTitle:'',
      newAuhtor:'',
      newUrl:'',
      notification: {className:'',msg:''},
      updateToggle:false
    }
  }


  

  toggleRender() {
    this.setState({updateToggle: this.state.updateToggle})
  }
  
  componentDidMount() {
    
    // userService.getAll()
    // .then(resp => console.log(resp))
    
    //console.log("@componentDidMount")
    
    this.props.initblogs()
    const temp = window.localStorage.getItem('loggeUser')
    if (temp) {
      const user = JSON.parse(temp)
      console.log('user for setter:', user)
      this.props.setLoggedUser(user)
      this.setState({
        name: user.name
        })
      blogService.setToken(user.token)
    } else{
      console.log('No logged user')
    }
    
    this.props.initUsers()

    //console.log("users from store:", this.props.users)
  } 

  handleLoginFormChange = (event) =>
  {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit = async (event) =>
  {
    //console.log("@HandleSubmit")
    event.preventDefault()
    try {
      const user = await loginService.login(this.state.userName, this.state.password)
      this.setState({
        name:user.name,
        password:'',
      })
      this.props.setLoggedUser(user)
      blogService.setToken(user.token)
      //console.log(user)
      window.localStorage.setItem('loggeUser', JSON.stringify(user))
      //console.log("@handle submit: all ok")
      this.props.notify('Login success', 3,0)
    } catch (exception) {
      const notification = {msg:'hmm', className:'info'}
      this.setState({notification})
      this.props.notify('Login error', 3,1)
      //console.log("@handle submit: username/password error")
    }
  }
  handleCreateNewBlog = async (event) =>
  {
    //console.log("@handleCreateNewBlog")
    event.preventDefault()
    try {
      this.props.createBlog(
        this.state.newTitle,
        this.state.newAuhtor,
        this.state.newUrl
      )
      // await blogService.create(
      //   this.state.newTitle, 
      //   this.state.newAuhtor, 
      //   this.state.newUrl)
      //this.props.initblogs()
      
      this.props.notify('Blog created', 3,0)
      
    } catch (exception) {
      console.log(exception)
      this.props.notify('Error creating a blog', 3,1)
    }
  }

  handleCreateNewBlogFormChange = async (event) =>
  {
    event.preventDefault()
    //console.log("@handleCreateNewBlogFormChange")
    //console.log(event.target.name)
    //console.log(event.target.value)
    this.setState({[event.target.name]:event.target.value})
  }
  handleLogout = (event) =>
  {
    this.setState({
      userName:'',
      name:'',
      password:'',
    })
    this.props.setLoggedUser(null)
    window.localStorage.removeItem('loggeUser')
    
  }
  sortBlogs = (blogs) => {
    const cmp = (a,b) => {
      if (a.likes > b.likes ) {
        return 1
      }
      if (a.likes < b.likes ) {
        return -1
      }
      return 0
    }
    return blogs.sort(cmp)
  }

  render() {

    //console.log('blogs to render', this.props.blogs)
    //console.log('users to render', this.props.users)
    console.log('render user', this.props.loggedUserR)
    if (this.props.loggedUserR === null) {
      return (
        <div>
        <br></br>
        <Container>
        <Notification />
        
         <Togglable buttonLabel="show login form" buttonLabel_hide="hide login form">
          <LoginForm 
            userName={this.state.userName}
            password={this.state.password}
            loginFormChangeHandler={this.handleLoginFormChange}
            submitHandler={this.handleSubmit}
            />
          </Togglable>
        </Container>
        </div>
      )
    }

    let renderBlogs = (history) =>
    {
      
      return (
        <Table striped celled>
          <Table.Body>
            {this.props.blogs.map(blog => 
              <Table.Row key={blog.id+Math.random().toString()} >
                <Table.Cell>
                  <Blog key={blog.id+Math.random().toString()} blog={blog}  history={history}  bShowAll={false} parentRender = {() => {}} />
                </Table.Cell>
               </Table.Row>
            )}
          </Table.Body>
        </Table>
      )

  //     <div>
  //   <h2>Anecdotes</h2>
  //   <Table striped celled>
  //     <Table.Body>
  //      {anecdotes.map(anecdote => 
  //         <Table.Row key={anecdote.id} >
  //           <Table.Cell>
  //             <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
  //           </Table.Cell>
  //         </Table.Row>
  //       )}
  //     </Table.Body>
  //   </Table>
  // </div>



    }
    // if (!this.props.blogs)
    // {
    //   //return ({<div></div>})
    //   renderBlogs = () => {<div>no blogs!</div>}
    // } 
    // <Route exact path="/notes/:id" render={({match}) =>
    //         <Note note={noteById(match.params.id)} />}
    //           />
    
    const userById = (id) => {
      console.log("does this execute?")
      console.log(id)
      //console.log('userbyid', id)
      //console.log('all users', this.props.users)
      const founduser = this.props.users.find(user => {
          const a = String(user.id)
          const b = String(id)

          return a === b
        }
      )
      console.log("found user?")
      console.log(this.props.users)
      
      return founduser
    }

    const blogById = (id) => {
      const foundblog = this.props.blogs.find(blog => {
          const a = String(blog.id)
          const b = String(id)
          return a === b
        }
      )
      return foundblog
    }

    // <Route exact path="/blogs/:id" render={({match}) => 
    //           <User user={userById(match.params.id)}/>
    //           <Blog key={match.params.id+Math.random().toString()} blog={blog}  parentRender = {() => {}}/>
    //           }/>
    
    return (
      
      <Container>
        {this.state.updateToggle}
          <Router>
            <Grid>
             <Grid.Row>
                <Grid.Column>
                  <h1>Blog App</h1>
                  <MenuC />
                  <Notification />
                  <div align="right" >Kirjautuneena: {this.props.loggedUserR.name} </div>
                  <Button floated= {"right"} name='logoutbtn' size={"mini"} onClick={this.handleLogout}>logout</Button>
                  <Togglable buttonLabel="show create blog form" buttonLabel_hide="hide create blog form" >
                    <CreateBlogForm 
                      title={this.state.newTitle}
                      author={this.state.newAuhtor}
                      url={this.state.newUrl}
                      formChangeHandler={this.handleCreateNewBlogFormChange}
                      submitHandler={this.handleCreateNewBlog}
                    />        
                  </Togglable>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Route exact path="/blogs/:id" render={({match}) => 
                    <Blog blog={blogById(match.params.id)} bShowAll={true}/>} />
                  
                  <Route exact path="/" render={({history}) => 
                    <div>
                      <h2>All Blogs</h2>
                      {renderBlogs(history)}
                    </div>
                  }/>
                  <Route path="/blogs/" render={({history}) => 
                    <div>
                      <h2>All Blogs</h2>
                      {renderBlogs(history)}
                    </div>
                  }/>
                  <Route exact path="/users" render={({history}) => <Users history={history} />} />
                  <Route exact path="/users/:id" render={({match}) => 
                    <User user={userById(match.params.id)}/>} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Router>
      </Container>
      
    );
  }
}
 //<Blog key={blog.id+Math.random().toString()} blog={blog}  history={history}  parentRender = {() => {}} />
const sortBlogs = (blogs) => {
  const cmp = (a,b) => {
    if (a.likes < b.likes ) {
      return 1
    }
    if (a.likes > b.likes ) {
      return -1
    }
    return 0
  }
  const s = blogs.sort(cmp)
  return s
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  notify: notificationActionFor.notify,
  initblogs: blogsActionFor.initializeBlogs,
  initUsers: usersActionFor.initializing,
  createBlog: blogsActionFor.blogCreation,
  setLoggedUser: loggedActionFor.settingLoggedUser
}

const mapStateToProps = (state) => {
  return {
    notificationData: state.notification,
    blogs: sortBlogs(state.blogs),
    users: state.users,
    loggedUserR: state.loggedUser
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)


