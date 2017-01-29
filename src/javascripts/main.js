import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { store } from "./store.jsx";

import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {AppContainerCon as AppContainer} from "./index.jsx";
import {CreateTweetContainerCon as CreateTweetContainer} from "./create.jsx";
import {LoginContainerCon as LoginContainer} from "./login.jsx";
import {TweetAndRepliesContainerCon as TweetAndRepliesContainer} from "./tweet-and-replies.jsx";
import {TweetsContainerCon as TweetsContainer} from "./tweets.jsx";
import {UsersContainerCon as UsersContainer} from "./users.jsx";

require('../stylesheets/style.scss');
injectTapEventPlugin();

const Navigation = (
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Router history={hashHistory}>
                <Route path="/" component={AppContainer}>
                    <IndexRoute component={UsersContainer} />
                    <Route path="/login" component={LoginContainer} />
                    <Route path="/create" component={CreateTweetContainer} />
                    <Route path="/tweets/:userId" component={TweetsContainer} />
                    <Redirect from="/tweets" to="/" />
                    <Route path="/tweet/:tweetId" component={TweetAndRepliesContainer} />
                    <Redirect from="/tweet" to="/" />
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>
);

ReactDOM.render(
    Navigation,
    document.getElementById('app')
);