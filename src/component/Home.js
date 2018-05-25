import React from 'react'
import { connect } from 'react-redux'
import CategoryLink from './CategoryLink'
import CategoryForm from './CategoryForm'

const Home = ({ categories, dude }) => {
    const form = dude && dude.isMod ? <CategoryForm /> : <div />
    return (
        <div>
            {form}
            {categories.map(category =>
                <CategoryLink key={category.categoryid} category={category} />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dude: state.dude,
        categories: state.categories
    }
}
export default connect(
    mapStateToProps,
    {}

)(Home)