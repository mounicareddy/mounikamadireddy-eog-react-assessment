import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { actions } from '../store/reducers/displayChartReducer';
import { useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface objtype {
  [key: string]: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      display: 'flex',
      padding: '0',
      flexDirection: 'column',
      textAlign: 'left'
    },
    number: {
      display: 'block',
      fontSize: '28px',
      fontWeight: 'bold',
      letterSpacing: '0px',
      color: '#ddd'
    },
    text: {
      display: 'block',
      fontSize: '12px',
      textTransform: 'capitalize',
      fontWeight: 'normal',
      color: '#fff',
      letterSpacing: '2px'
    },
  }),
);
export interface myArray {
  myArray: any[];
}

const query = `query($metricName: String!) {
    getLastKnownMeasurement(metricName: $metricName) {
        metric
        at
        value
        unit
      }
}`;


const Item: React.FC<any> = (selectedValue: objtype) => {
  const classes = useStyles();
  let [metricValue, onmetricSelected] = useState<objtype>({});
  const dispatch = useDispatch();
  const [result] = useQuery({
    query,
    variables: {
      metricName: selectedValue.selectedValue,
    },
    pollInterval: 1300, // 1.3 seconds as per requirement
    requestPolicy:'network-only'
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.lastKnownMeasurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    onmetricSelected(data.getLastKnownMeasurement);
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return <div className={classes.section}>
    <span className={classes.text}>{metricValue ? metricValue.metric : null}</span>
    <span className={classes.number}>{metricValue ? `${metricValue.value}F` : null}</span>
  </div>;
};
export default Item;
