import React from 'react';

function MakeRangeAverage(props) {

    function calcA1C() {
        return ((46.7 + props.data.avg) / 28.7).toFixed(2);
    }

    return(
        <React.Fragment>
            Average Glucose: {props.data.avg} <br />
            Approx. A1C: {calcA1C()}
        </React.Fragment>
    )
}

export default MakeRangeAverage;