import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap";
import PageHeader from "./PageHeader";

function ViewReadingsPage() {

  return (
    <React.Fragment>
      <PageHeader>Display Glucose Readings</PageHeader>
      <Container>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">View Single Day</CardTitle>
                <CardText>
                  View glucose readings from a single day. This options displays
                  a table of readings and a graph of your readings from the
                  selected day.
                  <br />
                  <br />
                  <br />
                </CardText>
              </CardBody>
              <Link
                to="/getdatedata"
                className="btn btn-primary mx-auto mb-3"
                variant="outline-dark"
                style={{ backgroundColor: "lavender", color: "black" }}
              >Select Date
              </Link>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Display Date Range</CardTitle>
                <CardText>
                  View glucose readings from a selected date range. This option
                  displays a table showing your average glucose reading for each
                  day in the selected range and a graph of these averages. In
                  addition, the approximate A1C value computed from the selected
                  range will be displayed.
                </CardText>
              </CardBody>
              <Link
                to="/getrangedata"
                className="btn btn-primary mx-auto mb-3"
                variant="outline-dark"
                style={{ backgroundColor: "lavender", color: "black" }}
              >Select Date Range
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default ViewReadingsPage;
