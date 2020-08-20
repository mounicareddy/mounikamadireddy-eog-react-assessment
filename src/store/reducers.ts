import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricListReducer } from './reducers/metricListReducer';
import { reducer as metricsReducer } from './reducers/gridReducer';
import { reducer as lastKnownMeasurementReducer } from './reducers/displayBoxReducer';
// 

export default {
  weather: weatherReducer,
  metrics: metricListReducer,
  metricsgraph: metricsReducer,
  lastKnownMeasurement: lastKnownMeasurementReducer,
};
