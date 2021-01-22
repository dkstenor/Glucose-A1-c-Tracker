import React from 'react';
import { Table } from "reactstrap";

function MakeTable (props) {

    function tConv24(time24) {
        var ts = time24;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
        var ampm = H < 12 ? " AM" : " PM";
        ts = h + ts.substr(2, 3) + ampm;
        return ts;
      };

    return (
        <React.Fragment>
            {console.log(props)}
                <Table responsive striped size='sm' bordered id='readingTable'>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>
                                Reading Time
                            </th>
                            <th style={{textAlign: 'center'}}>
                                Reading
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.ret.map(dataItem => 
                        <tr>
                            <td style={{textAlign: 'center'}}>{tConv24(dataItem.reading_time)}</td>
                            <td style={{textAlign: 'center'}}>{dataItem.my_reading}</td>
                        </tr>
                        )
                        }
                    </tbody>
                </Table>
        </React.Fragment>
    );
}

export default MakeTable;