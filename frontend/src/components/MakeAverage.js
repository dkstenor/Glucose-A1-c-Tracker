import React from 'react';

function MakeAverage(props) {

    function calcAverage() {
        let sum = 0;
        let len = props.data.length;
            props.data.map(dataItem => 
            sum += dataItem.my_reading
            )
        return (sum / len).toFixed(2);
    }
    
    return(
        <React.Fragment>
            Average Glucose: {props.data.avg}
            
        </React.Fragment>
    )
}

export default MakeAverage;