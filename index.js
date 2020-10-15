const express = require('express')
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./routers/router');
const mongoose = require('mongoose');
const cors = require('cors');
const chairStoreRouter = require('./routers/chairstorerouter')


//DB Setup
mongoose.connect('mongodb://localhost:27017/chairstore',{useUnifiedTopology:true,useNewUrlParser:true});


//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));
router(app);
chairStoreRouter(app);


//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log("Server listening on :",port);


