import React from 'react';

function MakeRangeAverage(props) {

    function calcAverage() {
        let sum = 0;
        let len = props.data.length;
            props.data.map(dataItem => 
            sum += dataItem.avg
            )
        return (sum / len).toFixed(2);
    }

    function calcA1C() {
        return ((46.7 + parseFloat(calcAverage())) / 28.7).toFixed(2);
    }

    return(
        <React.Fragment>
            Average Glucose: {calcAverage()} <br />
            Approx. A1C: {calcA1C()}
        </React.Fragment>
    )
}

export default MakeRangeAverage;