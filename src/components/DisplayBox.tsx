import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/reducers/gridReducer';
import {  useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface objtype {
  [key: string]: any;
}
interface valSelc {
  selectedValue?: objtype[];
}

const query = `query($input: [MeasurementQuery]!) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
  }
}`;

const current_time = new Date().getTime();


const chartdata = (data: any) => { //convert Metric data to chart supported format

  if (data.length > 0) {
    let temp :any[] =[];
    let datalen = data[0].measurements.length;

    for (let i = 0; i < datalen; i++) {
      let obj: objtype = {};
      for (let j = 0; j < data.length; j++) {
        if (data[j].measurements[i]) {
          obj[data[j].measurements[i].metric] = data[j].measurements[i].value;
          obj['at'] = new Date(data[j].measurements[i].at).toLocaleTimeString().replace(/:\d+ /, ' '); //change epoch to HH:MM AM/PM
        }
      }
      temp.push(obj);
    }
    return temp;
  } else {
    return [];
  }
};

const getMetrics = (state: IState) => {
  const getMultipleMeasurements = state.metricsgraph.getMultipleMeasurements;
  return {
    getMultipleMeasurements,
  };
};

const DisplayChart: React.FC<any> = (selected: valSelc) => {

  const dispatch = useDispatch();
  const getMultipleMeasurements = useSelector(getMetrics);
  const graphData = chartdata(getMultipleMeasurements.getMultipleMeasurements);
  const metList = getMultipleMeasurements.getMultipleMeasurements.map((metric: objtype) => {
    return metric.metric;
  });
  // Define graph colours based on metric
  const colorsObj: objtype = {
    watertemp: '#A52A2A',
    casingPressure: '#DAA520',
    flareTemp: '#A0522D',
    tubingPressure:'#800000',
    oilTemp: '#D2691E',
    injValvOpen:'#BC8F8F'
  };

  let area = metList.map((metrics: string) => {
    return <Line type="monotone" key={metrics} stroke={colorsObj[metrics]} dataKey={metrics} dot={false} isAnimationActive ={false} activeDot={{ r: 8 }} />;
  });

  let input: objtype[] = [];
  if (selected.selectedValue) {
    selected.selectedValue.forEach(item => {
      let selObj: objtype = {};
      selObj.metricName = item.value;
      selObj.after = current_time - 1800000;
      selObj.before = current_time;
      input.push(selObj);
    });
  }

  const [result] = useQuery({
    query,
    variables: {
      input,
    },
    pollInterval: 1300, // 1.3 seconds as per requirement
    requestPolicy:'network-only'
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.metricsDataRecevied(data));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return (
    <div>
      <ResponsiveContainer width="98%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" allowDataOverflow={true} />
        <YAxis domain={["auto", "auto"]} scale='linear' padding={{top:10, bottom:10}} tickCount={10} />
        <Tooltip />
        {area}
      </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DisplayChart;