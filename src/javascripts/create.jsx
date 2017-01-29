import * as React from "react";
import {connect} from "react-redux";

import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import {createTweet} from "./actions.jsx";

class CreateTweetContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            text: ""
        };

        this.actions = {
            onCreateTweet: this.onCreateTweet.bind(this),
            onEditText: this.onEditText.bind(this)
        };
    }

    onCreateTweet() {
        this.props.onCreateTweet(this.props.user.id, this.state.text);
    }

    onEditText(e) {
        this.setState({text: e.target.value});
    }

    render() {
        return (
            <CreateTweet actions={this.actions} tweet={this.props.tweet} />
        );
    }
}

class CreateTweet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CardTitle title="Create new tweet!" />
                <CardText>
                    <TextField hintText="Tweet Field"
                               multiLine={true}
                               rows={3}
                               onChange={this.props.actions.onEditText}
                    />
                </CardText>
                <CardActions>
                    <RaisedButton
                        disabled={this.props.tweet.requestProcess}
                        label="Publish"
                        onClick={this.props.actions.onCreateTweet} />
                </CardActions>

            </Card>
        )

    }
}

const mapStateToProps = (store) => ({
    user: store.user,
    tweet: store.tweet,
    tweets: store.tweets
});

const mapDispatchToProps = (dispatch) => ({
    onCreateTweet: (id, text) => dispatch(createTweet(id, text))
});

export const CreateTweetContainerCon = connect(mapStateToProps, mapDispatchToProps)(CreateTweetContainer);

