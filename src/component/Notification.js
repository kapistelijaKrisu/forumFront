import React from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

const Notification = props => {
  if (props.notification === null) {
    return null
  }
  const footerStyle = {
    padding: '10px',
    textAlign: 'center',
    fontSize: '1.1rem',
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: 'auto',
    width: '100%'
  }

  if (props.notification.textType === 'error') {
    const errorStyle = {
      color: '#F44336',
      backgroundColor: '#FFEBEE',
      borderTop: '2px solid #F44336'
    }
    return (
      <div style={{ ...errorStyle, ...footerStyle }}>
        <FontAwesome name="notfication" />
        {props.notification.text}
      </div>
    )
  }

  const successStyle = {
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
    borderTop: '2px solid #4CAF50'
  }
  return (
    <div style={{ ...successStyle, ...footerStyle }}>
      <FontAwesome name="check-circle" />
      {props.notification.text}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
