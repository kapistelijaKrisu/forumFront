import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, getComments } from '../reducers/comments'
import Comment from './Comment'
import CommentForm from './CommentForm'

class Forumpost extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount = async () => {
        if (this.props.forumpostid !== undefined) {
            await this.props.getComments(this.props.forumpostid)
        }
    }

    render() {
        return (
            <div>
                <p>{this.props.content}</p>
                {this.props.comments.map(comment =>
                    <Comment key={comment.commentid} comment={comment} />
                )}
                {this.props.dude === null ? <p> login to comment </p>
                    : <CommentForm forumpostid={this.props.forumpostid} />}

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        forumposts: state.forumposts,
        comments: state.comments,
        dude: state.dude
    }
}
export default connect(
    mapStateToProps,
    { addComment, getComments }

)(Forumpost)