import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getDetailedForumPost } from '../reducers/detailedForumpost'
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
            autosize(this.textarea);
        }
    }

    linkToCategory = (categoryid) => {
        window.location = `/category/${categoryid}`
    }

    render() {
        return (
            <div style={{
                margin: 'auto',
                background: 'linear-gradient(70deg, #111, #444)'
            }}>
                <p
                    style={categoryStyle}
                    onClick={() => { this.linkToCategory(this.props.detailedForumpost.categoryid) }}
                >Back to {this.props.detailedForumpost.categoryname}
                </p>
                <div style={ledivstylie}>
                    <br />
                    {this.props.detailedForumpost.comments.map(comment =>
                        <Comment key={comment.commentid}
                            comment={comment}
                            style={viewpostStyle} />
                    )}
                </div>
                {this.props.dude === null ? <p> login to comment </p>
                    : <CommentForm />}


            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        detailedForumpost: state.detailedForumpost,
        dude: state.dude
    }
}
export default connect(
    mapStateToProps,
    { getDetailedForumPost }

)(Forumpost)

const ledivstylie = {
    border: 'solid',
    borderWidth: 5,
    borderColor: '#888',
    paddingBottom:'1.6em'
}

const categoryStyle = {
    marginTop: '2px',
    paddingTop: 15,
    marginLeft: '5%',
    width: '90%',
    fontFamily: 'Amaranth',
    fontStyle: 'italic',
    fontSize: '1.3em',
    cursor: 'pointer',
    color: '#ccc',
    textDecoration: 'underline'
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