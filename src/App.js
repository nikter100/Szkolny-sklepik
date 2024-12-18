import './App.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function NavB() {
  return (
    <Navbar className="bg-body-tertiary">
      <h2>Sklepik szkolny</h2>
      <Form>
        <Row>
          <Col><Form.Control type="email" placeholder="Nazwa Użytkownika" /></Col>
          <Col><Form.Control type="password" placeholder="Hasło" /></Col>
          <Col><Button variant="primary" type="submit"> Zaloguj </Button></Col>
        </Row>
      </Form>
    </Navbar>
  );
}
function Produkty(){
  return (
    <div>
      Tutaj będą produkty
    </div>
  );
}
function Zamowienia(){
  return (
    <div>
      Tutaj będą Zamówienia
    </div>
  );
}

function Historia(){
  return (
    <div>
      Tutaj będzie historia
    </div>
  );
}
function Admin(){
  return (
    <div>
      Profil Admina
    </div>
  );
}

function MainContent() {
  return (
    <Tabs
      defaultActiveKey="produkty"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="produkty" title="Produkty">
        <Produkty />
      </Tab>
      <Tab eventKey="zamowienia" title="Składanie Zamówień">
        <Zamowienia />
      </Tab>
      <Tab eventKey="historia" title="Historia Zamówień">
        <Historia />
      </Tab>
      <Tab eventKey="admin" title="Profil Admina" disabled>
        <Admin />
      </Tab>
    </Tabs>
  );
}



function App() {
  return (
    <div>
      <NavB />
      <MainContent />

    </div>
  );
}

export default App;
