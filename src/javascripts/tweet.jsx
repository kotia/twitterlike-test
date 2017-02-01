import * as React from "react";
import {editTweet, removeTweet, createTweet, defaultStateTweet} from "./actions.jsx";
import {connect} from "react-redux";
import { Link } from 'react-router'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import AvRepeat from 'material-ui/svg-icons/av/repeat';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

class TweetContainer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            editing: false,
            expanded: false,
            editedText: this.props.tweet.text,
            replyText: ""
        };

        this.actions = {
            onToggleExpand: this.toggleExpand.bind(this),
            onRemove: this.onRemove.bind(this),
            onToggleEdit: this.onToggleEdit.bind(this),
            onEditEdit: this.onEditEdit.bind(this),
            onEdit: this.onEdit.bind(this),
            onEditReply: this.onEditReply.bind(this),
            onReply: this.onReply.bind(this),
            onDefaultState: this.defaultState.bind(this)
        };

        this.author = this.props.users.find((user) => user.id === this.props.tweet.userId);
    }

    defaultState() {
        this.props.defaultState(this.props.tweet.id);
    }

    toggleExpand() {
        this.setState({expanded: !this.state.expanded});
    }

    onRemove() {
        this.props.onRemoveTweet(this.props.tweet.id);
    }

    onToggleEdit() {
        this.setState({editing: !this.state.editing});
    }

    onEditEdit(e) {
        this.setState({editedText: e.target.value});
    }

    onEdit() {
        this.setState({editing: false});
        this.props.onEditTweet(this.props.tweet.id, this.state.editedText);
    }

    onEditReply(e) {
        this.setState({replyText: e.target.value});
    }

    onReply() {
        this.props.onReplyTweet(this.props.user.id, this.state.replyText, this.props.tweet.id);
    }

    render() {
        let repliedText;

        if (this.props.tweet.tweetId) {

            let repliedTweet = this.props.tweets.find((tweet) => tweet.id === this.props.tweet.tweetId);
            if (repliedTweet) {
                repliedText = repliedTweet.text;
            }
        }

        return (
            <Tweet tweet = {this.props.tweet}
                   editing = {this.state.editing}
                   editedText = {this.state.editedText}
                   expanded = {this.state.expanded}
                   user = {this.props.user}
                   actions = {this.actions}
                   repliedText = {repliedText}
                   author = {this.author}

            />
        );
    }
}

class Tweet extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let isAuthor = this.props.user.id === this.props.tweet.userId;
        let textBlock = (
            <div className="tweet-text">{this.props.tweet.text}</div>
        );
        let rtBlock = "";

        if (this.props.repliedText) {
            rtBlock = (
                <div>
                    <AvRepeat/>
                    {this.props.repliedText}
                </div>

            );
        }

        if (this.props.editing) {
            textBlock = (
                <div>
                    <TextField hintText="Edit Tweet"
                               value={this.props.editedText}
                               onChange={this.props.actions.onEditEdit}
                               multiLine={true}
                               rows={3} /> <br />
                    <RaisedButton disabled={this.props.tweet.editing}
                                  primary={true}
                                  label="Save edited"
                                  onClick={this.props.actions.onEdit} />
                </div>
            );
        }


        return (
            <Card
                className="users-card"
                expanded = {this.props.expanded}>
                <CardHeader
                    title={<Link to={"/tweet/" + this.props.tweet.id}>tweet #{this.props.tweet.id}</Link>}
                    subtitle={<Link to={"/tweets/" + this.props.author.id}>By {this.props.author.username}</Link>}
                />

                <CardActions>
                    <IconButton
                        onClick={this.props.actions.onRemove}
                        iconStyle={{width: '18px', height: '18px'}}
                        disabled={!isAuthor || this.props.tweet.isEditing}
                        tooltip="Delete this tweet">
                        <ActionDelete />
                    </IconButton>
                    <IconButton
                        onClick={this.props.actions.onToggleEdit}
                        iconStyle={{width: '18px', height: '18px'}}
                        disabled={!isAuthor || this.props.tweet.isEditing}
                        tooltip="Edit tweet">
                        <EditorModeEdit />
                    </IconButton>
                </CardActions>
                <CardText>
                    {textBlock}
                    {rtBlock}
                </CardText>
                <CardActions>
                    <RaisedButton
                        primary={true}
                        label="reply"
                        onClick={this.props.actions.onToggleExpand} />
                </CardActions>
                <CardText expandable={true}>
                    <TextField hintText="Reply Field"
                               onChange={this.props.actions.onEditReply}
                               multiLine={true}
                               rows={3} />
                </CardText>
                <CardActions expandable={true}>
                    <RaisedButton
                        disabled={this.props.tweet.editing}
                        onClick={this.props.actions.onReply}
                        secondary={true} label="Post reply" />
                </CardActions>

                <Snackbar
                    open={this.props.tweet.success}
                    message="Tweet added!"
                    autoHideDuration={4000}
                    onRequestClose={this.props.actions.onDefaultState}
                />

                <Snackbar
                    open={this.props.tweet.edit_success}
                    message="Tweet edited!"
                    autoHideDuration={4000}
                    onRequestClose={this.props.actions.onDefaultState}
                />
            </Card>
        );
    }
}

let mapTweetStateToProps = (store) => ({
    tweets: store.tweets,
    users: store.users,
    user: store.user
});

let mapTweetDispatchToProps = (dispatch) => ({
    onRemoveTweet: (id) => dispatch(removeTweet(id)),
    onEditTweet: (id, text) => dispatch(editTweet(id, text)),
    onReplyTweet: (userId, text, tweetId) => dispatch(createTweet(userId, text, tweetId)),
    defaultState: (id) => dispatch(defaultStateTweet(id))
});

export const TweetContainerCon = connect(mapTweetStateToProps, mapTweetDispatchToProps)(TweetContainer);