import React, { Component } from 'react'
import { Redirect } from "react-router-dom"

class ForumpostLink extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false
        }
    }

    redirectLink = () => {
        this.setState({ redirect: true })
    }

    render() {
        if (this.props.forumpost === undefined) {
            return <div />
        }

        const path = `/category/${this.props.forumpost.category_id}/forumpost/${this.props.forumpost.forumpost_id}`

        const linkOrRedirect = this.state.redirect ?
            <Redirect to={path} /> :
            <div style={forumpostStyle} onClick={() => { this.redirectLink() }}>
                <p>{this.props.forumpost.title}</p>
            </div>

        return (
            <div>{linkOrRedirect}</div>
        )
    }
}
export default ForumpostLink

const forumpostStyle = {
    cursor: 'pointer',
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