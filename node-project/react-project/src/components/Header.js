import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
	return (
		<Navbar bg="light" data-bs-theme="light">
			<Container>
				<Navbar.Brand as={Link} to="/">
					LOGO
				</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link as={Link} to="/board">
						Board
					</Nav.Link>
					<Nav.Link as={Link} to="/login">
						Log in
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
}

export default Header;
