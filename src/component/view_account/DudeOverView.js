import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinkUi, forumpostStyleId } from '../common/LinkUi'
import { getForumpostsByDude } from '../../reducers/forumposts'
import { PagingRow } from '../common/PagingRow';

class DudeOverView extends Component {

    componentDidUpdate = async (prevProps) => {
        if (this.props.page !== prevProps.page ||
            this.props.dude_id !== prevProps.dude_id ||
            this.props.limitPerPage !== prevProps.limitPerPage) {

            await this.componentWillMount();
        }
    }
    componentWillMount = async () => {
        const { dude_id, limitPerPage = 20, page = 0 } = this.props
        if (dude_id !== undefined) {
            await this.props.getForumpostsByDude(dude_id, limitPerPage, page * limitPerPage)
        }
    }
    
    render() {
        return (
            <div>
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
                <PagingRow
                    pageType="dude"
                    parentId={this.props.dude_id}
                />
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