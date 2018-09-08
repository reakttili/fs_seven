const initialNotification = ''

const reducer = (store = { notification: initialNotification, bShow: false, type: 0 }, action) => {
  switch (action.type) {
  case 'SET':
    //console.log("Set new notification:", action.notification)
    store = action.notification
    return store
  default:
    return store
  }
}

function sleep(s) {
  return new Promise(resolve => setTimeout(resolve, s*1000))
}

export const actionFor = {
  notify(message, delay,type) {
    return async (dispatch, getState) => {
      console.log(getState())
      dispatch({
        type: 'SET',
        notification: { notification:message, bShow:true, type:type }
      })
      await sleep(delay)
      dispatch({
        type: 'SET',
        notification: { notification:'', bShow:false, type:type }
      })
    }
  }
}
export { reducer }
