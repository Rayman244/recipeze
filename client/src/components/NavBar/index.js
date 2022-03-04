// NavBar Component
//Navbar
import React, { useState } from "react";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import { Link } from 'react-router-dom';
import SignUp from '../SignUp'
import LogIn from '../Login'
import recipeZeLogo from '../../assets/recipeZe-logo.png';
import './styles.css'
import Auth from "../../utils/auth";

function NavBar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="NavBar mb-2">
    <>
        <Navbar expand="lg" className="navbar-custom">
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                alt=""
                src={recipeZeLogo}
                width="55"
                height="55"
                className="d-inline-block align-top"
              />{" "}

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/">Home</Nav.Link>
                {Auth.loggedIn() ? (
                  <>
                    <Nav.Link as={Link} to="/saved">
                      See Your Recipes
                    </Nav.Link>
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  </>
                ) : (
                  <Nav.Link onClick={() => setShowModal(true)}>
                    Login/Sign Up
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* set modal data up */}
        <Modal
          size="lg"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="signup-modal"
        >
          {/* tab container to do either signup or login component */}
          <Tab.Container defaultActiveKey="login">
            <Modal.Header closeButton>
              <Modal.Title id="signup-modal">
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link eventKey="login">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey="login">
                  <LogIn handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey="signup">
                  <SignUp handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </>
    </div>
  );
}

export default NavBar;
