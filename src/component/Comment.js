import React from 'react'


const Comment = (props) => {
  console.log(props)
  return(
  <div>
    <span style={props.style}
    >Posted by:{props.comment.creatorname} add here time
    </span>
    <p style={props.style}>{props.comment.content}</p>
  </div>
)}

export default Comment
