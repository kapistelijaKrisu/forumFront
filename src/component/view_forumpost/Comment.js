import React from 'react'


const Comment = (props) => {
  return (
    <div style={props.style}>
      <div style={{
        overflow:'hidden',
        borderRadius: '4px',
        border: 'solid',
        borderWidth: 1,
        borderColor: '#888'
      }}>
        <span style={{ float: 'left' }}
        >Posted by: {props.comment.creatorname}
        </span>
        <span style={{ float: 'right' }}>{formatDate(props.comment.posttime)}</span>
      </div>
      <br />
      <p style={{marginTop:'1px', paddingTop:0}}>{props.comment.content}</p>
    </div>
  )
}

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const formatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  return date.toLocaleDateString('en-GB', formatOptions);
}


export default Comment
