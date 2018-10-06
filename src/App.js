import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import TopBar from './component/common/TopBar'
import Category from './component/view_category/Category'
import Forumpost from './component/view_forumpost/Forumpost'
import NotificationFooter from './component/common/NotificationFooter'
import Home from './component/view_home/Home'
import { getCategories } from './reducers/category'
import DudeOverView from './component/view_account/DudeOverView';
import ForumpostForm from './component/view_category/ForumpostForm';


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
            <Switch>
              <Route exact path="/" render={() => <Home />}
              />
              <Route exact path="/dude/:dude_id" render={({ match, history }) =>
                <DudeOverView dude_id={match.params.dude_id}
                />}
              />
              <Route exact path="/category/:category_id" render={({ match, history }) =>
                <Category category_id={match.params.category_id}
                />}
              />
              <Route exact path="/category/:category_id/forumpost/:forumpost_id" render={({ match, history }) =>
                <Forumpost forumpost_id={match.params.forumpost_id}
                />}
              />
              <Route exact path="/category/:category_id/post" render={({ match, history }) =>
                <ForumpostForm category_id={match.params.category_id}
                />}
              />

              <Route path="/*" component={NoMatch} />
            </Switch>
          </div>
        </Router>

        <NotificationFooter />
      </div>
    )
  }
} const NoMatch = () => {
  const errorPageStyle = {
    marginTop: '10%',
    textAlign: 'center',
    fontFamily: 'Amaranth',
    fontWeight: 'bold',
    fontSize: '4em',
    color: '#666666'
  }
  return (
    <div style={errorPageStyle}>
      <p>This is not the page you are looking for!</p>
      <p>404</p>
      <p>Page not found</p>
    </div>
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