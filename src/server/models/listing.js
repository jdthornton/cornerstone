import mongoose from 'mongoose';

var ListingSchema = mongoose.Schema({
  address: { type: String, required: true},
  city: { type: String, required: true},
  state: { type: String, required: true},
  zip: { type: Number, required: true},
  location: { type: { type: String }, coordinates: [] },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  rent: { type: Number },
  deposit: { type: Number },
  headline: { type: String, required: true},
  description: { type: String, required: true},
  image: { type: String }
});

ListingSchema.index({location: '2dsphere'});

export default mongoose.model('Listing', ListingSchema);
