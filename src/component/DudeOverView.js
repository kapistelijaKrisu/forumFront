import React, { Component } from 'react'
import { connect } from 'react-redux'
import ForumpostLink from './ForumpostLink'
import { getForumpostsByDude } from '../reducers/forumposts'

class DudeOverView extends Component {

    constructor() {
        super()
        this.state = {
        }
    }

    componentWillMount = async () => {
        await this.props.getForumpostsByDude(this.props.dudeid)
        console.log(this.props)
    }
    render() {
        return (
            <div>
                <ul>
                    {this.props.forumposts.map(post =>
                        <ForumpostLink key={post.forumpostid} forumpost={post} />
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