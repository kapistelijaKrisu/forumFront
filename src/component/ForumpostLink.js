import React from 'react'

const ForumpostLink = ({ forumpost }) => {
    if (forumpost === undefined) {
        return <div />
    }
    const redirectLink = (forumpost) => {
        window.location = `/category/${forumpost.categoryid}/forumpost/${forumpost.forumpostid}`
    }
    return (
        <div style={forumpostStyle} onClick={() => { redirectLink(forumpost) }}>

            <p>{forumpost.title}</p>
        </div>
    )
}
export default ForumpostLink

const forumpostStyle = {
    cursor:'pointer',
    height: '2em',
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 5,
    borderColor: '#C0C0C0',
    marginBottom: 5,
    background: 'linear-gradient(70deg, #e9eb50, #333)'
    //  background: 'linear-gradient(70deg, #c2f3cd, #999)'
}