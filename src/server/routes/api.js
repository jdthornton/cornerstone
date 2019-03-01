import express from 'express';
import listing from '../controllers/listing';

var router = express.Router();

router.get('/listings', listing.search);

router.get('/listings/:id', listing.getPublic);

router.post('/listings', listing.create);


export default router;
