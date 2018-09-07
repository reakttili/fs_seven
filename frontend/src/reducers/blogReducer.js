import blogService from './../services/blogs'

const reducer = (store = [], action) => {
  console.log('blogstore', store)
  if (action.type==='LIKE_BLOG') {
    const old = store.filter(a => a.id !==action.blog.id)
    console.log("old", old)
    console.log('the blog', action.blog)
    return [...old, action.blog ]
  }
  if (action.type === 'DELETE_BLOG') {
    console.log(action.id)
    const rest = store.filter(a => a.id !==action.content)
    console.log('at delete', rest)
    return rest
  }
  if (action.type === 'CREATE_BLOG') {
    console.log("new blog,", action.content)
    return [...store, action.content]
  }
  if (action.type === 'INITIALIZE_BLOG') {
    store = action.data
    console.log('INITIALIZE blogs', action.data)
    return store
  }
  return store
}

const actionFor = {
  deletion(id) {
    return async (dispatch) => {
      // TODO: try-catch
      const updated = await blogService.deleteBlog(id) 
      //const newblog = await blogService.create(title, author, url)
      return dispatch({
        type: 'DELETE_BLOG',
        content:id
      })
    }
  },
  blogCreation(title, author, url) {
    return async (dispatch) => {
      const newblog = await blogService.create(title, author, url)
      return dispatch({
        type: 'CREATE_BLOG',
        content:newblog
      })
    }
  },
  liking(data) {
    return async (dispatch) => {
        let updated = await blogService.updateLikes(
            data.title, 
            data.author, 
            data.url, 
            data.adderid,
            data.likes,
            data.blogid)
        updated = updated.data
        
        dispatch({
        type: 'LIKE_BLOG',
        blog:updated }
      )}
  },
  initializeBlogs() {
    return async (dispatch) => {
      const blogs = await blogService.getAll()
      
      dispatch({
        type: 'INITIALIZE_BLOG',
        data: blogs
      })
    }
  }
}

export { reducer }
export { actionFor }