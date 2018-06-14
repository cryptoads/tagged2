var express = require('express');
var router = express.Router();
var models = require('../models');
const ensureAuthenticated = require('../auth').ensureAuthenticated;
const bodyParser = require('body-parser');




function tagExists(tag, state){
  return models.tag.findOne({where: {tagnum: tag, state: state} })
   .then(tag =>{
    if(tag != null){
    return tag.id
    }else{
        return null
    }
   }
)}


/* GET home page. */
router.get('/', function(req, res, next) { 
    if(req.isAuthenticated()){
     models.user.findById(req.user,{
        include: [{
            model: models.tag,
            include: [{model: models.message, attributes:['message']}],
            attributes:['tagnum']
         }]
     })
    .then(user => {
        console.log(user.tags[0].tagnum + " LOOOK RIGHT HERE GUY")
        res.render('index', {
            isLoggedIn: req.isAuthenticated(),
            tagnum: user.tags,
            message: user.tags
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
    const newTagNum = req.body.tagNum;
    const newState = req.body.state;
    const newMessage =  req.body.newMessage;

    tagExists(newTagNum, newState).then(tag => {
        if(tag != null){
        models.message.create({
        userId: req.user,
        tagId: tag,
        message: newMessage
     })
    }else{
        models.tag.create({
            tagnum: newTagNum, 
            state: newState 
        }).then(tag => {
            models.message.create({
                userId: req.user,
                tagId: tag.id,
                message: newMessage
            })
        })
    }
 }).then(done => {
    res.render('index', {
        isLoggedIn: req.isAuthenticated()
    });
 })

})


module.exports = router;
