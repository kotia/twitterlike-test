"use strict";

var express = require('express');
var router = express.Router();

var redis = require('redis');
var db = redis.createClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getUsers', (req, res) => {
  db.smembers('users', (err, keys) => {
    if (!keys || !keys.length) {
      res.json([]);
      res.end();
    } else {
      let counter = keys.length;
      let usersResp = [];
      keys.forEach((key) => {
        db.hgetall('user_' + key, (err, user) => {
          counter--;
          delete user.password;
          usersResp.push(user);
          if (!counter) {
            res.json(usersResp);
            res.end();
          }
        });
      });
    }
  });
});

router.post('/getTweets', (req, res) => {
  db.smembers('tweets', (err, keys) => {
    let tweetsResp = [];
    if (!keys || !keys.length) {
      res.json(tweetsResp);
      res.end();
    } else {
      let counter = keys.length;

      keys.forEach((key) => {
        db.hgetall('tweet_' + key, (err, tweet) => {
          counter--;
          tweetsResp.push(tweet);
          if (!counter) {
            res.json(tweetsResp);
            res.end();
          }
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  let params = req.body;
  let isFound = false;
  db.smembers('users', (err, keys) => {
    let counter = keys.length;

    if (!counter) {
      res.json({result: 'error', desc: 'no such user'});
      res.end();
    }

    keys.forEach((key) => {
      db.hgetall('user_' + key, (err, user) => {
        counter--;

        if (user.username === params.username) {
          isFound = true;
          if (user.password === params.password) {
            res.json({result: 'success', id: user.id});
          } else {
            res.json({result: 'error', desc: 'wrong password'});
          }
          res.end();
        }

        if (!counter && !isFound) {
          res.json({result: 'error', desc: 'no such user'});
          res.end();
        }
      });
    });
  });
});


router.post('/register', (req, res) => {
  let userId = 0;
  let params = req.body;

  let newUser = {
    username: params.username,
    password: params.password,
    id: userId
  };

  db.smembers('users', (err, keys) => {

    let isErr = false;

    if (keys && keys.length) {
      let counter = keys.length;
      keys.forEach((key) => { if (key >= userId) {userId = parseFloat(key) + 1;} });

      keys.forEach((key) => {
        db.hgetall('user_' + key, (err, user) => {
          counter--;
          if (user.username === params.username) {
            isErr = true;
            res.json({result: 'error', desc: 'this username already exists!'});
            res.end();
          } else if (!counter && !isErr) {
            newUser.id = userId;
            db.hmset('user_' + userId, newUser, () => {
              db.sadd('users', userId, () => {
                res.json({result: 'success', id: userId});
                res.end();
              })
            });
          }
        });
      });
    } else {
      db.hmset('user_' + userId, newUser, () => {
        db.sadd('users', userId, () => {
          res.json({result: 'success', id: userId});
          res.end();
        })
      });
    }
  });
});

router.post('/addTweet', (req, res) => {
  let tweetId = 0;
  let params = req.body;

  let tweetObj = {
    id: tweetId,
    userId: params.userId,
    text: params.text,
    timestamp: Date.now()
  };

  if (typeof params.tweetId !== 'undefined') {
    tweetObj.tweetId = params.tweetId;
  }

  db.smembers('tweets', (err, keys) => {
    if (keys && keys.length) {
      keys.forEach((key) => { if (key >= tweetId) {tweetId = parseFloat(key) + 1;} });
      tweetObj.id = tweetId;

      db.hmset('tweet_' + tweetId, tweetObj, () => {
        db.sadd('tweets', tweetId, () => {
          res.json(tweetObj);
          res.end();
        })
      });
    } else {
      db.hmset('tweet_' + tweetId, tweetObj, () => {
        db.sadd('tweets', tweetId, () => {
          res.json(tweetObj);
          res.end();
        })
      });
    }
  });
});

router.post('/editTweet', (req, res) => {
  let text = req.body.text;
  let tweetId = req.body.id;

  db.hset('tweet_' + tweetId, 'text', text, (err, key) => {
    res.json({id: tweetId, text: text});
    res.end();
  });
});

router.post('/removeTweet', (req, res) => {
  let id = req.body.id;
  db.del('tweet_' + id, () => {
    db.srem('tweets', id, () => {
      res.end();
    });
  });
});

module.exports = router;
