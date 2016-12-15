import fetchFollwerOrFollwee from './fetchFollwerOrFollwee';
import getVideo from './getLink';
import getMovies from './getMovies';
import config from '../spider.config';
import co from 'co';
import 'babel-polyfill';
import Promise from 'bluebird';

export function Spider(userPageUrl, socket) {
    getMovies(userPageUrl, socket).then(movies => {
        console.log('============\n');
        console.log('抓取电影信息成功，共'+movies.length+'部电影');
        socket.emit('movie', movies);
    });
    // co(SpiderMain(userPageUrl, socket));
}

function* SpiderMain(userPageUrl, socket) {
    try {
        //======抓取电影信息======//
        var movies = yield getMovies(userPageUrl, socket);
        socket.emit('notice', '抓取豆瓣电影信息成功');

        //======获取电影链接======//
        var links = yield Promise.map(movies,
            movie => getVideo(movie.url)
        )
    } catch (err) {
        console.log(err);
    }

}
