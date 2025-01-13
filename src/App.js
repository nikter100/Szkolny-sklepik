import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';

// Nawigacja
function NavB({ setIsAdmin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAdmin(true);
      alert('Zalogowano jako admin!');
    } else {
      alert('Niepoprawne dane logowania!');
    }
  };

  return (
    <Navbar className="bg-body-tertiary p-3">
      <h2>Sklepik szkolny</h2>
      <Form className="d-flex ms-auto" onSubmit={handleLogin}>
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Nazwa użytkownika"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
function Produkty({ produkty, setProdukty, isAdmin }) {
  // Grupowanie produktów w tablice po 5 elementów
  const grupyProduktow = [];
  for (let i = 0; i < produkty.length; i += 5) {
    grupyProduktow.push(produkty.slice(i, i + 5));
  }

  // Funkcja do usuwania produktu
  const usunProdukt = (indexDoUsuniecia) => {
    setProdukty(produkty.filter((_, index) => index !== indexDoUsuniecia));
  };

  return (
    <Container>
      <h2>Produkty:</h2>
      {grupyProduktow.map((grupa, indexGrupy) => (
        <div key={indexGrupy} className="d-flex justify-content-around mb-4">
          {grupa.map((produkt, indexProduktu) => {
            const indexGlobalny = indexGrupy * 5 + indexProduktu; // Obliczenie indeksu w oryginalnej tablicy
            return (
              <Card key={indexGlobalny} style={{ width: '20%' }} className="mx-3">
                <Card.Body>
                  <Card.Title>{produkt.nazwa}</Card.Title>
                  <Card.Text>{produkt.opis}</Card.Text>
                  <Card.Text>
                    <h6>Ilość: {produkt.ilosc}</h6>
                  </Card.Text>
                  {isAdmin && (
                    <Button
                      variant="danger"
                      onClick={() => usunProdukt(indexGlobalny)}
                    >
                      Usuń produkt
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ))}
    </Container>
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
function Zawartosc({ produkty, setProdukty, isAdmin }) {
  return (
    <Tabs
      defaultActiveKey="produkty"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="produkty" title="Produkty" >
        <Produkty produkty={produkty} setProdukty={setProdukty} isAdmin={isAdmin} />
      </Tab>
      <Tab eventKey="historia" title="Historia Zamówień">
        <Historia />
      </Tab>
      <Tab eventKey="admin" title="Panel Admina" disabled={!isAdmin}>
        <Admin produkty={produkty} setProdukty={setProdukty} />
      </Tab>
    </Tabs>
  );
}

// Główna aplikacja
function App() {
  const [produkty, setProdukty] = useState([
    { nazwa: 'Chleb', ilosc: 10, opis: 'Bochenki chleba zwykłego' },
    { nazwa: 'Bułka', ilosc: 23, opis: 'Bułka wykorzystywana do robienia różnych rodzajów bułek' },
    { nazwa: 'Bułka hotdogowa', ilosc: 30, opis: 'Bochenki chleba zwykłego' },
    { nazwa: 'Ser żółty', ilosc: 20, opis: 'Liczone w paczkach, paczka zawiera 10 plasterków. Przydatny do robienia kanapek oraz bułek i tostów' },
    { nazwa: 'Szynka', ilosc: 16, opis: 'Liczone w paczkach, paczka zawiera 12 plasterków. Przydatna do robienia kanapek oraz bułek i tostów' },
    { nazwa: 'Parówka', ilosc: 28, opis: 'Pojedyncza parówka. Używa się jej do robienia hot-dogów' },
  ]);

  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      <NavB setIsAdmin={setIsAdmin} />
      <Zawartosc produkty={produkty} setProdukty={setProdukty} isAdmin={isAdmin} />
    </div>
  );
}

export default App;
