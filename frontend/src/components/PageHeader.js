import {Jumbotron, Container, NavItem, Navbar, NavLink, NavbarBrand, Nav, Button } from 'reactstrap';
import { Link } from 'react-router-dom';


function PageHeader(props) {
    if (sessionStorage.getItem('isLoggedIn')) {
        return (
            <header>
                <Navbar fixed expand="md" style={{backgroundColor: "lavender"}}>
                        <NavbarBrand className="text-dark" href='/'>Glucose/A1c Tracker</NavbarBrand>
                            <Nav className="mr-auto" navbar>
                            </Nav>
                            <Nav>
                                <NavLink href="/addreading" className="nav-link text-dark" active>Add Glucose Reading</NavLink>
                                <NavLink href="/viewreadings" className="nav-link text-dark" active>View Readings</NavLink>
                                <Button tag={Link} to="/logout" className="mx-auto mb-3" variant="outline-dark" style={{backgroundColor: "lavender", color: "black"}}>
                                    Log Out
                                </Button>
                            </Nav>
                </Navbar>
            
                <Jumbotron fluid style={{backgroundColor: "lavender", height: "150px"}}>
                    <Container fluid>
                        <h1 className="display-3">{props.children}</h1>
                    </Container>
                </Jumbotron>
            </header>
        )
    }
    else {
        return(
        <header>
            <Navbar fixed expand="md" style={{backgroundColor: "lavender"}}>
                    <NavbarBrand className="text-dark" href='/'>Glucose/A1c Tracker</NavbarBrand>
                        <Nav className="mr-auto container-fluid" navbar>
                            <NavItem className="ml-auto"> 
                                {/* <Link to="/login" className="nav-link text-dark" active>Log In</Link> */}
                                <Button tag={Link} to="/login" className="mx-auto mb-3 ml-3" variant="outline-dark" style={{backgroundColor: "lavender", color: "black"}}>
                                    Log In
                                </Button>
                                &nbsp;&nbsp;or&nbsp;&nbsp;
                                <Button tag={Link} to="/register" className="mx-auto mb-3" variant="outline-dark" style={{backgroundColor: "lavender", color: "black"}}>
                                    Sign Up
                                </Button>
                            </NavItem>
                        </Nav>
            </Navbar>
        
        <Jumbotron fluid style={{backgroundColor: "lavender", height: "150px"}}>
            <Container fluid>
                <h1 className="display-3">{props.children}</h1>
            </Container>
        </Jumbotron>
    </header>
    
    )
}}

export default PageHeader;