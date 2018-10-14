import React, { Component } from 'react'
import { connect } from 'react-redux'
import {LinkUi, forumpostStyleId} from '../common/LinkUi'
import { getForumpostsByDude } from '../../reducers/forumposts'

class DudeOverView extends Component {

    constructor() {
        super()
        this.state = {
        }
    }

    componentWillMount = async () => {
        await this.props.getForumpostsByDude(this.props.dude_id)
    }
    render() {
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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        dude: state.dude,
        forumposts: state.forumposts,
        comments: state.comments
    }
}
export default connect(
    mapStateToProps,
    { getForumpostsByDude }

)(DudeOverView)