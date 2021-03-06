import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../reducers/detailedForumpost'
import { notify } from '../../reducers/notification'
import autosize from 'autosize'

class CommentForm extends React.Component {
    constructor() {
        super()
        this.state = {
            content: ''
        }
    }
    componentDidMount() {
        const {dude, forumpost} = this.props;
        if (dude === null) {
            this.setState({content: 'Log in to comment'}) 
        } else if (!!forumpost.disabled) {
            this.setState({content: 'This post is locked!'}) 
        } else {
            this.setState({content: ''}) 
        }
        autosize(this.textarea);
    }
    componentDidUpdate(prevProps) {
        if (this.props.dude !== prevProps.dude || this.props.forumpost.disabled !== prevProps.forumpost.disabled) {
          this.componentDidMount();
        }
      }

    handleFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    postComment = async (event) => {
        event.preventDefault()
        try {
            await this.props.addComment({
                content: this.state.content,
                forumpost_id: this.props.forumpost.forumpost_id,
                category_id: this.props.forumpost.category_id
            })
            await this.setState({ content: '' })
            this.props.notify('Comment posted successfully!', 'success')
        } catch (exception) { }

    }

    render() {
        const {dude, forumpost} = this.props
        const disabled = (dude === null || forumpost.disabled === true);
   
        if (!disabled) {
        return (
            <div>
                <form style={commentFormStyle} onSubmit={this.postComment}>
                    <textarea
                        style={commentTextStyle}
                        ref={c => (this.textarea = c)}
                        rows={3}
                        type="text"
                        name="content"
                        value={this.state.content}
                        onChange={this.handleFieldChange}
                    />
                    <br />
                    <button style={forumpostButtonStyle} type="submit">comment</button>
                </form>
            </div>
        )} else {
            return (
                <div style={commentFormStyle}>
                    <p style={commentTextStyle}>
                        {this.state.content}
                    </p>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        dude: state.dude,
        forumpost: state.detailedForumpost
    }
}

export default connect(
    mapStateToProps,
    { addComment, notify }

)(CommentForm)

const commentTextStyle = {
    resize: 'none',
    borderRadius: '5px',
    marginLeft: '5%',
    padding: '0.3em',
    marginTop: '1%',
    fontSize: '0.8em',
    width: '90%',
    fontFamily: 'Amaranth',
    color: '#ccc',
    background: 'linear-gradient(70deg, #222, #555)',
}

const commentFormStyle = {
    minHeight: '1.6em',
    width: '100%',
    fontSize: 28,
    fontStyle: 'bold',
    background: 'linear-gradient(70deg, #333, #777)',
    padding: '2px'
}
const forumpostButtonStyle = {
    marginLeft: '0.5em',
    cursor: 'pointer',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',
    fontSize: '0.6em',
    color: '#DCDCDC',
    border: 'none',
    borderRadius: '5px',
    background: 'linear-gradient(70deg, #333, #777)'
}