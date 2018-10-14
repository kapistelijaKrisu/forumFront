import React from 'react'
import { connect } from 'react-redux'
import CategoryForm from './CategoryForm'
import {LinkUi, categoryStyleId } from '../common/LinkUi'

const Home = ({ categories, dude }) => {
    const form = dude && dude.isMod ? <CategoryForm /> : <div />
    return (
        <div>
            {form}
            {categories.map(category =>
                <LinkUi key={category.category_id}
                    data={category}
                    path={'/category/' + category.category_id}
                    title={category.name}
                    text={category.description}
                    styleId={categoryStyleId} />
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