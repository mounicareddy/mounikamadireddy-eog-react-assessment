## Create React App Visualization

This assessment was bespoke handcrafted for MounikaMadireddy.

Read more about this assessment [here](https://react.eogresources.com)

## GRAPHQL queries

<u>getWeatherForLocation</u>

query($latLong: WeatherQuery!) {
  getWeatherForLocation(latLong: $latLong) {
    description
    locationName
    temperatureinCelsius
  }
}

Query Variables:
{
  "latLong": {
    "latitude":29.7604,
    "longitude": -95.3698
  }
}

Response:
{
  "data": {
    "getWeatherForLocation": {
      "description": "Clear",
      "locationName": "Houston",
      "temperatureinCelsius": 33.81
    }
  }
}

<u>getMetrics</u>

query {
  getMetrics
}

Response:
{
  "data": {
    "getMetrics": [
      "flareTemp",
      "waterTemp",
      "casingPressure",
      "oilTemp",
      "tubingPressure",
      "injValveOpen"
    ]
  }
}

<u>heartBeat</u>

query {
  heartBeat
}

Response:
{
  "data": {
    "heartBeat": 1597427277053
  }
}


<u> getMeasurements </u>

query($input: MeasurementQuery!) {

  getMeasurements(input: $input) {
    metric
    at
    value
    unit
  }
}

Query Variables:

{
  "input":{
    "metricName":"flareTemp",
    "after":1597427277053,
    "before":1597427341776
  } 
}

Response:

{
  "data": {
    "getMeasurements": [
      {
        "metric": "flareTemp",
        "at": 1597432395633,
        "value": 143.05,
        "unit": "F"
      },
      {
        "metric": "flareTemp",
        "at": 1597432396933,
        "value": 123.47,
        "unit": "F"
      }
]
}
}

<u> getLastKnownMeasurement </u>

query($metricName: String!) {

  getLastKnownMeasurement(metricName: $metricName) {
    metric
    at
    value
    unit
  }
}

Query variables:

{
    "metricName":"flareTemp"  
}

Response:

{
  "data": {
    "getLastKnownMeasurement": {
      "metric": "flareTemp",
      "at": 1597445011787,
      "value": 896.04,
      "unit": "F"
    }
  }
}

<u> getMultipleMeasurements </u>

query($input: [MeasurementQuery]!) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
  }
}

Query Variables

{
    "input":[{
      "metricName": "waterTemp",
      "after": 1597399201000,
      "before": 1597446779776
    },
      {
      "metricName": "flareTemp",
      "after": 1597399201000,
      "before": 1597446779776
      }
    ]
    }

Response:

{
  "data": {
    "getMultipleMeasurements": [
      {
        "metric": "waterTemp",
        "measurements": [
          {
            "metric": "waterTemp",
            "at": 1597432395633,
            "value": 48.67,
            "unit": "F"
          },
          {
            "metric": "waterTemp",
            "at": 1597432396933,
            "value": 37.14,
            "unit": "F"
          },
]
},
{
        "metric": "flareTemp",
        "measurements": [
          {
            "metric": "flareTemp",
            "at": 1597432395633,
            "value": 143.05,
            "unit": "F"
          },
          {
            "metric": "flareTemp",
            "at": 1597432396933,
            "value": 123.47,
            "unit": "F"
          }
]
}
}


