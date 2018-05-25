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

    render() {
        if (this.props.forumposts === undefined) {
            return <div />
        }

        return (
            <div>
                <ul>
                    {this.props.forumposts.map(post =>
                        <ForumpostLink key={post.forumpostid} forumpost={post} />
                    )}
                </ul>
                {this.props.dude === null ? <p>login to post</p>
                    : <ForumpostForm categoryid={this.props.categoryid} />}
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