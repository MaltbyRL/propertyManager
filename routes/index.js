// What rooms have which people
// Room price/ total revenue from rooms

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var roomSchema = mongoose.Schema({
  sqft: Number,
  occupiedBy:[{
    type: mongoose.Schema.Types.ObjectId, ref:'Tenant'
  }]
});

var tenantSchema = mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  credit: String,
  apartmentId: String
});


var Tenant = mongoose.model('Tenant', tenantSchema);
var Room = mongoose.model('Room', roomSchema);


router.post('/tenant', function(req, res) {
  var applicant = req.body;
  console.log("Hit routes/index.post", req.body);
  var setUp = new Tenant();
  console.log("After tenant schema");
  setUp.name.first = applicant.first;
  setUp.name.last = applicant.last;
  setUp.credit = applicant.credit;

  setUp.save();
  console.log("applicant: ", setUp);
  res.send(setUp);
});


router.post('/removeTenant', function(req, res){
  var _id = req.body._id
  Tenant.findOneAndRemove({_id: _id}, function(err, tenant){
    console.log("9999999", tenant);
    res.send("done")
  })
})




router.get('/getShit', function(req, res) {
  Tenant.find({}, function(err, findObj) {
    res.send(findObj)
  });





  // Room.find({}, function(err, body){
  //   var occupation = [];
  //   occupation.push(body.occupiedBy)
  //   var lookinGlass;
  //   console.log('occupation: ', body.sqft);
  //
  //   occupation.forEach(function(x){
  //     console.log("in forEach: ", occupation.length);
  //     // if (x.length < 3){
  //     //   lookinGlass = x
  //     // }
  //   });
  //
  //   if (!lookinGlass){
  //     lookinGlass = 'need new'
  //   }
  //   res.send(lookinGlass)
  // });

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Property Manager' });
});

module.exports = router;
