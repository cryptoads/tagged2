var express = require('express');
var router = express.Router();
var models = require('../models');
const ensureAuthenticated = require('../auth').ensureAuthenticated;
const bodyParser = require('body-parser');
const request= require('request');



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

function renderpage(req, res){
        if(req.isAuthenticated()){
     models.user.findById(req.user,{
        include: [{
            model: models.tag,
            include: [{model: models.message, attributes:['message', 'createdAt']}],
            attributes:['tagnum, make, model, year']
         }]
     })
    .then(user => {
        res.render('index', {
            isLoggedIn: req.isAuthenticated(),
            tagnum: user.tags,
            message: user.tags,
            make: user.tags,
            model: user.tags,
            year: user.tags
    })
})}else{
        res.render('index')
    }
}

/* GET home page. */
router.get('/', function(req, res, next) { 
    if(req.isAuthenticated()){
     models.user.findById(req.user,{
        include: [{
            model: models.tag,
            include: [{model: models.message, attributes:['message', 'createdAt']}],
            attributes:['tagnum, make, model, year']
         }]
     })
    .then(user => {
        res.render('index', {
            isLoggedIn: req.isAuthenticated(),
            tagnum: user.tags,
            message: user.tags,
            make: user.tags,
            model: user.tags,
            year: user.tags
    })
})}else{
        res.render('index')
    }
});


// router.get('/test', (req,res) =>{ 
//     if(req.isAuthenticated()){
//      models.user.findById(req.user,{
//         include: [{
//             model: models.tag,
//             include: [{model: models.message, attributes:['message', 'createdAt']}],
//             attributes:['tagnum']
//          }]
//      })
//     .then(user => {
//         res.render('error', {
//             message: JSON.stringify(user.tags, null, "\t")
//     })
// })}else{
//         res.render('index')
//     }
// });



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
    const newTagNum = req.body.tagNum.toUpperCase().replace(/\s/g, '');
    const newState = req.body.state.toUpperCase().replace(/\s/g, '');
    const newMessage =  req.body.newMessage;


    tagExists(newTagNum, newState).then(tag => {
        if(tag != null){

        const myMessage = models.message.build({userId: req.user, tagId: tag, message: newMessage})
        .save().then(done =>{renderpage(req, res)})
    }else{
        const newTag = models.tag.build({tagnum: newTagNum, state: newState })
        .save()
        .then(tag => {
            const myMessage = models.message.build({userId: req.user, tagId: tag.id, message: newMessage})
            .save().then(done =>{renderpage(req, res)})
        })
    }
 })
})


router.post('/addtag', (req, res) => {
    const newTagNum = req.body.tagNum.toUpperCase().replace(/\s/g, '');
    const newState = req.body.state.toUpperCase().replace(/\s/g, '');
    const vin = req.body.vin.toUpperCase().replace(/\s/g, '');
    
    var promise = new Promise((resolve)=>{
        tagExists(newTagNum, newState)
        .then(tag => {
            if(tag != null) {
                models.tag.findById(tag)
                .then(currentTag => {
                    models.user.findById(req.user)
                    .then(user =>{
                        currentTag.setUsers([user]).then(done=>{resolve()})     
                    })           
                })
            }else{
                if (vin !== null) {
                    var promise = new Promise((resolve)=>{
                        return request(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`, function (err, res, body) {
                            if (err) { return console.log(err); }
                            var make = JSON.parse(res.body).Results[0].Make;
                            var model = JSON.parse(res.body).Results[0].Model;
                            var year = JSON.parse(res.body).Results[0].ModelYear;
                            console.log(make, model, year);
                        });
                    })
                    promise.then(done=>{})
                }
                const newTag = models.tag.build({tagnum: newTagNum, state: newState, vin: vin, make: make, model: model, year: year })
                .save()
                
                .then(tag => {
                    models.user.findById(req.user)
                .then(user=>{
                    tag.setUsers([user]).then(done=>{resolve()})   
                    
                }) 
                })
            }
        }).then(() => {
        renderpage(req, res)
        })
    
    });

    promise.then(done=>{renderpage(req,res)})
 }) 

module.exports = router;
