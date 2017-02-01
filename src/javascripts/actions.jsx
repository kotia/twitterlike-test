export const RECEIVE_TWEETS = Symbol();
export const RECEIVE_USERS = Symbol();

export const LOGIN = Symbol();
export const LOGIN_ERROR = Symbol();
export const LOGIN_SUCCESS = Symbol();

export const LOGOUT = Symbol();

export const REGISTER = Symbol();
export const REGISTER_ERROR = Symbol();
export const REGISTER_SUCCESS = Symbol();
export const ADD_USER = Symbol();

export const CREATE_TWEET = Symbol();
export const CREATE_TWEET_ERROR = Symbol();
export const CREATE_TWEET_SUCCESS = Symbol();

export const EDIT_TWEET = Symbol();
export const EDIT_TWEET_ERROR = Symbol();
export const EDIT_TWEET_SUCCESS = Symbol();

export const REMOVE_TWEET = Symbol();
export const REMOVE_TWEET_ERROR = Symbol();
export const REMOVE_TWEET_SUCCESS = Symbol();

export const TWEET_DEFAULT_STATE = Symbol();

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addUser(user) {
    return {
        type: ADD_USER,
        id: user.id,
        username: user.username
    }
}

export function login(username, password) {
    return {
        type: LOGIN,
        username,
        password
    };
}

export function loginError(text) {
    return {
        type: LOGIN_ERROR,
        text
    };
}

export function loginSuccess(id) {
    return {
        type: LOGIN_SUCCESS,
        id
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function register(username, password) {
    return {
        type: REGISTER,
        username,
        password
    };
}

export function registerError(text) {
    return {
        type: REGISTER_ERROR,
        text
    };
}

export function registerSuccess(id) {
    return {
        type: REGISTER_SUCCESS,
        id
    }
}

export function createTweet(id, text, tweetId) {
    return {
        type: CREATE_TWEET,
        id,
        text,
        tweetId
    }
}

export function createTweetError(text) {
    return {
        type: CREATE_TWEET_ERROR,
        text
    }
}

export function createTweetSuccess(tweet) {
    return {
        type: CREATE_TWEET_SUCCESS,
        tweet
    }
}

export function editTweet(id, text) {
    return {
        type: EDIT_TWEET,
        id,
        text
    }
}

export function editTweetSuccess(id, text) {
    return {
        type: EDIT_TWEET_SUCCESS,
        id,
        text
    }
}

export function removeTweet(id) {
    return {
        type: REMOVE_TWEET,
        id
    }
}

export function removeTweetSuccess(id, text) {
    return {
        type: REMOVE_TWEET_SUCCESS,
        id,
        text
    }
}

export function defaultStateTweet(id) {
    return {
        type: TWEET_DEFAULT_STATE,
        id
    }
}

