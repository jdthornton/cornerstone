import "regenerator-runtime/runtime";
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser  from 'body-parser';
import { Server } from 'http';
import seedDb from './utils/seed';

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.collection('listings').countDocuments(function(err, count){
  if(count == 0){
    seedDb();
  }
})

const app = express();
const server = Server(app);
const PORT = 3000;


if(process.env.NODE_ENV === 'development'){
  app.use(cors({credentials: true, origin: 'http://localhost:8080'}));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


import routes from './routes/api';

app.use('/api/v1', routes);

app.use(function(error, req, res, next){
  console.log("ERROR STATUS", error.status);
});

if(process.env.NODE_ENV === 'production') {
  const render = require('./render').default
  app.use(
    //'/assets',
    expressStaticGzip('dist', {
  		enableBrotli: true,
  	})
  );

  app.use('*', render);
}


server.listen(PORT, () => console.log('Demo app listening on port '+PORT));
