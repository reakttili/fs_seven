import userService from './../services/users'

const reducer = (store = [], action) => {
  if (action.type==='LIKE_USER') {
    const old = store.filter(a => a.id !==action.blog.id)
    //console.log("old", old)
    //console.log('the blog', action.blog)
    return [...old, action.blog ]
  }
  if (action.type === 'CREATE_USER') {
    return [...store, action.content]
  }
  if (action.type === 'INITIALIZE_USER') {
    console.log('INITIALIZE users', action.data )
    //console.log("here are users to be set:", action.data)
    store = [...action.data]
    console.log(store)

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
      let users = await userService.getAll()
      //console.log("hera are dispateched users:", users)
      //users = [...users,"ihme"]
            
      dispatch({
        type: 'INITIALIZE_USER',
        data: users
      })
    }
  }
}

export { reducer }
export { actionFor }