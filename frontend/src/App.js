import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { connect } from 'react-redux'
import { actionFor as notificationActionFor } from './reducers/notificationReducer'
import { actionFor as blogsActionFor } from './reducers/blogReducer'
import PropTypes from 'prop-types'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
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

    this.updateBlogs = this.updateBlogs.bind(this)
  }

  toggleRender() {
    this.setState({updateToggle: this.state.updateToggle})
    console.log("togglerender!")
  }
  
  componentDidMount() {
    console.log("@componentDidMount")
    this.props.initblogs()
    
    
    blogService.getAll().then(blogs =>
      {this.setState({ blogs:this.sortBlogs(blogs) })}
    )
     // Try to login with local storage
     const loggedUser = window.localStorage.getItem('loggeUser')
     //console.log('LOGGED USER: ', loggedUser)
     if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({
        user,
        name: user.name
        })
      blogService.setToken(user.token)
     }
  } 

  updateBlogs() {
    blogService.getAll().then(blogs =>
      {
        this.setState({ blogs: this.sortBlogs(blogs) }, () => console.log('all at parent:', blogs) )
      }
    )
  }

  handleLoginFormChange = (event) =>
  {
    event.preventDefault()
    console.log("@handleUserNameChange")
    console.log(event.target.value)
    console.log(event.target.name)
    this.setState({[event.target.name]: event.target.value})
    
  }

  handleSubmit = async (event) =>
  {
    console.log("@HandleSubmit")
    event.preventDefault()
    try {
      const user = await loginService.login(this.state.userName, this.state.password)


      this.setState({
        name:user.name,
        password:'',
        user
      })
      blogService.setToken(user.token)
      console.log(user)
      window.localStorage.setItem('loggeUser', JSON.stringify(user))
      console.log("@handle submit: all ok")
      this.props.notify('Login success', 3,0)
  


    } catch (exception) {
      const notification = {msg:'hmm', className:'info'}
      this.setState({notification})
      this.props.notify('Login error', 3,1)
      console.log("@handle submit: username/password error")
    }
  }

  notify = (msge) => {
    const notification = {msg:msge, className:'info'}
    this.setState({notification})
    setTimeout(()=> {
      this.setState({notification:null})
    },5000)
  }

  notifyError = (msg) => {
    const notification = {msg:msg, className:'error'}
    this.setState({notification})
    setTimeout(()=> {
      this.setState({notification:null})
    },5000)
  }


  handleCreateNewBlog = async (event) =>
  {
    console.log("@handleCreateNewBlog")
    event.preventDefault()
    try {
      await blogService.create(
        this.state.newTitle, 
        this.state.newAuhtor, 
        this.state.newUrl)
      this.updateBlogs()
      
      this.props.notify('Blog created', 3,0)
      
    } catch (exception) {
      console.log(exception)
      this.props.notify('Error creating a blog', 3,1)
    }
  }

  handleCreateNewBlogFormChange = async (event) =>
  {
    event.preventDefault()
    console.log("@handleCreateNewBlogFormChange")
    console.log(event.target.name)
    console.log(event.target.value)
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
    
    // let renderNotification = () => {return null }
    // if (this.state.notification != null)
    // {
    //   renderNotification = () => {
    //     return  <Notification />
    //   }
    // }

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

    //<h2>blogs</h2>
    //{this.state.blogs.map(blog => 
    //  <Blog key={blog.id} blog={blog}  parentRender={this.updateBlogs} />
    //)}

    return (
      <div>
        {this.state.updateToggle}
        <Notification />
        kirjautuneena: {this.state.name} 
        <button name='logoutbtn' onClick={this.handleLogout}>logout</button>
      
        <h2>blogs Redux</h2>
        {this.props.blogs.map(blog => 
          <Blog store = {this.props.store} key={blog.id} blog={blog}  parentRender = {() => {}} />
        )}  

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

App.propTypes = {
  store: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  notify: notificationActionFor.notify,
  initblogs: blogsActionFor.initializeBlogs
}

const mapStateToProps = (state) => {
  return {
    notificationData: state.notification,
    blogs: state.blogs
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App)


