import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addForumpost } from '../reducers/forumposts'
import { notify } from '../reducers/notification'
import autosize from 'autosize'
import { Redirect } from "react-router-dom"

class ForumpostForm extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            content: '',
            redirect: false
        }
    }

    componentDidMount() {
        autosize(this.textarea);
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
            this.setState({ name: '', description: '' })

            this.setState({ redirect: true })
            this.props.notify('Posted successfully!', 'success', 11)
        } catch (exception) {
            this.props.notify('Error: Length of content should be between 1-1023 characters and title 2-31 characters')
        }

    }



    render() {
        const path = `/category/${this.props.categoryid}`
        return (
            <div>{
                this.state.redirect ?
                    <Redirect to={path} />
                    :
                    <form
                        onSubmit={this.postForumpost}
                        style={forumpostFormStyle}
                    >
                        <p style={{ paddingTop: '1em' }}>Title</p>

                        <input
                            style={forumpostTextStyle}
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleLoginFieldChange}
                        />
                        <p style={{ paddingTop: '1em' }}>Content</p>
                        <textarea
                            style={forumpostTextAreaStyle}
                            ref={c => (this.textarea = c)}
                            rows={15}
                            type="text"
                            name="content"
                            value={this.state.content}
                            onChange={this.handleLoginFieldChange}
                        />
                        <br />
                        <button
                            type="submit"
                            style={forumpostButtonStyle}>Post!</button>
                    </form>}</div>
        )
    }
}

export default connect(
    null,
    { addForumpost, notify }

)(ForumpostForm)

const forumpostTextAreaStyle = {
    fontSize: '0.8em',
    width: '70%',
    fontFamily: 'Amaranth',
    color: '#111111',
    background: 'DDD',
    borderRadius: '5px'
}


const forumpostTextStyle = {
    padding: '3px',
    minHeight: '0.7em',
    width: '70%',
    fontStyle: 'bold',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',
    fontSize: '1.2em',
    color: '#333',
    background: 'DDD',
    borderRadius: '5px',
}

const forumpostFormStyle = {
    margin: 'auto',
    textAlign: 'center',
    minHeight: '1.6em',
    width: '80%',
    fontStyle: 'bold',
    background: 'linear-gradient(70deg, #87421F, #333)',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',
    fontSize: '1.5em',
    color: '#DCDCDC'
}

const forumpostButtonStyle = {
    cursor: 'pointer',
    margin: '0.8em',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',
    fontSize: '0.9em',
    width: '8em',
    height: '1.5em',
    color: '#DCDCDC',
    border: 'none',
    borderRadius: '5px',
    background: 'linear-gradient(70deg, #775900, #000)'
}