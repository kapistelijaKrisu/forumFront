import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addForumpost } from '../reducers/forumposts'

class ForumpostForm extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            content: ''
        }
    }

    handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    postForumpost = async (event) => {
        event.preventDefault()
        try {
            await this.props.addForumpost({
                title: this.state.title,
                content: this.state.content,
                categoryid: this.props.categoryid
            })

        } catch (exception) {
            console.log(exception)
        }
        this.setState({ name: '', description: '' })
    }

    render() {
        return (


            <form onSubmit={this.postForumpost}>
                <span> title</span>
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleLoginFieldChange}
                />
                <br />
                <span> content</span>
                <input
                    type="text"
                    name="content"
                    value={this.state.content}
                    onChange={this.handleLoginFieldChange}
                />
                <button type="submit">Post!</button>
            </form>
        )
    }
}

export default connect(
    null,
    { addForumpost }

)(ForumpostForm)