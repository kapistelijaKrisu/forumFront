import React from 'react'
import { connect } from 'react-redux'
import CategoryForm from './CategoryForm'
import CategoryLinkUi from './CategoryLinkUi'

const Home = ({ categories, dude }) => {
    const form = dude && dude.isMod ? <CategoryForm /> : <div />
    return (
        <div>
            {form}
            {categories.map(category =>
                <CategoryLinkUi key={category.category_id}
                data={category} />
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