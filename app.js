var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var express = require("express");
var path = require('path');
var app = express();
var port = 3000;

//APP CONFIG
app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html');
app.set('views', __dirname + '/');
// app.engine('html', require('ejs').renderFile);
var MongoClient= mongodb.MongoClient;
//MONGOOSE/MODEL CONFIG
// var conn = mongoose.connect("mongodb://localhost:27017/seller-shipment", { useNewUrlParser: true});
// var shipmentSchema = new mongoose.Schema({
//   itemName: String,
//   quantity:String,
//   sourceFloor: String,
//   sourceStreet: String,
//   sourceCity: String,
//   sourceState: String,
//   sourcePinCode: String,
//   destFloor: String,
//   destStreet: String,
//   destCity: String,
//   destState: String,
//   destPinCode: String,
//   shippingDate: Date
// });

// mongoose.model("seller-shipment", shipmentSchema);

//ROUTES
//Home 
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Shipment Form
app.get('/ship', function(req, res){
 res.sendFile(path.join(__dirname, 'ship.html'));
});

app.post('/ship', function(req, res, next){
    var receivedObject = req.query;
    console.log(receivedObject);

    var url = 'mongodb://localhost:27017/seller-shipment';
    MongoClient.connect(url, function(err, db){
      if(err)
      {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } 
      else 
      {
         console.log('Connection established to', url);
         //get the documents collection
         var collection = db.collection('seller-shipment');
         //get the orders
         collection.find().toArray(function(err, result){
           if(err){
             console.log(err);
           } else{
             console.log('Got Information from DB!');
           }
  
           var newOrder = receivedObject;
           var collection = db.collection('seller-shipment');
           collection.insert([newOrder], function(err, result){
             if(err){
               console.log(err);
             } else{
               console.log('INSERTED ORDER INTO COLLECTION!!', result);
             }
           });
           //close connection
           db.close();
         });
      }   
    });

    res.redirect("/shipmentMade");
 });

//Shipment redirect
app.get('/shipmentMade', function(req, res){
  res.sendFile(path.join(__dirname, 'shipment_made.html'));
});

app.get('/retreiveAll', function(req, res){
  var url = 'mongodb://localhost:27017/seller-shipment';
  MongoClient.connect(url, function(err, db){
    if(err)
    {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } 
    else 
    {
       console.log('Connection established to', url);
       //get the documents collection
       var collection = db.collection('seller-shipment');
       //get the orders
       collection.find().toArray(function(err, result){
         if(err){
           console.log(err);
         } else{
           console.log('Got Information from DB!');
         }

         //close connection
         db.close();
         console.log('db closed');
         var orders = result;
         res.send({'orders': orders});
         console.log(orders);
       });
    }   
  });
});


app.listen(port, function(res, req) {
  console.log("Server listening on port " + port);
});
