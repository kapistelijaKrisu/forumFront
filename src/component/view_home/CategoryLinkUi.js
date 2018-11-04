import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import history from '../../services/history';

class CategoryLinkUi extends Component {
    constructor() {
        super()
        this.state = {
            redirectCategory: false,
            redirectRecentPost: false,
            redirectPoster: false,
        }
    }
    redirectToCategory = () => {
        history.push(this.props.location)
        this.setState({ redirectCategory: true })
    }
    redirectToRecentPost = () => {
        if (this.props.data.lastpost_title !== null) {
            history.push(this.props.location)
            this.setState({ redirectRecentPost: true })
        }
    }
    redirectToRecentPoster = () => {
        if (this.props.data.lastpost_title !== null) {
            history.push(this.props.location)
            this.setState({ redirectPoster: true })
        }
    }

    render() {
        if (this.props.data === undefined) {
            return <div />
        }
        const {
            category_id,
            name,
            description,
            forumpost_count,
            lastpost_title,
            last_post_time,
            lastposter_username,
            lastposter_dude_id,
            last_post_forumpost_id
        } = this.props.data;

        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        };
        if (this.state.redirectCategory) {
            return <Redirect to={'/category/' + category_id} />
        } else if (this.state.redirectRecentPost) {
            return <Redirect to={'/category/' + category_id + '/forumpost/' + last_post_forumpost_id} />
        } else if (this.state.redirectPoster) {
            return <Redirect to={'/dude/' + lastposter_dude_id} />
        } else {
            return (
                <div style={categoryStyle}>
                    <div style={leftHalf} onClick={() => { this.redirectToCategory() }}>
                        <h2 style={{ fontSize: '1.2em' }}>{name}</h2>
                        <p style={{ fontSize: '0.9em' }}> {description}</p>
                    </div>
                    <div style={rightHalf}>
                        <p style={{ fontSize: '0.9em' }}>Posts: {forumpost_count}</p>
                        <p style={{ fontSize: '0.9em' }} onClick={() => { this.redirectToRecentPoster() }}>
                            Recent by: {lastposter_username} {last_post_time === null ? '-' : new Intl.DateTimeFormat('en-US', options).format(new Date(last_post_time))}
                        </p>
                        <p style={{ fontSize: '0.9em' }} onClick={() => { this.redirectToRecentPost() }}>{lastpost_title}</p>
                    </div>
                </div>
            )
        }
    }
}

export default CategoryLinkUi;

const leftHalf = {
    float: 'left',
    width: '70%',
    cursor: 'pointer'
}

const rightHalf = {
    float: 'left',
    width: '30%',
}

const categoryStyle = {
    border: 'solid',
    borderWidth: 1,
    paddingLeft: 10,
    overflow: 'hidden',
    width: '100%',
    fontStyle: 'bold',
    background: 'linear-gradient(70deg, #FF8833, #333)',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',

};