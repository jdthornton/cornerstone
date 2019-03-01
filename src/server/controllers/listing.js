import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import fs from 'fs';
import fileType from 'file-type';
import bluebird from 'bluebird';
import multiparty from 'multiparty';
import axios from 'axios';

import Listing from '../models/listing';

// configure the keys for accessing AWS
aws.config.update({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET
});


// configure aws to work with promises
aws.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new aws.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: 'cornerstoneapp',
    ContentType: type.mime,
    Key: `${name}.png`
  };
  return s3.upload(params).promise();
};

export default {
  getPublic: async (req, res) => {
    try {
      let listing = await Listing.findById(req.params.id)
      if(!listing) {
        throw new Error("This listing does not exist");
      } else {
        res.send({"payload": listing});
      }
    } catch (e) {
      res.sendStatus(500)
    }

  },

  search: async (req, res) => {
    try {
      var coords;
      var distance = req.query.r || 10
      var payload = {};
      if(req.query.str){
        let { data, status } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.str}&key=${GOOGLE_API_KEY}`)
        if(status === 200){
          coords = {lng: data.results[0].geometry.location.lng, lat: data.results[0].geometry.location.lat}
          payload.coords = coords;
        } else {
          throw new Error()
        }
      } else {
        coords = {lng: req.query.lng, lat: req.query.lat}
      }

      payload.listings = await Listing.find({
                                    location: {
                                      $near: {
                                        $geometry: {
                                          type: "Point",
                                          coordinates: [coords.lng, coords.lat]
                                        },
                                        $maxDistance: distance * 1609.34
                                      }
                                    }}).lean();

      res.send(payload);
    } catch (e) {
      res.sendStatus(500)
    }
  },

  create: async (req, res) => {
      const form = new multiparty.Form();
      form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
          let body = JSON.parse(fields.body[0])
          if(body.address && body.city && body.state && body.zip && body.headline && body.description ) {
            let str = body.address+", "+body.city+", "+body.state;
            let replaced = str.replace(/\s/g, '+');
            let { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${replaced}&key=${GOOGLE_API_KEY}`)
            const newListing = new Listing({
              ...body,
              location: {type: "Point", coordinates: [data.results[0].geometry.location.lng, data.results[0].geometry.location.lat]}
            });

            await newListing.save();

            if(files.image){
              const path = files.image[0].path;
              const buffer = fs.readFileSync(path);
              const type = fileType(buffer);
              const timestamp = Date.now().toString();
              const data = await uploadFile(buffer, newListing._id, type);
              Listing.findOneAndUpdate({_id: newListing._id}, { $set: { image: "https://s3.us-east-2.amazonaws.com/cornerstoneapp/"+newListing._id+".png" }}, (error) => {
                if(error){
                  console.log(error);
                }
                res.send({"id": newListing._id});
              });
            } else {
              res.send({"id": newListing._id});
            }
        } else {
          res.send({"error": "Invalid"})
        }
      } catch (error) {
        throw new Error(error);
      }
    })
  }
}
