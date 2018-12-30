import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import { getDetailedForumPost, editForumPost } from '../../reducers/detailedForumpost'
import Comment from './Comment'
import CommentForm from './CommentForm'
import autosize from 'autosize'

class Forumpost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }
    componentDidMount() {
        autosize(this.textarea);
    }
    componentWillMount = async () => {
        if (this.props.forumpost_id !== undefined) {
            await this.props.getDetailedForumPost(this.props.forumpost_id)
            autosize(this.textarea);
        }
    }

    linkToCategory = () => {
        this.setState({ redirect: true })
        //   window.location = `/category/${category_id}`
    }

    lockPost = () => {
        const { dude } = this.props;
        if (dude !== undefined && dude !== null && dude.isMod === true) {
            this.props.editForumPost(this.props.detailedForumpost, this.isLocked() ? false : true)
        }
    }

    isLocked = () => {
        return this.props.detailedForumpost.disabled;
    }

    render() {
        const { detailedForumpost, dude } = this.props
        const redirectLink = `/category/${detailedForumpost.category_id}`
        let editButton = <div></div>
        if (dude !== undefined && dude !== null && !!dude.isMod) {
            let bg;
            let text;
            if (this.isLocked()) {
                bg = 'linear-gradient(70deg, #333, #008F41)';
                text = 'UNLOCK POST'
            } else {
                bg = 'linear-gradient(70deg, #000, #8B0000)'
                text = 'LOCK POST'
            }
            editButton = <button
                style={{ ...lockButtonStyle, ...{ background: bg } }}
                onClick={() => { this.lockPost() }}
            >  {text}</button>
        }
        return (
            <div style={{
                margin: 'auto',
                background: 'linear-gradient(70deg, #111, #444)'
            }}>
                {this.state.redirect ?
                    <Redirect to={redirectLink} />
                    :
                    <div style={{ display: 'flex', width: '95%', justifyContent: 'space-between' }}>
                        <span style={categoryStyle}
                            onClick={() => { this.linkToCategory() }}>
                            {detailedForumpost.categoryname}
                        </span>
                        {editButton}
                    </div>}
                <div style={ledivstylie}>
                    <br />
                    {this.props.detailedForumpost.comments.map(comment =>
                        <Comment key={comment.comment_id}
                            comment_id={comment.comment_id} />
                    )}
                </div>
                <CommentForm />


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
    { getDetailedForumPost, editForumPost: editForumPost }

)(Forumpost)

const ledivstylie = {
    border: 'solid',
    borderWidth: 5,
    borderColor: '#888',
    paddingBottom: '1.6em'
}

const categoryStyle = {
    marginTop: '2px',
    paddingTop: 15,
    marginLeft: '5%',
    fontFamily: 'Amaranth',
    fontStyle: 'italic',
    fontSize: '1.3em',
    cursor: 'pointer',
    color: '#ccc',
    textDecoration: 'underline'
}

const lockButtonStyle = {
    paddingTop: 12,
    marginTop: 10,
    fontFamily: 'Amaranth',
    fontSize: '1.3em',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
    color: '#AAA',
    border: 'none',
    borderRadius: '5px'
}
