import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';

// Nawigacja
function NavB() {
  return (
    <Navbar className="bg-body-tertiary p-3">
      <h2>Sklepik szkolny</h2>
      <Form>
        <Row>
          <Col>
            <Form.Control type="text" placeholder="Nazwa użytkownika" />
          </Col>
          <Col>
            <Form.Control type="password" placeholder="Hasło" />
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Zaloguj
            </Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

// Wyświetlanie produktów
function Produkty({ produkty }) {
  return (
    <Container>
      <h2>Produkty:</h2>
      <div className="d-flex justify-content-around">
        {produkty.map((produkt, index) => (
        <Card key={index} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{produkt.nazwa}{' '}</Card.Title>
            <Card.Text> {produkt.opis}  </Card.Text>
            <Card.Text> <h6>Ilość: {produkt.ilosc} </h6></Card.Text>
          </Card.Body>
        </Card>
        ))}
        </div>
      </Container>
  );
}

// Sekcja Zamówienia
function Zamowienia() {
  return (
    <div>
      <h4>Składanie zamówień</h4>
      <p>Funkcja składania zamówień jeszcze nie została zaimplementowana.</p>
    </div>
  );
}

// Sekcja Historia
function Historia() {
  return (
    <div>
      <h4>Historia zamówień</h4>
      <p>Historia zamówień będzie dostępna wkrótce.</p>
    </div>
  );
}

// Panel Admina
function Admin({ produkty, setProdukty }) {
  const [nazwa, setNazwa] = useState('');
  const [ilosc, setIlosc] = useState('');
  const [opis, setOpis] = useState('');

  // Obsługa dodawania produktów
  const dodajProdukt = (e) => {
    e.preventDefault();
    if (nazwa && ilosc && opis) {
      const nowyProdukt = { nazwa, ilosc: parseInt(ilosc, 10), opis };
      setProdukty([...produkty, nowyProdukt]);
      setNazwa('');
      setIlosc('');
      setOpis('');
    }
  };

  return (
    <div className="container mt-5">
      <h4>Dodawanie produktów</h4>
      <form onSubmit={dodajProdukt} className="p-3 border rounded bg-light">
        <div className="mb-3">
          <label htmlFor="nazwaProduktu" className="form-label">
            Nazwa produktu
          </label>
          <input
            type="text"
            className="form-control"
            id="nazwaProduktu"
            value={nazwa}
            onChange={(e) => setNazwa(e.target.value)}
            placeholder="Wprowadź nazwę produktu"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="opisProduktu" className="form-label">
            Opis produktu
          </label>
          <textarea
            className="form-control"
            id="opisProduktu"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            placeholder="Wprowadź opis produktu"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="iloscProduktu" className="form-label">
            Ilość
          </label>
          <input
            type="number"
            className="form-control"
            id="iloscProduktu"
            value={ilosc}
            onChange={(e) => setIlosc(e.target.value)}
            placeholder="Wprowadź ilość"
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Dodaj produkt
        </button>
      </form>
    </div>
  );
}

// Główna zawartość (karty)
function MainContent({ produkty, setProdukty }) {
  return (
    <Tabs
      defaultActiveKey="produkty"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="produkty" title="Produkty">
        <Produkty produkty={produkty} />
      </Tab>
      <Tab eventKey="zamowienia" title="Składanie Zamówień">
        <Zamowienia />
      </Tab>
      <Tab eventKey="historia" title="Historia Zamówień">
        <Historia />
      </Tab>
      <Tab eventKey="admin" title="Panel Admina">
        <Admin produkty={produkty} setProdukty={setProdukty} />
      </Tab>
    </Tabs>
  );
}

// Główna aplikacja
function App() {
  const [produkty, setProdukty] = useState([]);

  return (
    <div>
      <NavB />
      <MainContent produkty={produkty} setProdukty={setProdukty} />
    </div>
  );
}

export default App;
