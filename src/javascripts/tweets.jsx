import * as React from "react";
import {connect} from "react-redux";

import {TweetContainerCon} from "./tweet.jsx";


class TweetsContainer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let filteredTweets = this.props.tweets.filter((tweet) => tweet.userId === this.props.params.userId);

        return (
            <Tweets users = {this.props.users}
                    tweets = {filteredTweets}
            />
        );
    }
}

class Tweets extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let tweetsList;

        if (!this.props.tweets.length) {
            tweetsList = <h2>Sorry, no tweets for this user!</h2>
        } else {
            tweetsList = this.props.tweets.map((tweet) => <TweetContainerCon
                key={tweet.id}
                tweet={tweet} />);
        }

        return (
            <div>
                {tweetsList}
            </div>
        );
    }
}

let mapStateToProps = (store) => ({
    users: store.users,
    tweets: store.tweets
});

export const TweetsContainerCon = connect(mapStateToProps)(TweetsContainer);