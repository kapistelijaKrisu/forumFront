import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ForumpostLink extends Component {


    render() {
        if (this.props.forumpost === undefined) {
            return <div />
        }
        const forumpost = {
            fontSize:20,
            paddingTop: 10,
            paddingLeft: 2,
            border: 'solid',
            borderWidth: 5,
            borderColor: '#C0C0C0',
            marginBottom: 5,
            background: 'linear-gradient(70deg, #f0f1AB, #999)'
        }
        return (
            <div style={forumpost}>

                <Link to={`/category/${this.props.forumpost.categoryid}/forumpost/${this.props.forumpost.forumpostid}`}>{this.props.forumpost.title}</Link>
            </div>
        )
    }
}
export default ForumpostLink