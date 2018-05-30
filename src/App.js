import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import TopBar from './component/TopBar'
import Category from './component/Category'
import Forumpost from './component/Forumpost'
import NotificationFooter from './component/NotificationFooter'
import Home from './component/Home'
import { getCategories } from './reducers/category'
import DudeOverView from './component/DudeOverView';
import ForumpostForm from './component/ForumpostForm';


class App extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  componentWillMount = async () => {
    await this.props.getCategories()
  }

  render() {

    return (
      <div>
        <Router>
          <div>
            <TopBar />
            <HomePage />
            <PersonalPage />
            <CategoryPage />
            <ForumpostPage />
            <ForumpostFormPage />
          </div>
        </Router>

        <NotificationFooter />
      </div>
    )
  }
}

const HomePage = () => (
  <Route exact path="/" render={() =>
    <Home />}
  />
)
const PersonalPage = () => (
  <Route exact path="/dude/:dudeid" render={({ match, history }) =>
      <DudeOverView dudeid={match.params.dudeid}
      />}
    />
)
const CategoryPage = () => {
  return (
    <Route exact path="/category/:categoryid" render={({ match, history }) =>
      <Category categoryid={match.params.categoryid}
      />}
    />
  )
}
const ForumpostPage = () => {
  return (
    <Route exact path="/category/:categoryid/forumpost/:forumpostid" render={({ match, history }) =>
      <Forumpost forumpostid={match.params.forumpostid}
      />}
    />
  )
}

const ForumpostFormPage = () => {
  return (
    <Route exact path="/category/:categoryid/post" render={({ match, history }) =>
      <ForumpostForm categoryid={match.params.categoryid}
      />}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

export default connect(
  mapStateToProps,
  { getCategories }

)(App)