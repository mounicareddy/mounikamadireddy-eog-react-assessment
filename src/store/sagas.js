import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import metricListSaga from './sagas/metricListSaga';
import metricsSaga from './sagas/gridSaga';
import lastKnownMeasurement from './sagas/displayBoxSaga';


export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(metricListSaga);
  yield spawn(metricsSaga);
  yield spawn(lastKnownMeasurement);
}
