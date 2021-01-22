import React from 'react';

function MakeAverage(props) {

    return(
        <React.Fragment>
            Average Glucose: {props.data.avg}
            
        </React.Fragment>
    )
}

export default MakeAverage;