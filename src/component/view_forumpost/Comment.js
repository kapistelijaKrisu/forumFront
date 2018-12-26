import React from 'react'
import { connect } from 'react-redux'
import { editComment } from '../../reducers/detailedForumpost'
import { notify } from '../../reducers/notification'
import autosize from 'autosize'

class Comment extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      editingStatus: false
    }
  }

  componentDidMount() {
    const { comment } = this.props;
    if (comment !== null) {
      this.setState({ deleted: comment.deleted })
      autosize(this.textarea);
    }

  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  showEditButtonToCreator = () => {
    const { dude, comment } = this.props;
    const changeEditStatus = () => {
      this.setState({ editingStatus: this.state.editingStatus ? false : true, content: comment.content })
    }
    return dude && comment && dude.dude_id === comment.creator_id ?
      <div>
        <button style={{ float: 'right', background: this.state.editingStatus ? 'red' : 'yellow', margin: '4px' }}
          onClick={changeEditStatus}
        >{this.state.editingStatus ? 'Cancel' : 'Edit'}</button>
        {this.state.editingStatus ? <button style={{ float: 'right', background: 'green', margin: '4px' }}
          onClick={this.submitEdit}
        >Submit</button> : <span></span>}
      </div > :
      <span></span>
  }

  showDeleteButtonToMod = () => {
    const { dude, comment } = this.props;
    
    return dude && comment && dude.isMod ?
        <button style={{ float: 'right', background: 'red', margin: '4px' }}
          onClick={this.deleteComment}
        >Delete</button>
 :
      <span></span>
  }

  deleteComment = async () => {
    await this.props.editComment({deleted: true, comment_id: this.props.comment.creator_id})
  }

  submitEdit = async () => {
    this.setState({ editingStatus: false, content: '' })
    await this.props.editComment({content: this.state.content, comment_id: this.props.comment.creator_id})
  }

  render() {
    console.log(this.state.editingStatus)
    const {comment, style} = this.props
    const commentColor = comment.deleted === true ? 
    'linear-gradient(70deg, #222, #fff)' : 
    'linear-gradient(70deg, #222, #555)'
    console.log(comment)
    return (
      <div style={{background: commentColor}} >
        <div style={{
          overflow: 'hidden',
          borderRadius: '4px',
          border: 'solid',
          borderWidth: 1,
          borderColor: '#888'
        }}>
          <span style={{ float: 'left' }}
          >Posted by: {comment.creatorname}
          </span>
          {this.showEditButtonToCreator()}
          {this.showDeleteButtonToMod()}
          <span style={{ float: 'right' }}>{comment.edited ? '(edited)' + formatDate(comment.edited) : formatDate(comment.posttime)}</span>
        </div>
        <br />
        {this.state.editingStatus ?
          <textarea
            style={commentTextStyle}
            ref={c => (this.textarea = c)}
            rows={3}
            type="text"
            name="content"
            value={this.state.content}
            onChange={this.handleFieldChange}
          /> :
          <p style={{ marginTop: '1px', paddingTop: 0 }}>{comment.content}</p>}
      </div>
    )
  }
}

const commentTextStyle = {
  resize: 'none',
  borderRadius: '5px',
  marginLeft: '5%',
  padding: '0.3em',
  marginTop: '1%',
  fontSize: '0.8em',
  width: '90%',
  fontFamily: 'Amaranth',
  color: '#ccc'
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

const mapStateToProps = (state) => {
  return {
    dude: state.dude
  }
}

export default connect(
  mapStateToProps,
  { editComment }

)(Comment)
