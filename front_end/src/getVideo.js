import request from 'request';
import Promise from 'bluebird';
import config from '../link.config';
var $ = require('jquery');

export default function getVideo(movieUrl) {
    console.log('get ' + movieTitle + ' link');
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            url: movieUrl,
            headers: {
                'cookie': config.cookie,
                'Content-Type': 'text/html; charset=UTF-8',
                // 'Link': '<http://www.99tvs.com/wp-json/>; rel="https://api.w.org/"',
                // 'Transfer-Encoding': 'chunked',
                // 'X-Cache': 'MISS from'
            }
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                console.log('body:'+body);
                resolve(parse(body));
            }
        })
    });
}

function parse(html) {
    console.log($(html));
}