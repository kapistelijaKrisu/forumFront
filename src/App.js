import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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
            <Switch>
              <Route exact path="/" render={() => <Home />}
              />
              <Route exact path="/dude/:dudeid" render={({ match, history }) =>
                <DudeOverView dudeid={match.params.dudeid}
                />}
              />
              <Route exact path="/category/:categoryid" render={({ match, history }) =>
                <Category categoryid={match.params.categoryid}
                />}
              />
              <Route exact path="/category/:categoryid/forumpost/:forumpostid" render={({ match, history }) =>
                <Forumpost forumpostid={match.params.forumpostid}
                />}
              />
              <Route exact path="/category/:categoryid/post" render={({ match, history }) =>
                <ForumpostForm categoryid={match.params.categoryid}
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