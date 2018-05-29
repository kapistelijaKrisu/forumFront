import React from 'react'


const Comment = (props) => (
  <div>
    <span style={props.style}
    >Posted:{props.comment.creatorid} add here time
    </span>
    <p style={props.style}>{props.comment.content}</p>
  </div>
)

export default Comment
