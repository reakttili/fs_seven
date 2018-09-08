import React from 'react'
import Blog from './components/Blog'
import Users from './components/Users'
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
import PropTypes from 'prop-types'

//import userService from './services/users'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      userName: '',
      password: '',
      user: null,
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
    const loggedUser = window.localStorage.getItem('loggeUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({
        user,
        name: user.name
        })
      blogService.setToken(user.token)
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
        user
      })
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
      user: null
    })
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
    console.log('users to render', this.props.users)
    if (this.state.user === null) {
      return (
        <div>
        
        <Notification />
         <Togglable buttonLabel="show">
          <LoginForm 
            userName={this.state.userName}
            password={this.state.password}
            loginFormChangeHandler={this.handleLoginFormChange}
            submitHandler={this.handleSubmit}
            />
          </Togglable>
        </div>
      )
    }

    let renderBlogs = () =>
    {
      
      return (
        this.props.blogs.map(blog => 
            <Blog key={blog.id+Math.random().toString()} blog={blog}  parentRender = {() => {}} />
        )
      )
    }
    // if (!this.props.blogs)
    // {
    //   //return ({<div></div>})
    //   renderBlogs = () => {<div>no blogs!</div>}
    // } 
    return (
      <div>
        {this.state.updateToggle}
        <Notification />
        kirjautuneena: {this.state.name} 
        <button name='logoutbtn' onClick={this.handleLogout}>logout</button>
        <Users />
        <h2>blogs Redux</h2>
        {renderBlogs()}
        <Togglable buttonLabel="show create blog form">
          <CreateBlogForm 
            title={this.state.newTitle}
            author={this.state.newAuhtor}
            url={this.state.newUrl}
            formChangeHandler={this.handleCreateNewBlogFormChange}
            submitHandler={this.handleCreateNewBlog}
          />        
        </Togglable>
      </div>
    );
  }
}

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
  createBlog: blogsActionFor.blogCreation
}

const mapStateToProps = (state) => {
  return {
    notificationData: state.notification,
    blogs: sortBlogs(state.blogs),
    users: state.users
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)


