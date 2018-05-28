import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getForumpostsByCategory } from '../reducers/forumposts'
import ForumpostLink from './ForumpostLink'
import ForumpostForm from './ForumpostForm';

class Category extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount = async () => {
        if (this.props.categoryid !== undefined) {
            await this.props.getForumpostsByCategory(this.props.categoryid)
        }
    }

    redirectLink = (categoryid) => {
        window.location = `/category/${categoryid}/post`
    }

    render() {
        if (this.props.forumposts === undefined) {
            return <div />
        }

        return (
            <div style={{ margin: 'auto' }}>
                <ul>
                    {this.props.forumposts.map(post =>
                        <ForumpostLink key={post.forumpostid} forumpost={post} />
                    )}
                </ul>
                {this.props.dude === null ? <p>login to post</p>
                    : <div style={{ textAlign: 'center' }}><button
                        style={forumpostButtonStyle}
                        onClick={() => { this.redirectLink(this.props.categoryid) }}
                    >Create a Post</button></div>}

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dude: state.dude,
        forumposts: state.forumposts
    }
}
export default connect(
    mapStateToProps,
    { getForumpostsByCategory }

)(Category)

const forumpostButtonStyle = {
    cursor: 'pointer',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',
    fontSize: '0.9em',
    width: '15em',
    height: '3.5em',
    color: '#800178',
    border: 'none',
    borderRadius: '5px',
    background: 'linear-gradient(70deg, #e9eb50, #666)'
}