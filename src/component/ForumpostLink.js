import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ForumpostLink extends Component {


    render() {
        if (this.props.forumpost === undefined) {
            return <div />
        }
        const forumpost = {
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 1,
            marginBottom: 5,
            background: 'pink'
        }
        console.log(this.props.forumpost)
        return (
            <div style={forumpost}>

                <Link to={`/category/${this.props.forumpost.categoryid}/forumpost/${this.props.forumpost.forumpostid}`}>{this.props.forumpost.title}</Link>
            </div>
        )
    }
}
export default ForumpostLink