var express= require('express');
var webApp = express();
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');
let trasporter = nodeMailer.createTransport({
  service:"Gmail",
  auth:{
    user:'ameloamelo89@gmail.com',
    pass:'Andy8906',
  }
})

webApp.use(bodyParser.json());
webApp.use(bodyParser.urlencoded({extended: true}))


webApp.get('/', function(req, res) {
  res.send("hello Andy");
});

webApp.post('/email', function(req, res) {
  var postedData = req.body;
    // res.json(postedData);
    trasporter.sendMail({
      from:'ameloamelo89@gmail.com',
      to:postedData.to,
      html:postedData.msg
    },
    function(err, info){
      if(err){
      console.log(JSON.stringify(err));
      return res.sendStatus(500);
    }
    console.log(JSON.stringify(info));
    res.json(info);
  })
});

// webApp.get('/:num1/:num2', function(req, res) {
//   var n1 = req.params.num1;
//   var n2 = req.params.num2;
//   var sum = Number(n1) + Number(n2);
//   res.send("the sum of your number is + "sum " +")
// })

webApp.listen(8967);
console.log('server listening');
