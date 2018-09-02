import blogService from './../services/blogs'

const reducer = (store = [], action) => {
  if (action.type==='LIKE') {
    const old = store.filter(a => a.id !==action.blog.id)
    return [...old, action.blog ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.content]
  }
  if (action.type === 'INITIALIZE') {
    store = action.data
    return store
  }
  return store
}

const actionFor = {
  blogCreation(title, author, url) {
    return async (dispatch) => {
      const newblog = await blogService.create(title, author, url)
      return dispatch({
        type: 'CREATE',
        content:newblog
      })
    }
  },
  liking(data) {
    return async (dispatch) => {
        const updated = await blogService.updateLikes(
            data.title, 
            data.author, 
            data.url, 
            data.adderid,
            data.likes,
            data.blogid)
        dispatch({
        type: 'LIKE',
        blog:updated }
      )}

    // const updated = await blogService.updateLikes(
    //     this.state.title, 
    //     this.state.author, 
    //     this.state.url, 
    //     this.state.adder._id,
    //     this.state.likes,
    //     this.state.blogid) 
    //   console.log('paivitetty', updated)
    //   console.log(this.state.blogid)
    //   console.log(this.state.adder._id)
    //   console.log("@handleLikeClick")
    //   //console.log(updated.data)
    //   this.setState({likes:updated.data.likes},this.parentRender)
    //   const allblogs = await blogService.getAll()
    //   console.log('allafterlikeclick',allblogs)
    //   this.parentRender()


  },
  initializeBlogs() {
    return async (dispatch) => {
      const blogs = await blogService.getAll()
      console.log('blogs', blogs)
      dispatch({
        type: 'INITIALIZE',
        data: blogs
      })
    }
  }
}

export { reducer }
export { actionFor }