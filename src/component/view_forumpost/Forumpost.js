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
        if (this.props.dude.isMod === true) {
            this.props.editForumPost(this.props.detailedForumpost, this.isLocked() ? false : true)
        }
    }

    isLocked = () => {
        return this.props.detailedForumpost.disabled;
    }

    render() {
        console.log(this.props.detailedForumpost)
        const {detailedForumpost} = this.props
        const redirectLink = `/category/${detailedForumpost.category_id}`
        this.isLocked() ? bg = 'linear-gradient(70deg, #000, #123456)'
        : bg = 'linear-gradient(70deg, #000, #8b1a1a)'
        return (
            <div style={{
                margin: 'auto',
                background: 'linear-gradient(70deg, #111, #444)'
            }}>
                {this.state.redirect ?
                    <Redirect to={redirectLink} />
                    :
                    <p style={{display: 'flex', width: '95%', justifyContent: 'space-between'}}>
                        <span style={categoryStyle}
                            onClick={() => { this.linkToCategory() }}>
                            {detailedForumpost.categoryname}
                        </span>
                    <button
                            style={categoryStyle2}
                            onClick={() => { this.lockPost() }}
                        >  LOCK POST</button>
                    </p>}
                <div style={ledivstylie}>
                    <br />
                    {detailedForumpost.comments.map(comment =>
                        <Comment key={comment.comment_id}
                            comment={comment}
                            style={viewpostStyle} />
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

let bg = '';

const categoryStyle2 = {
    paddingTop: 12,
    marginTop: 10,
    fontFamily: 'Amaranth',
    fontSize: '1.3em',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
    color: '#DCDCDC',
    border: 'none',
    borderRadius: '5px',
    background: bg
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