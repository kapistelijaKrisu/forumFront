import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/comments'

class CommentForm extends React.Component {
    constructor() {
        super()
        this.state = {
            content: ''
        }
    }

    handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    postComment = async (event) => {
        event.preventDefault()
        console.log('posting')
        try {
            await this.props.addComment({ content: this.state.content, forumpostid: this.props.forumpostid })

        } catch (exception) {
            console.log(exception)
        }
        this.setState({ content: '' })
    }

    render() {
        return (

            <form onSubmit={this.postComment}>
                <input
                    type="text"
                    name="content"
                    value={this.state.content}
                    onChange={this.handleLoginFieldChange}
                />
                <br />
               
                <button type="submit">Add comment</button>
            </form>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dude: state.dude
    }
}

export default connect(
  mapStateToProps,
  { addComment }

)(CommentForm)