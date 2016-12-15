import request from 'request';
import Promise from 'bluebird';
import config from '../spider.config';
import _ from 'lodash';
import setMovie from './setMovie';
export default function getMovies(userPageUrl, socket) {
    let pageStarts = [];
    let [movieAmount=1000] = [config.movie_amount];
    let params = {
        type : 'movie',
        tag : config.tag,
        page_limit : config.page_limit,
        sort : config.sort,
        movieAmount : movieAmount
    };
    for(let i=0; i<movieAmount; i+=20) {
        pageStarts.push(i);
    }
    return Promise.map(pageStarts, pageStart => {
        // if(pageStart && !(pageStart%5)) {
        //     console.log('Taking a break...'+pageStart);
        //     sleep(5000).then(() => {
        //         return fetchMovies(pageStart, params, socket);
        //     })
        // }
        return fetchMovies(pageStart, params, socket);
    })
    .then(array => _.flatten(array))
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function fetchMovies(pageStart, {
        type = 'movie',
        tag = '热门',
        page_limit = 20,
        sort = 'recommend',
        movieAmount
    }, socket) {
    return new Promise((resolve, reject) => {
        console.log('fetching movie:');
        console.log('type:'+type +'======tag:'+tag + '======page_start:' + pageStart +'======page_limit:'+page_limit + '======sort:'+sort +'======movieAmount:'+movieAmount+ '\n');
        request({
            method: 'GET',
            url: 'https://movie.douban.com/j/search_subjects',
            qs: {
                type: type,
                tag: tag,
                sort: sort,
                page_start: pageStart,
                page_limit: page_limit
            },
            headers: {
                'cookie': config.cookie,
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'cache-control': 'no-cache',
                'x-requested-with': 'XMLHttpRequest'
            },
            timeout: 1500
        }, (err, res, body) => {
            var tmp = [];
            try {
                if (body) {
                    tmp = _.filter(JSON.parse(body).subjects, getMyLove);
                    if(tmp && tmp.length) {
                        tmp.map(movie => setMovie(movie));
                    }
                    console.log('tmp:' + tmp);
                } else {
                    throw ('Body is undefined');
                }
            } catch (e) {
                console.log("\n======ERROR======");
                console.log(e, body);
                console.log("======ERROR======\n");
            }
            if (err) {
                if (err.code == 'ETIMEDOUT' || err.code == 'ESOCKETTIMEDOUT') {
                    resolve(fetchMovies(pageStart, {
                        type : type,
                        tag : tag,
                        page_limit : page_limit,
                        sort : sort,
                        movieAmount: movieAmount
                    }, socket));
                } else {
                    reject(err)
                }
            } else {
                resolve(tmp);
            }
        })
    })
}

function getMyLove(movie) {
    let [rate=8] = [config.rate];
    if(movie.rate >= rate) {
        return true;
    }
}