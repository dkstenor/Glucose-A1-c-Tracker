import React from 'react';
import { Link } from 'react-router-dom';

function NewReading() {
    return (
    <Link
        to="/viewreadings"
        className="btn btn-primary mx-auto mb-3"
        variant="outline-dark"
        style={{ backgroundColor: "lavender", color: "black" }}
        >Display Another Reading
    </Link>
    )
    }

export default NewReading;