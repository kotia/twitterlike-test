window.testEnv = {
    tests: [],
    helpers: {
        fixture: '<div id="app"></div>',
        responses: {
            empty: [],
            tweets: [{
                id: '0',
                userId: '0',
                text: 'tweet text 1',
                timestamp: '222222'
            }, {
                id: '1',
                userId: '1',
                tweetId: '0',
                text: 'tweet text 2',
                timestamp: '3333333'

            }],
            users: [{
                id: '0',
                username: 'foo'
            }, {
                id: '1',
                username: 'bar'
            }]
        },

        fakePromise: function(obj) {
            let respObj = JSON.stringify(obj);
            return new Promise((resolve) => { resolve(new window.Response(respObj))});
        },

        initialStub: function(url) {
            if (url === '/getUsers') {
                return window.testEnv.helpers.fakePromise(window.testEnv.helpers.responses.users);
            }

            if (url === '/getTweets') {
                return window.testEnv.helpers.fakePromise(window.testEnv.helpers.responses.tweets);
            }
        }
    }
};