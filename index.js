const express = require('express');
console.log("Hello User...........");
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./connect');

const app = express();
app.use(bodyParser.json());

//set static path
app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey = 'BHta4cm0-QlI95qmvV5jYk-nFgIUcyUVtJ3CBwbtCQPSRR69IWKHeaGjp3oQL7QDMHdizYQV63ZBA3QWQYIgwzs';
const privateVapidKey = '2Lfa2QV63n7X1otM49iBxdsyLqYVkBmDmhp0j3DPTGA';

const option = webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

//subscribe route
app.post('/subscribe', (req, res) => {

  //get pushSubscriptionObject
  const subscription = req.body;
  console.log("==============================================");
  console.log(subscription);
  console.log("==============================================");

  const endpoint = subscription.endpoint;
  console.log(endpoint);
 

  connection.query("Select * from users where endpoint = ?", [endpoint], function (err, result) {
    console.log(result);
    if(err) {console.log(err);}
   // const user = result[0].username;
    // var data = JSON.parse(result[0].data);

    console.log("=============================================");
   // console.log("data",data);
    console.log("=============================================");


    const payload = JSON.stringify({
      title: 'Hello ',
      type: 'subscribe'
    });
    console.log(payload); 

    webPush.sendNotification(subscription , payload).catch(err => console.error(err));

  });

});

app.post('/message', (req,res) => {
console.log(req.body);
});

//server running at port 5000
app.listen(5000, () => console.log('Server running at port 5000...'));
