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
    this.setState({ editingStatus: false })
    autosize(this.textarea);
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  showEditButtonToCreator = () => {
    const { dude, comment, detailedForumpost } = this.props;
    const { editingStatus } = this.state;
    if (comment.deleted || detailedForumpost.disabled) {
      return <div></div>
    }
    const changeEditStatus = () => {
      this.setState({ editingStatus: editingStatus ? false : true, content: comment.content })
    }
    return dude && comment && dude.dude_id === comment.creator_id ?
      <div>
        <button style={{ float: 'right', background: editingStatus ? 'red' : 'yellow', margin: '4px' }}
          onClick={changeEditStatus}
        >{editingStatus ? 'Cancel' : 'Edit'}</button>
        {editingStatus ? <button style={{ float: 'right', background: 'green', margin: '4px' }}
          onClick={this.submitEdit}
        >Submit</button> : <span></span>}
      </div > :
      <span></span>
  }

  deleteComment = async () => {
    try {
      await this.props.editComment({ deleted: true, comment_id: this.props.comment.comment_id })
      this.props.notify('Deleted successfully!', 'success', 11)
    } catch (e) { }
  }

  submitEdit = async () => {
    try {
      const { content } = this.state;
      const { comment } = this.props;
      if (content.trim() === '') {
        this.props.notify('Cannot be empty message!')
      } else if (content === comment.content) {
        this.props.notify('Message is identical to original')
      } else {
        await this.props.editComment({ content: content, comment_id: comment.comment_id })
        this.props.notify('Updated!', 'success')
        this.componentDidMount();
      }
    } catch (e) { }
  }

  render() {
    const { dude } = this.props;
    const isMod = dude !== undefined && dude !== null && dude.isMod;
    const { comment } = this.props;
    if (comment === null || comment === undefined) {
      return <div></div>
    }
    let deleteButton = <span></span>
    if (isMod === true && comment.deleted === false) {
      deleteButton = <button style={banStyle} onClick={this.deleteComment}>Delete</button>
    }
    //if not mod and deleted
    if (comment.deleted === true) {
      if (!isMod) {
        comment.content = 'DELETED BY MOD'
        return <div style={viewpostStyle}>
          <UpperBox
            comment={comment}
            deleteButton={deleteButton}
            editButton={<span></span>} />
          <br />
          <p style={{ marginTop: '1px', paddingTop: 0 }}>DELETED BY MOD</p></div>
      }
    }
    // else
    const editButton = this.showEditButtonToCreator()
    return (
      <div style={viewpostStyle} >
        <UpperBox
          comment={comment}
          deleteButton={deleteButton}
          editButton={editButton} />
        <br />
        <LowerBox
          editingStatus={this.state.editingStatus}
          comment={comment}
          content={this.state.content}
          handleFieldChange={this.handleFieldChange}
        />
      </div>
    )
  }
}

const UpperBox = ({ comment, deleteButton, editButton }) => {
  let status = '';
  if (comment.deleted === true) {
    status = 'DELETED'
  } else if (comment.edited !== null && comment.edited !== undefined) {
    status = '(edited) ' + formatDate(comment.edited)
  } else {
    status = 'posted: ' + formatDate(comment.posttime)
  }
  return <div style={upperBoxStyle}>
    <span style={{ float: 'left' }}
    >Posted by: {comment.creatorname}
    </span>
    {editButton}
    {deleteButton}
    <span style={{ float: 'right' }}>{status}</span>
  </div>
}

const LowerBox = ({ editingStatus, content, handleFieldChange, comment }) => (
  editingStatus ?
    <textarea
      style={commentTextStyle}
      ref={c => (this.textarea = c)}
      rows={3}
      type="text"
      name="content"
      value={content}
      onChange={handleFieldChange}
    /> :
    <p style={{ marginTop: '1px', paddingTop: 0 }}>{comment.content}</p>
)
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
    detailedForumpost: state.detailedForumpost,
    dude: state.dude
  }
}

export default connect(
  mapStateToProps,
  { editComment, notify }

)(Comment)

const upperBoxStyle = {
  overflow: 'hidden',
  borderRadius: '4px',
  border: 'solid',
  borderWidth: 1,
  borderColor: '#888'
}

const banStyle = { float: 'right', background: 'red', margin: '4px' }

const commentTextStyle = {
  resize: 'none',
  borderRadius: '5px',
  marginLeft: '5%',
  padding: '0.3em',
  marginTop: '1%',
  fontSize: '0.8em',
  width: '90%',
  fontFamily: 'Amaranth',
  color: '#111'
}

const viewpostStyle = {
  borderRadius: '4px',
  border: 'solid',
  borderWidth: 1,
  borderColor: '#888',
  whiteSpace: 'pre-line',
  resize: 'none',
  marginLeft: '5%',
  marginTop: '1%',
  fontSize: '1.2em',
  width: '90%',
  fontFamily: 'Amaranth',
  color: '#ccc',
  background: 'linear-gradient(70deg, #222, #555)'

}

