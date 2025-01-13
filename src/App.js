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
function NavB({ isAdmin, setIsAdmin }) {
  const handleLogout = () => {
    setIsAdmin(false); // Wylogowanie
  };

  return (
    <Navbar className="bg-body-tertiary p-3">
      <h2>Sklepik szkolny</h2>
      <Form className="d-flex ms-auto">
        {isAdmin ? (
          <Button variant="danger" onClick={handleLogout}>
            Wyloguj się
          </Button>
        ) : (
          <Row>
            <Col>
              <Form.Control type="text" placeholder="Nazwa użytkownika" id="username" />
            </Col>
            <Col>
              <Form.Control type="password" placeholder="Hasło" id="password" />
            </Col>
            <Col>
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  const username = document.getElementById('username').value;
                  const password = document.getElementById('password').value;
                  if (username === 'admin' && password === 'admin') {
                    setIsAdmin(true); // Logowanie
                  } else {
                    alert('Nieprawidłowe dane logowania!');
                  }
                }}
              >
                Zaloguj
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </Navbar>
  );
}


// Wyświetlanie produktów
function ProductCard({ produkty, setProdukty, isAdmin, zamowienia, setZamowienia }) {
  // Funkcja do zamawiania produktu
  const zamowProdukt = (nazwaProduktu) => {
    const noweZamowienie = { produkt: nazwaProduktu, status: 'Zamówione' };
    setZamowienia([...zamowienia, noweZamowienie]);
  };

  return (
    <Container>
      <h2>Produkty:</h2>
      <div className="row">
        {produkty.map((produkt, index) => (
          <Card key={index} style={{ width: '20%' }} className="mx-3 mb-4">
            <Card.Body>
              <Card.Title>{produkt.nazwa}</Card.Title>
              <Card.Text>{produkt.opis}</Card.Text>
              <Card.Text>
                <strong>Status:</strong>{' '}
                {produkt.dostepnosc === 1 ? 'Produkt jest dostępny' : 'Produkt jest niedostępny'}
              </Card.Text>
              <div>
                {isAdmin && (
                  <Form.Check
                    type="checkbox"
                    id={`dostepnosc-${index}`}
                    label="Dostępny"
                    checked={produkt.dostepnosc === 1}
                    onChange={() =>
                      setProdukty(
                        produkty.map((p, i) =>
                          i === index ? { ...p, dostepnosc: p.dostepnosc === 1 ? 0 : 1 } : p
                        )
                      )
                    }
                  />
                )}
              </div>
              <Button
                variant="success"
                className="mt-2"
                onClick={() => zamowProdukt(produkt.nazwa)}
                disabled={produkt.dostepnosc === 0}
              >
                Zamów
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

// Sekcja Historia
function OrderHistory({ zamowienia, setZamowienia, isAdmin }) {
  // Funkcja do zmiany statusu zamówienia
  const zmienStatus = (index, nowyStatus) => {
    const noweZamowienia = [...zamowienia];
    noweZamowienia[index].status = nowyStatus;
    setZamowienia(noweZamowienia);
  };

  return (
    <Container>
      <h2>Zamówienia:</h2>
      {zamowienia.length === 0 ? (
        <p>Brak zamówień.</p>
      ) : (
        zamowienia.map((zamowienie, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Title>{zamowienie.produkt}</Card.Title>
              <Card.Text>
                <strong>Status:</strong>{' '}
                {isAdmin ? (
                  <Form.Select
                    value={zamowienie.status}
                    onChange={(e) => zmienStatus(index, e.target.value)}
                  >
                    <option value="Zamówione">Zamówione</option>
                    <option value="W trakcie realizacji">W trakcie realizacji</option>
                    <option value="Zrobione">Zrobione</option>
                  </Form.Select>
                ) : (
                  zamowienie.status
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}
// Panel Admina
function AdminDashboard({ produkty, setProdukty }) {
  const [nazwa, setNazwa] = useState('');
  const [opis, setOpis] = useState('');
  const [dostepnosc, setDostepnosc] = useState(false);

  // Obsługa dodawania produktów
  const dodajProdukt = (e) => {
    e.preventDefault();
    if (nazwa && opis) {
      const nowyProdukt = { nazwa, opis, dostepnosc: dostepnosc ? 1 : 0 };
      setProdukty([...produkty, nowyProdukt]);
      setNazwa('');
      setOpis('');
      setDostepnosc(false);
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
          <Form.Check
            type="checkbox"
            id="dostepnoscProduktu"
            label="Dostępny"
            checked={dostepnosc}
            onChange={(e) => setDostepnosc(e.target.checked)}
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
function ProductList({ produkty, setProdukty, isAdmin, zamowienia, setZamowienia }) {
  return (
    <Tabs defaultActiveKey="produkty" id="justify-tab-example" className="mb-3" justify>
      <Tab eventKey="produkty" title="Produkty">
        <ProductCard
          produkty={produkty}
          setProdukty={setProdukty}
          isAdmin={isAdmin}
          zamowienia={zamowienia}
          setZamowienia={setZamowienia}
        />
      </Tab>
      <Tab eventKey="historia" title="Historia Zamówień">
        <OrderHistory zamowienia={zamowienia} setZamowienia={setZamowienia} isAdmin={isAdmin} />
      </Tab>
      <Tab eventKey="admin" title="Panel Admina" disabled={!isAdmin}>
        <AdminDashboard produkty={produkty} setProdukty={setProdukty} />
      </Tab>
    </Tabs>
  );
}

function Footer() {
  return (
    <footer className="bg-body-tertiary text-center py-3 mt-auto">
      <p className="mb-0">Stronę przygotował Jakub Spendel</p>
    </footer>
  );
}


// Główna aplikacja
function App() {
  const [produkty, setProdukty] = useState([
    { nazwa: 'Chleb', opis: 'Bochenki chleba zwykłego', dostepnosc: 1 },
    { nazwa: 'Bułka', opis: 'Bułka pszenna', dostepnosc: 1 },
    { nazwa: 'Parówka', opis: 'Pojedyncza parówka do hot-dogów', dostepnosc: 0 },
  ]);

  const [zamowienia, setZamowienia] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavB isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <ProductList
        produkty={produkty}
        setProdukty={setProdukty}
        isAdmin={isAdmin}
        zamowienia={zamowienia}
        setZamowienia={setZamowienia}
      />
      <Footer />
    </div>
  );
}
export default App;
