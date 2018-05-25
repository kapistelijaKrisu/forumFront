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

            <form onSubmit={this.postCategory}>
                <span> name</span>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleLoginFieldChange}
                />
                <br />
                <span> description</span>
                <input
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleLoginFieldChange}
                />
                <button type="submit">Add category</button>
            </form>
        )
    }
}
export default connect(
    null,
    { addCategory }

)(CategoryForm)