## Create React App Visualization

This assessment was bespoke handcrafted for MounikaMadireddy.

Read more about this assessment [here](https://react.eogresources.com)

## Installation
git clone https://github.com/mounicareddy/mounikamadireddy-eog-react-assessment.git

cd mounikamadireddy-eog-react-assessment.git

yarn install

## Modules Used

* material-ui
* graphql
* react-multi-select-component
* recharts

## Overview

<img src="./Dashboard.PNG"/>



## Ways to optimize
* Using Subscriptions instead of polling
## Status on subscription
1. Get selected measuremnt data from multiplemeasurements query
2. use subscription query to get new data and appened newMeasurement to data after chartdata function
* Issues with my approach
if subscribed to newMeasurement data, i am unable to figure out a way to filter out if that newMaesurement metric is present in user selected metrics then only i have to add that to data if not ignore newMeasurement since user didn't select



## References
* http://recharts.org/en-US/
* https://material-ui.com/
* https://reactjs.org/docs/hooks-intro.html

