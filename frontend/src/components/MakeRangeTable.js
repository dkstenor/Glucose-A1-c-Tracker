import React from 'react';
import { Table } from "reactstrap";

function MakeRangeTable (props) {

    return (
        <React.Fragment>
                <Table striped size='sm' bordered id='readingTable'>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>
                                Reading Date
                            </th>
                            <th style={{textAlign: 'center'}}>
                                Average Reading
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.ret.map(dataItem => 
                        <tr>
                            <td style={{textAlign: 'center'}}>{dataItem.reading_date}</td>
                            <td style={{textAlign: 'center'}}>{dataItem.day_avg.toFixed(2)}</td>
                        </tr>
                        )
                        }
                    </tbody>
                </Table>
        </React.Fragment>
    );
}

export default MakeRangeTable;