import * as React from "react";

import { Link } from 'react-router';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";

import { requestState } from './middleware.jsx';
import {store} from './store.jsx';
import {logout} from './actions.jsx';

class AppContainer extends React.Component {
    constructor(props){
        super(props);

        this.actions = {
            logout: this.onLogout.bind(this)
        }

    }

    componentDidMount() {
        requestState(store);
    }

    onLogout() {
        this.props.onLogout();
    }

    render() {
        return (
            <App user={this.props.user}
                 users={this.props.users}
                 children={this.props.children}
                 logout={this.actions.logout}
            />
        );
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render() {

        let username, topbarGreeting;

        if (this.props.user.id < 0 || !this.props.users.length) {
            topbarGreeting = <Link to="/login"><RaisedButton primary={true} label="Login or register"/></Link>;
        } else {
            username = this.props.users.find((user) => user.id === this.props.user.id).username;
            topbarGreeting = (
                <div>
                    <ToolbarTitle
                        className="username-greeting"
                        text={'welcome ' + username + ' #' + this.props.user.id}
                    />
                    <Link to="/">
                        <RaisedButton
                            className="users-list-button"
                            primary={true}
                            label="Go to users list"/>
                    </Link>
                    <Link to="/create">
                        <RaisedButton
                            className="margined-button create-tweet-button"
                            secondary={true}
                            label="Create tweet"/>
                    </Link>
                    <Link to="/">
                        <RaisedButton
                            secondary={true}
                            className="logout-button"
                            onClick={this.props.logout}
                            label="Logout"/>
                    </Link>
                </div>
            )
        }

        return (
            <div>
                <Toolbar>
                    <ToolbarGroup>
                        {topbarGreeting}
                    </ToolbarGroup>
                </Toolbar>
                {this.props.children}
            </div>
        );
    }
}

let mapStateToProps = (store) => ({
    user: store.user,
    users: store.users
});

let mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(logout())
});

export const AppContainerCon = connect(mapStateToProps, mapDispatchToProps)(AppContainer);