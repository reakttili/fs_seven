import blogService from './../services/blogs'

const reducer = (store = [], action) => {
  if (action.type==='LIKE') {
    const old = store.filter(a => a.id !==action.blog.id)
    console.log("old", old)
    console.log('the blog', action.blog)
    return [...old, action.blog ]
  }
  if (action.type === 'DELETE') {
    console.log(action.id)
    const rest = store.filter(a => a.id !==action.content)
    console.log('at delete', rest)
    return rest
  }
  if (action.type === 'CREATE') {
    console.log("new blog,", action.content)
    return [...store, action.content]
  }
  if (action.type === 'INITIALIZE') {
    store = action.data
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
        type: 'DELETE',
        content:id
      })
    }
  },
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
        let updated = await blogService.updateLikes(
            data.title, 
            data.author, 
            data.url, 
            data.adderid,
            data.likes,
            data.blogid)
        updated = updated.data
        
        dispatch({
        type: 'LIKE',
        blog:updated }
      )}
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