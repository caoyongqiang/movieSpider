// index:
const model = require('../db/model');
let
    Plan = model.Plan;
module.exports = {
    'GET /': async (ctx, next) => {
        var pets = await Plan.findAll();
        for (let p of pets) {
            console.log(JSON.stringify(p));
        }
        let user = ctx.state.user;
        if (user) {
            ctx.render('room.html', {
                user: user
            });
        } else {
            ctx.response.redirect('/signin');
        }
    }
};
