import { createSlice, PayloadAction } from 'redux-starter-kit';

// export type metricsdata = {
//   metric: string;
//   {
//     metric: string;
//     at: number;
//     value: number;
//     unit: string;
//   }

// };
export interface myobj {
  [key: string]: any;
}
export type LastKnownMeasurement = {
  getLastKnownMeasurement: myobj;
};

// export type ApiErrorAction = {
//   error: string;
// };

// export type LastKnownMeasurement = {
//   getLastKnownMeasurement: [];
// };

export type ApiErrorAction = {
  error: string;
};
const initialState = {
  metricName: 'flareTemp',
  getLastKnownMeasurement: {},
};

const slice = createSlice({
  name: 'lastKnownMeasurement',
  initialState,
  reducers: {
    lastKnownMeasurementDataRecevied: (state, action: PayloadAction<LastKnownMeasurement>) => {
      console.log('lollll', action.payload);
      // console.log(action.payload.getLastKnownMeasurement);
      // const { getLastKnownMeasurement } = action.payload;
      // console.log(getLastKnownMeasurement);

      // state.getLastKnownMeasurement = action.payload.getLastKnownMeasurement;
      console.log(state.getLastKnownMeasurement);
    },
    lastKnownMeasurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
