import React, { Component } from 'react'
import { Redirect } from "react-router-dom"

class CategoryLink extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false
        }
    }
    redirectLink = () => {
        this.setState({ redirect: true })
    }

    render() {
        if (this.props.category === undefined) {
            return <div />
        }

        
        const path = '/category/' + this.props.category.categoryid

        const linkOrRedirect = this.state.redirect ?
            <Redirect to={path} /> :
            <div style={categoryStyle} onClick={() => { this.redirectLink() }}>
                <p syle={{ fontSize: '1.1em' }}>{this.props.category.name}</p>
                <p style={{ fontSize: '0.9em' }}>{this.props.category.description}</p>
            </div>
        return (
            <div>{linkOrRedirect}</div>
        )
    }
}
export default CategoryLink

const categoryStyle = {
    paddingTop: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: '5px',
    minHeight: '1.6em',
    width: '100%',
    fontStyle: 'bold',
    background: 'linear-gradient(70deg, #FF8833, #333)',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',
    fontSize: '1.2em',
    cursor: 'pointer',
    color: '#333'
}