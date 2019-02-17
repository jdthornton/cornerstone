import Listing from '../models/listing';

const seedData = [
  {
    address: "6232 Knoll Dr",
    city: "Minneapolis",
    state: "MN",
    zip: 55436,
    location: {type: "Point", coordinates: [-93.382097, 44.904865]},
    bedrooms: 5,
    bathrooms: 3,
    rent: 2500,
    deposit: 2500,
    headline: "Knoll Drive",
    image: "https://s3.us-east-2.amazonaws.com/cornerstoneapp/5c5a5d39a4e841668f9439b5.png"
  },
  {
    address: "2935 10th Ave S",
    city: "Minneapolis",
    state: "MN",
    zip: 55407,
    location: {type: "Point", coordinates: [-93.260542, 44.954904]},
    bedrooms: 3,
    bathrooms: 2,
    rent: 1600,
    deposit: 1000,
    headline: "10th Ave",
    image: "https://s3.us-east-2.amazonaws.com/cornerstoneapp/5c5da84f7147a20a87e35db1.png"
  },
  {
    address: "2545 S 31st Ave",
    city: "Minneapolis",
    state: "MN",
    zip: 55406,
    location: {type: "Point", coordinates: [-93.225236, 44.955558]},
    bedrooms: 2,
    bathrooms: 1,
    rent: 1200,
    deposit: 1200,
    headline: "31st Avenue",
    image: "https://s3.us-east-2.amazonaws.com/cornerstoneapp/5c5da8f37147a20a87e35db2.png"
  },
  {
    address: "2004 NE Taylor St",
    city: "Minneapolis",
    state: "MN",
    zip: 55418,
    location: {type: "Point", coordinates: [-93.232548, 45.010003]},
    bedrooms: 1,
    bathrooms: 1,
    rent: 850,
    deposit: 850,
    headline: "Taylor Street",
    image: "https://s3.us-east-2.amazonaws.com/cornerstoneapp/5c5da9887147a20a87e35db3.png"
  }
]

export default function(){
  return null;
  //Listing.insertMany(seedData)
}
