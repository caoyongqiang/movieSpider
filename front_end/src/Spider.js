import fetchFollwerOrFollwee from './fetchFollwerOrFollwee';
import getUser from './getUser';
import getMovies from './getMovies';
import config from '../spider.config';
import co from 'co';
import 'babel-polyfill';
import Promise from 'bluebird';

export function Spider(userPageUrl, socket) {
    getMovies(userPageUrl, socket).then(movies => {
        console.log('============\n');
        console.log('抓取电影信息成功，共'+movies.length+'部电影');
        socket.emit('movie', movies.map(movie => (movie)));
    });
}