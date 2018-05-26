import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addForumpost } from '../reducers/forumposts'

class ForumpostForm extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            content: ''
        }
    }

    handleLoginFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    postForumpost = async (event) => {
        event.preventDefault()
        try {
            await this.props.addForumpost({
                title: this.state.title,
                content: this.state.content,
                categoryid: this.props.categoryid
            })

        } catch (exception) {
            console.log(exception)
        }
        this.setState({ name: '', description: '' })
    }

    render() {
        return (


            <form 
            onSubmit={this.postForumpost}
            style={forumpostFormStyle}
            >
                <p style={{width:'100%', padding:'1em'}}>Title</p>
                
                <input
                style={forumpostTextStyle}
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleLoginFieldChange}
                />
                <br />
                <p style={{width:'100%', padding:'1em'}}>Content</p>
                <textarea
                style={{ ...forumpostTextStyle, ...{height:'10em', fontSize:'0.8em'}}}
                    type="text"
                    name="content"
                    value={this.state.content}
                    onChange={this.handleLoginFieldChange}
                />
                <button 
                type="submit"
                style={forumpostButtonStyle}>Post!</button>
            </form>
        )
    }
}

export default connect(
    null,
    { addForumpost }

)(ForumpostForm)


const forumpostTextStyle = {
    padding:'3px',
    minHeight: '0.7em',
    width: '98%',
    fontStyle: 'bold',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',
    fontSize: '1.2em',
    color: '#333',
    background: 'DDD',
    borderRadius: '5px',
}

const forumpostFormStyle = {
    align:'center',
    margin: '5px',
    textAlign:'center',
    minHeight: '1.6em',
    width: '100%',
    fontStyle: 'bold',
    background: 'linear-gradient(70deg, #CC7A00, #333)',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',
    fontSize: '1.5em',
    color: '#333'
}

const forumpostButtonStyle = {
    cursor: 'pointer',
    float:'center',
    align:'center',
    overflow: 'none',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',
    fontSize: '0.9em',
    width: '8em',
    height: '1.3em',
    marginRight: '10px',
    marginTop: '15px',
    color: '#DCDCDC',
    border: 'none',
    borderRadius: '5px',
    background: 'linear-gradient(70deg, #775900, #000)'
}