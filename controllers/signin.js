// sign in:
const model = require('../db/model');
let
    Plan = model.Plan;
var index = 0;

module.exports = {
    'GET /signin': async (ctx, next) => {
        let names = '甲乙丙丁戊己庚辛壬癸';
        let name = names[index % 10];
        ctx.render('signin.html', {
            name: `路人${name}`
        });
    },

    'POST /signin': async (ctx, next) => {

        (async () => {
            var plan = await Plan.create({
                type: 'javasctipt',
                title: '函数式编程',
                content: 'javasctipt编程实践中的函数式编程章节',
                plan_date: '1478177566445',
                start_date: '1478177566445',
                finish_date: '1478177566445'
            });
            console.log('created: ' + JSON.stringify(plan));
        })();

        index ++;
        let name = ctx.request.body.name || '路人甲';
        let user = {
            id: index,
            name: name,
            image: index % 10
        };
        let value = Buffer.from(JSON.stringify(user)).toString('base64');
        console.log(`Set cookie value: ${value}`);
        ctx.cookies.set('name', value);
        ctx.response.redirect('/');
    },

    'GET /signout': async (ctx, next) => {
        ctx.cookies.set('name', '');
        ctx.response.redirect('/signin');
    }
};
