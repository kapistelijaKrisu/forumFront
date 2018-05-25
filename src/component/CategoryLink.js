import React from 'react'
import { Link } from 'react-router-dom'

const CategoryLink = ({ category }) => {
    if (category === undefined) {
        return <div />
    }
    const categoryStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return (
        <div style={categoryStyle}>
            <Link to={`/category/${category.categoryid}`}>{category.name}</Link>
            <p>{category.description}</p>
        </div>
    )
}

export default CategoryLink