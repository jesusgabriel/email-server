var express = require('express');
var webApp = express();
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');
var fs =  require('fs');
var cors = require('cors');
let trasporter = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'ameloamelo89@gmail.com',
        pass: 'Andy8906',
    }
})
webApp.use(cors());
webApp.use(bodyParser.json());
webApp.use(bodyParser.urlencoded({
    extended: true
}))


webApp.get('/', function(req, res) {
    res.send("hello Andy");
});

webApp.post('/send-resume', function(req, res) {
            if (!req.body || !req.body.destination_email) {
                console.log("recived a bad request");
                res.sendStatus(400);
                return;
            }
            fs.readFile('./resume.html', function(err, theThingInTheFile) {
                if (err) {
                    console.log(JSON.stringify(err));
                    res.sendStatus(500);
                    return;
                }

                trasporter.sendMail({
                        to: req.body.destination_email,
                        subject: 'this is a test for resume',
                        html: theThingInTheFile
                    },
                    function(err, info) {
                        if (err) {
                            console.log(JSON.stringify(err));
                            res.sendStatus(500);
                            return;
                        }
                        console.log(JSON.stringify(info));
                        res.json(info);
                    })
            });
          });

webApp.get('/send-resume', function (req,res) {
  fs.readFile('./resume-emailer.html',function(err, contents){
    res.end(contents);



  })
});

            webApp.listen(8967);
            console.log('server listening');
