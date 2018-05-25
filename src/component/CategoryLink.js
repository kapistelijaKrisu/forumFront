import React from 'react'

const CategoryLink = ({ category }) => {
    if (category === undefined) {
        return <div />
    }

    const redirectLink = () => {
        window.location = `/category/${category.categoryid}`
    }

    return (
        <div style={categoryStyle} onClick={() => { redirectLink() }}>

            <p syle={{ fontSize: '1.1em' }}>{category.name}</p>
            <p style={{ fontSize: '0.9em' }}>{category.description}</p>
        </div>
    )
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