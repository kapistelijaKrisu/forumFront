import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
import history from '../../services/history';

export class LinkUi extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false
        }
    }
    redirectLink = () => {
        history.push(this.props.location)
        this.setState({ redirect: true })
    }

    render() {
        
        if (this.props.data === undefined) {
            return <div />
        }
        return (
            <div>{ this.state.redirect ?
            <Redirect to={this.props.path} />
                :
            <div style={styles[this.props.styleId]} onClick={() => { this.redirectLink() }}>
                    <p style={{ fontSize: '1.1em' }}>{this.props.title}</p>
                    <p style={{ fontSize: '0.9em' }}>{this.props.text}</p>
            </div>}</div>
        )
    }
}

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
};

const forumpostStyle = {
    cursor: 'pointer',
    height: '2em',
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 5,
    borderColor: '#C0C0C0',
    marginBottom: 5,
    background: 'linear-gradient(70deg, #e9eb50, #333)'
    //  background: 'linear-gradient(70deg, #c2f3cd, #999)'
}
export const categoryStyleId = 0;
export const forumpostStyleId = 1;
const styles = [categoryStyle, forumpostStyle];
