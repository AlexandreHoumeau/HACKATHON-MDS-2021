import express from 'express';
import User from './User/index';
import Auth from './Auth/index'
import Post from './Post/index';
import Feed from './Feed/index'
const app = express();

app.use('/api/user', User);
app.use('/api/auth', Auth)
app.use('/api/post', Post)
app.use('/api/feed', Feed)

module.exports = app;