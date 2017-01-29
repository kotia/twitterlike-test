import * as React from "react";
import {login, register} from "./actions.jsx";

import {connect} from "react-redux";

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class LoginContainer extends React.Component {
    constructor(props){
        super(props);

        this.actions = {
            login: this.login.bind(this),
            register: this.register.bind(this),
            onChangeUsername: this.onChangeUsername.bind(this),
            onChangePassword: this.onChangePassword.bind(this)
        };

        this.state = {
            username: "",
            password: ""
        }
    }

    login(){
        this.props.onLogin(this.state.username, this.state.password);
    }

    register(){
        this.props.onRegister(this.state.username, this.state.password);
    }

    onChangeUsername(e){
        this.setState({username: e.target.value});
    }

    onChangePassword(e){
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div>
                <Login
                    user={this.props.user}
                    actions={this.actions}
                    username={this.state.username}
                    password={this.state.password} />
            </div>
        );
    }
}

class Login extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Card>
                <CardTitle title="Please, Log in or Register" />
                <CardText>
                    <TextField
                        onChange={this.props.actions.onChangeUsername}
                        errorText={this.props.user.fail ? this.props.user.errorText : false }
                        floatingLabelText="Username"/>
                    <br />
                    <TextField
                        onChange={this.props.actions.onChangePassword}
                        errorText={this.props.user.fail ? this.props.user.errorText : false }
                        floatingLabelText="Password"/>
                </CardText>
                <CardActions>
                    <FlatButton disabled={this.props.user.requestProcess} onClick={this.props.actions.login} label="Log In" />
                    <FlatButton disabled={this.props.user.requestProcess} onClick={this.props.actions.register} label="Register" />
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = (store) => ({
    user: store.user
});

const mapDispatchToProps = (dispatch) => ({
    onRegister(username, password) {
        dispatch(register(username, password));
    },
    onLogin(username, password) {
        dispatch(login(username, password));
    }
});

export const LoginContainerCon = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
