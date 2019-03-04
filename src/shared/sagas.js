import { call, put, takeEvery, select, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  UPDATE_CENTER,
  MAP_MOVE,
  SEARCH_LISTINGS_REQUEST,
  SEARCH_LISTINGS_REQUEST__SUCCEEDED,
  SEARCH_LISTINGS_REQUEST__FAILED
} from './reducers/map'
import {
  LISTING_REQUEST,
  LISTING_REQUEST__SUCCEEDED,
} from './reducers/listing';
import {
  CREATE_LISTING_REQUEST,
  displayErrors,
  clearForm
} from './reducers/form';

const listingsURL = API_URL+"/listings";

const getRoute = ({router}) => router.location.pathname
const getCenter = ({map}) => map.coords

const findDistance = (lng1, lat1, lng2, lat2) => {
  var p = 0.017453292519943295;
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lng2 - lng1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a));
}


const getRequest = url =>
    fetch(listingsURL+url)
    .then(checkStatus)

const postRequest = body =>
    fetch(listingsURL, {
      method: 'post',
      body: body
    }).then(checkStatus)

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      if(response.ok){
        let { errors } = response.json()
        return { errors }
      }
      throw new Error(response.status);
    }
  }

function* listingsRequestSaga(action){
  let route = yield select(getRoute)
  if(route === '/') yield put(push("/listings"))
  try {
    let payload = yield call(getRequest, `?str=${action.payload}`);
    yield put({type: SEARCH_LISTINGS_REQUEST__SUCCEEDED, payload})
  } catch (error) {
    yield put({type: SEARCH_LISTINGS_REQUEST__FAILED, payload: error})
  }
}

function* nearbyListingsSaga({payload}){
  let center = yield select(getCenter)
  let distance = yield call(findDistance, payload.lng, payload.lat, center.lng, center.lat);
  if(distance >= 10){
    yield put({type: UPDATE_CENTER, payload})
    try {
      let payload = yield call(getRequest, `?lng=${payload.lng}&lat=${payload.lat}`);
      yield put({type: SEARCH_LISTINGS_REQUEST__SUCCEEDED, payload})
    } catch (error) {
      console.log("ERROR", error);
    }
  }
}

function* listingRequestSaga(action){
  try {
    let { payload } = yield call(getRequest, "/"+action.payload)
    yield put({type: LISTING_REQUEST__SUCCEEDED, payload})
  } catch (error) {
    console.log("ERROR", error);
  }
}

function* createListingSaga({payload}){
  try {
    let { id, errors } = yield call(postRequest, payload)
    if(errors){
      yield put(displayErrors(errors))
    } else {
      yield put(push('/listings/'+id))
      yield put(clearForm())
    }
  } catch (e) {
    console.log("ERROR", error);
  }
}

function* searchSaga(){
  yield takeEvery(SEARCH_LISTINGS_REQUEST, listingsRequestSaga)
}
function* nearbySaga(){
  yield takeEvery(MAP_MOVE, nearbyListingsSaga)
}
function* listingSaga(){
  yield takeEvery(LISTING_REQUEST, listingRequestSaga)
}
function* createSaga(){
  yield takeEvery(CREATE_LISTING_REQUEST, createListingSaga)
}

export default function* rootSaga() {
  yield all([
    searchSaga(),
    listingSaga(),
    createSaga(),
    nearbySaga()
  ]);
}
