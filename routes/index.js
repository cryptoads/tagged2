var express = require('express');
var router = express.Router();
var models = require('../models');
const ensureAuthenticated = require('../auth').ensureAuthenticated;
const bodyParser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){    
        models.user.findById(req.user,{
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

    })}else{
                res.render('index')
            }
});


router.get('/test', (req,res) =>{ 
    if(req.isAuthenticated()){
     models.user.findById(req.user,{
        include: [{
            model: models.tag,
            include: [{model: models.message, attributes:['message']}],
            attributes:['tagnum']
         }]
     })
    .then(user => {
        res.render('error', {
            message: JSON.stringify(user.tags, null, "\t")
    })
})}else{
        res.render('index')
    }
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


router.post('/', (req, res)=>{
    // if(req.isAuthenticated()){
    console.log(req.body);
        models.message.create({
        userId: req.body.userId,
        tagId: req.body.tagId,
        message: req.body.message
     })
    // }else{
    //     res.render('index')
    // }
})


module.exports = router;
