import request from 'request';
import Promise from 'bluebird';
import model from '../../db/model';

export default function save(movie) {
    let Movie = model.Movie;
    return new Promise((resolve, reject) => {
        var movieEntity = Movie.create({
            title: movie.title,
            rate: movie.rate,
            url: movie.url
        });
        console.log('created: ' + JSON.stringify(movieEntity));
    });
}