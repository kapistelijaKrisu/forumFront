import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getForumpostsByCategory } from '../../reducers/forumposts'
import { LinkUi, forumpostStyleId } from '../common/LinkUi'
import { PagingRow } from '../common/PagingRow'

class Category extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.page !== prevProps.page ||
            this.props.category_id !== prevProps.category_id ||
            this.props.limitPerPage !== prevProps.limitPerPage) {

            await this.componentWillMount();
        }
    }

    componentWillMount = async () => {
        const { category_id, limitPerPage = 20, page = 0 } = this.props
        if (category_id !== undefined) {
            await this.props.getForumpostsByCategory(category_id, limitPerPage, page * limitPerPage)
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
                <div><p style={logoStyle}>YIPPIE</p></div>
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
                <PagingRow
                    pageType="category"
                    parentId={this.props.category_id}
                />
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
const logoStyle = {
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '5.0em',
    color: '#add123'
}