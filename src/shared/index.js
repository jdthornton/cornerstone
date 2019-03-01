import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import loadable from '@loadable/component'

import LoadSpinner from './components/LoadSpinner';
import Landing from './components/Landing'
import Offline from './components/Offline';

const Search = loadable(() => import('./components/Search'))
const Map = loadable(() => import('./containers/Map'), {
  LoadingComponent: LoadSpinner
})
const Listing = loadable(() => import('./containers/Listing'), {
  LoadingComponent: LoadSpinner
})
const Form = loadable(() => import('./containers/Form'), {
  LoadingComponent: LoadSpinner
})

import styles from './index.css';

class App extends React.Component {
  previousLocation = this.props.location;
  componentWillUpdate(nextProps) {
    let { location } = this.props;

    // set previousLocation if props.location is not modal
    if (
      location.pathname == '/' || location.pathname == '/listings'
    ) {
      this.previousLocation = this.props.location
    }
  }
  render() {
    let { location } = this.props;
    let isModal = (location.pathname != '/' && location.pathname != '/listings')
    return (
      <React.Fragment>
      <Helmet
          htmlAttributes={{ lang: 'en', amp: undefined }} // amp takes no value
          titleTemplate="%s | Cornerstone"
          titleAttributes={{ itemprop: 'name', lang: 'en' }}
          meta={[
              { name: 'description', content: 'Responsive property listing application' },
              { name: "author", content: "Jake Thornton" },
              { name: 'viewport', content: 'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
              { name: "apple-mobile-web-app-capable", content: "yes"},
              { name: "mobile-web-app-capable", content: "yes"}
          ]}
      />
      <header>
        <Link to="/" className={styles.logo}>CORNER<br />STONE</Link>
        <Search isMobile={this.props.isMobile} />
      </header>
      <main>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path="/listings" render={() => <Map isMobile={this.props.isMobile}  />} />
          <Route path="/" component={Landing} />
        </Switch>
      </main>
        {isModal &&
          <Switch>
            <Route path="/listings/create" render={props => <Form {...props} prevLoc={this.previousLocation} />} />
            <Route path='/listings/:id' render={props => <Listing {...props} prevLoc={this.previousLocation} />} />
          </Switch>
        }
        <Offline />
      </React.Fragment>
    );
  }
}

export default App;
