import React from 'react';
import { Table } from "reactstrap";

function MakeRangeTable (props) {

    return (
        <React.Fragment>
                <Table striped size='sm' bordered id='readingTable'>
                    <thead>
                        <tr>
                            <th>
                                Reading Date
                            </th>
                            <th>
                                Average Reading
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map(dataItem => 
                        <tr>
                            <td>{dataItem.reading_date}</td>
                            <td>{dataItem.avg}</td>
                        </tr>
                        )
                        }
                    </tbody>
                </Table>
        </React.Fragment>
    );
}

export default MakeRangeTable;