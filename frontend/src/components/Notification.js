import React from 'react'
import PropTypes from 'prop-types'
import { actionFor as actionForNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const styleInfo = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      color: 'green'
    }
    const styleError = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      color: 'red'
    }
    const { notification, bShow, type } = this.props.notificationData
    if (bShow && type===0) {
      return (
        <div style={styleInfo}>
          {notification}
        </div>
      )
    } else if (bShow) {
      return (
        <div style={styleError}>
          {notification}
        </div>
      )
    }else {
      return ( <div></div>)
    }
  }
}

Notification.propTypes = {
  notificationData: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    notificationData: state.notification
  }
}

const mapDispatchToProps = {
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
