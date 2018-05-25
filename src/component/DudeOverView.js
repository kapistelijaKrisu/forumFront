import React, { Component } from 'react'
import { connect } from 'react-redux'
import ForumpostLink from './ForumpostLink'
import { getForumposts } from '../reducers/forumposts'

class DudeOverView extends Component {

    constructor() {
        super()
        this.state = {
        }
    }

    componentWillMount = async () => {
        await this.props.getForumposts(this.props.dudeid)
        console.log(this.props)
    }
    render() {
        console.log(this.props.dude)
        console.log(this.props.forumposts)
        return (
            <div>
                <p>???</p>
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
    { getForumposts }

)(DudeOverView)