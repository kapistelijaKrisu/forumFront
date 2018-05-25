import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCategory } from '../reducers/category'

class CategoryForm extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            description: ''
        }
    }

    handleLoginFieldChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({ [event.target.name]: event.target.value })
    }
    postCategory = async (event) => {
        event.preventDefault()
        console.log('posting')
        try {
            await this.props.addCategory({ name: this.state.name, description: this.state.description })

        } catch (exception) {
            console.log(exception)
        }
        this.setState({ name: '', description: '' })
    }

    render() {
        return (

            <form
                style={categoryFormStyle}
                onSubmit={this.postCategory}>
                <p>Add Category </p>
                <span> name</span>
                <input
                style={categoryTextStyle}
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleLoginFieldChange}
                />
                <br />
                <span> description</span>
                <input
                style={categoryTextStyle}
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleLoginFieldChange}
                />
                <button style={categoryButtonStyle} type="submit">Add category</button>
            </form>
        )
    }
}
export default connect(
    null,
    { addCategory }

)(CategoryForm)

const categoryTextStyle = {
    margin: '10px',
    minHeight: '0.7em',
    width:'70%',
    fontStyle: 'bold',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',
    fontSize: '1.2em',
    color: '#333',
    background: 'DDD',
    borderRadius: '5px',
}

const categoryFormStyle = {
    marginTop: '5px',
    overflow: 'auto',
    minHeight: '1.6em',
    width: '100%',
    fontStyle: 'bold',
    background: 'linear-gradient(70deg, #CC7A00, #333)',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',
    fontSize: '1.5em',
    color: '#333'
}

const categoryButtonStyle = {
    cursor: 'pointer',
    overflow:'auto',
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