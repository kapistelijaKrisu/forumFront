import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getForumpostsByCategory } from '../../reducers/forumposts'
import {LinkUi, forumpostStyleId} from '../common/LinkUi'

class Category extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount = async () => {
        if (this.props.category_id !== undefined) {
            await this.props.getForumpostsByCategory(this.props.category_id)
        }
    }

    redirectLink = (category_id) => {
        window.location = `/category/${category_id}/post`
    }

    render() {
        if (this.props.forumposts === undefined) {
            return <div />
        }
        return (
            <div>
                <ul>
                    {this.props.forumposts.map(post =>
                        <LinkUi key={post.forumpost_id} 
                        data={post}
                        path={`/category/${post.category_id}/forumpost/${post.forumpost_id}`}
                        styleId={forumpostStyleId}
                        title={post.title}
                        />
                    )}
                </ul>
                {this.props.dude === null ? <p>login to post</p>
                    : <div style={{ textAlign: 'center' }}>
                        <button
                            style={forumpostButtonStyle}
                            onClick={() => { this.redirectLink(this.props.category_id) }}
                        >Create a Post
                    </button>
                    </div>}

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