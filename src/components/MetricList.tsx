import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../store/reducers/metricListReducer';
import { Provider, createClient, useQuery } from 'urql';
import DisplayChart from './DisplayBox';
import LastKnownMeasurement from './DisplayChart';
import { IState } from '../store';
import Select from 'react-select';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

type lType = {
  getMetrics: any;
};
interface objtype {
  [key: string]: any;
}
interface optType {
  value: string;
  label: string;
}
interface optTypeNull {
  label?: string | null;
  value?: string | null;
}


const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `query {getMetrics}`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  graphpaper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    background: '#f3f3f3',
    borderRadius: '0px'
  },
  sections: {
    display: 'flex',
    flexDirection: 'row',
    gap: '1px',
    paddingBottom: '0px !important'
  },
  graph: {
    paddingTop: '1px !important',
    borderRadius: '0px'
  },
  sectioncard: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: '#394250',
    boxShadow: 'none',
    borderRadius: '0px'
  }
}));



const getListDisplay = (state: IState) => {
  
  return state.metrics;

};

export default () => {
  return (
    <Provider value={client}>
      <ListOfEquipments />
    </Provider>
  );
};
 const ListOfEquipments: React.FC = () => {
  const classes = useStyles();
  let [selectedValue, onSelected] = useState<optTypeNull[]>([]);
  const dispatch = useDispatch();
  let optionsList: optType[] = [];

  const MetricListData: objtype = useSelector(getListDisplay);
  const option: lType = MetricListData.getMetrics;
  const optArr: string[] = option.getMetrics;
  
  
  if (optArr) {
    optArr.forEach((item: any) => {
      optionsList.push({ label: item, value: item });
    });
  }

  if (selectedValue) {
    selectedValue.map((item: objtype) => {
      return item.value;
    });
  }

  const selected = (val?: any) => {

    if (val) {
      let value: optTypeNull[] = val;
      onSelected(value);

    } else {
      onSelected([]);
    }
  };
   let MetricsList = <Select options={optionsList} isMulti onChange={selected} />;

  const [result] = useQuery({
    query,
  });
  const {data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.equipmentsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.equipmentsListDataRecevied(data));
  }, [dispatch, data, error]);

  return (
  
    <div className={classes.root}>
     <CssBaseline />
      <Container maxWidth="md">
        <Grid container justify="center" alignItems="center" spacing={3} >
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid item xs={5}>
             {MetricsList}
              </Grid>
            </Paper>
          </Grid>
          {selectedValue.length > 0 ? (
            <Grid item xs={12} className={classes.sections}>
              {selectedValue.map((item, index) => {
                return (
                  <Grid item xs key={index}>
                    <Paper className={classes.sectioncard}>
                      <LastKnownMeasurement selectedValue={item.value}></LastKnownMeasurement>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          ) : null}

          {selectedValue.length > 0 ? (
            <Grid item xs={12} className={classes.graph}>
              <Paper className={classes.graphpaper}>
                <DisplayChart selectedValue={selectedValue}></DisplayChart>
              </Paper>
          </Grid>
          ) : null}
        </Grid>
      </Container>
    </div>
  );
};

