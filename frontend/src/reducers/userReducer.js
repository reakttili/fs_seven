import userService from './../services/users'

const reducer = (store = [], action) => {
  if (action.type==='LIKE') {
    const old = store.filter(a => a.id !==action.blog.id)
    console.log("old", old)
    console.log('the blog', action.blog)
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
//   creation(title, author, url) {
//     return async (dispatch) => {
//       const newblog = await blogService.create(title, author, url)
//       return dispatch({
//         type: 'CREATE',
//         content:newblog
//       })
//     }
//   },
//   liking(data) {
//     return async (dispatch) => {
//         let updated = await blogService.updateLikes(
//             data.title, 
//             data.author, 
//             data.url, 
//             data.adderid,
//             data.likes,
//             data.blogid)
//         updated = updated.data
        
//         dispatch({
//         type: 'LIKE',
//         blog:updated }
//       )}
//   },
  initializing() {
    return async (dispatch) => {
      const users = await userService.getAll()
      console.log("userRecucer init:", users)
      dispatch({
        type: 'INITIALIZE',
        data: users
      })
    }
  }
}

export { reducer }
export { actionFor }