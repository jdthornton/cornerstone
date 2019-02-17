import express from 'express';
import listing from '../controllers/listing';
import async from '../utils/wrappers';

var router = express.Router();

router.get('/listings', async(listing.search));

router.get('/listings/:id', async(listing.getPublic));

router.post('/listings', async(listing.create));


export default router;
