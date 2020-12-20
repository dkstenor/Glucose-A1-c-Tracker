import {Jumbotron, Container, NavItem, Navbar, NavbarBrand, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';


function PageHeader(props) {

    return(
    <header>
        <Navbar fixed expand="md" style={{backgroundColor: "lavender"}}>
                <NavbarBrand className="text-dark" href='/'>Glucose/A1c Tracker</NavbarBrand>
                    <Nav className="mr-auto container-fluid" navbar>
                        <NavItem>
                            <Link to="/" className="nav-link text-dark" active >Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/login" className="nav-link text-dark" active >Login</Link>
                        </NavItem>                        <NavItem>
                            <Link to="/postreadings" className="nav-link text-dark" active>Add Glucose Reading</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/viewreadings" className="nav-link text-dark" active>View Readings</Link>
                        </NavItem>
                        <NavItem className="ml-auto"> 
                            <Link to="/adduser" className="nav-link text-dark" active>Sign up</Link>
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
}

export default PageHeader;