import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment, getDetailedForumPost } from '../reducers/detailedForumpost'
import Comment from './Comment'
import CommentForm from './CommentForm'
import autosize from 'autosize'

class Forumpost extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        autosize(this.textarea);
      }
    componentWillMount = async () => {
        if (this.props.forumpostid !== undefined) {
            await this.props.getDetailedForumPost(this.props.forumpostid)
      console.log(this.props.detailedForumpost)
      autosize(this.textarea);
        }
    }

    render() {
        if (this.props.detailedForumpost===undefined) {
            return <div/>
        }
        console.log(this.props)
        return (
            <div style={{margin:'auto',
            background: 'linear-gradient(70deg, #111, #444)'
             }}>
             <div style={ledivstylie}>
             <br/>
             <span style={viewpostStyle}
             >Posted:{this.props.detailedForumpost.creatorid}
             </span>
                <p
                    style={viewpostStyle}
                    type="text"
                    name="content"
                    value={this.props.detailedForumpost.content}
                >{this.props.detailedForumpost.content}</p>
                {this.props.detailedForumpost.comments.map(comment =>
                    <Comment key={comment.commentid} 
                    comment={comment}
                    style={viewpostStyle} />
                )}
                 </div>
                {this.props.dude === null ? <p> login to comment </p>
                    : <CommentForm forumpost={this.props.detailedForumpost} />}

           
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        forumposts: state.forumposts,
        detailedForumpost: state.detailedForumpost,
        dude: state.dude
    }
}
export default connect(
    mapStateToProps,
    { addComment, getDetailedForumPost }

)(Forumpost)

const ledivstylie={
    border: 'solid',
    borderWidth: 5,
    borderColor: '#888',
}

const viewpostStyle = {
    borderRadius: '4px',
    border: 'solid',
    borderWidth: 1,
    borderColor: '#888',
    whiteSpace: 'pre-line',
    resize: 'none',
    marginLeft:'5%',
    paddingLeft:'0.3em',
    marginTop:'1%',
    fontSize: '1.2em',
    width: '90%',
    fontFamily: 'Amaranth',
    color: '#ccc',
    background: 'linear-gradient(70deg, #222, #555)',
    
}