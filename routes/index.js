var express = require('express');
var router = express.Router();
var models = require('../models');
const ensureAuthenticated = require('../auth').ensureAuthenticated;

/* GET home page. */
router.get('/', function(req, res, next) {
    models.user.findById(1,{
        include: [models.message]
                })
                .then( user =>{
                    models.tag.findById(1)
                    .then(tag => {
                     res.render('index',
                     {
                            isLoggedIn: req.isAuthenticated(),
                            //use handlebars to show all messages related to user
                            message: JSON.stringify(user.messages),
            })
        })

    })
});


router.get('/test', (req,res) =>{ 
     models.user.findAll({
        include: [{
        model: models.tag,
         through: {
      attributes: ['tagId', 'userId'],
      where: {userId: 1}
    }
  }]}).then(user => {
    res.render('error', {
        message: JSON.stringify(user[0].tags)
    })
})
});



router.get('/:state/:id', (req, res) => {
    const id = req.params.id;
    const state = req.params.state;
    models.tag.findAll({
        where: {tagnum: id, state: state},
        include: [{
            model: models.message,
            attributes:['message'],
        }]
    }).then(tag => {
        res.send(JSON.stringify(tag[0].messages))
    })
});



module.exports = router;
