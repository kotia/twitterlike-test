import * as React from "react";
import {connect} from "react-redux";

import {TweetContainerCon as TweetContainer} from "./tweet.jsx";
import AvRepeat from 'material-ui/svg-icons/av/repeat';

class TweetAndRepliesContainer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let mainTweet = this.props.tweets.find((tweet) => tweet.id === this.props.params.tweetId);
        let repliedTweets = this.props.tweets.filter((tweet) => tweet.tweetId === this.props.params.tweetId);
        return (
            <TweetAndReplies user={this.props.user}
                             users = {this.props.users}
                             mainTweet = {mainTweet}
                             repliedTweets = {repliedTweets}
            />
        );
    }
}

class TweetAndReplies extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let tweetsList, mainTweet;

        if (!this.props.mainTweet) {
            mainTweet = <h2>Tweet not found!</h2>
        } else {
            mainTweet = <TweetContainer
                user={this.props.user}
                tweet={this.props.mainTweet} />;
        }

        if (!this.props.repliedTweets.length) {
            tweetsList = <h2>Sorry, no replies for this tweet!</h2>
        } else {
            tweetsList = this.props.repliedTweets.map((tweet) => <TweetContainer
                user={this.props.user}
                key={tweet.id}
                tweet={tweet} />);
        }

        return (
            <div>
                {mainTweet}
                <div className="replies-separator">
                    <AvRepeat style={
                        {width: '2em', height: '2em', color: '#000'}
                    }/>
                    Replies:
                </div>
                {tweetsList}
            </div>
        );
    }
}

let mapStateToProps = (store) => ({
    user: store.user,
    users: store.users,
    tweets: store.tweets
});

export const TweetAndRepliesContainerCon = connect(mapStateToProps)(TweetAndRepliesContainer);