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
function ProductCard({ produkty, zamowienia, setZamowienia }) {
  const [ilosc, setIlosc] = useState({});

  const zamow = (produkt) => {
    const zamowionaIlosc = ilosc[produkt.nazwa] || 1; // Domyślnie 1, jeśli użytkownik nie wybierze ilości
    const noweZamowienie = {
      nazwa: produkt.nazwa,
      opis: produkt.opis,
      ilosc: zamowionaIlosc,
      status: 'Zamówione',
    };
    setZamowienia([...zamowienia, noweZamowienie]);
  };

  const zmienIlosc = (produkt, value) => {
    setIlosc((prev) => ({ ...prev, [produkt.nazwa]: value }));
  };

  return (
    <Container>
      <h2>Produkty:</h2>
      <div className="d-flex flex-wrap">
        {produkty.map((produkt, index) => (
          <Card
            key={index}
            className="mb-3 mx-2"
            style={{ width: '18rem', fontSize: '0.9rem' }}
          >
            <Card.Body>
              <Card.Title>{produkt.nazwa}</Card.Title>
              <Card.Text style={{ fontSize: '0.8rem' }}>{produkt.opis}</Card.Text>
              <Card.Text>
                <strong>
                  {produkt.dostepnosc ? 'Produkt dostępny' : 'Produkt niedostępny'}
                </strong>
              </Card.Text>
              {produkt.dostepnosc ? (
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="1"
                    className="form-control form-control-sm me-2"
                    style={{ width: '4rem' }}
                    onChange={(e) =>
                      zmienIlosc(produkt, parseInt(e.target.value, 10))
                    }
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => zamow(produkt)}
                  >
                    Zamów
                  </Button>
                </div>
              ) : (
                <Button variant="secondary" size="sm" disabled>
                  Niedostępne
                </Button>
              )}
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
  const zmienStatus = (index, newStatus) => {
    const noweZamowienia = [...zamowienia];
    noweZamowienia[index].status = newStatus;
    setZamowienia(noweZamowienia);
  };

  return (
    <div>
      <h4>Zamówienia</h4>
      {zamowienia.length === 0 ? (
        <p>Nie złożono żadnych zamówień.</p>
      ) : (
        <ul className="list-group">
          {zamowienia.map((zamowienie, index) => (
            <li key={index} className="list-group-item">
              <strong>{zamowienie.nazwa}</strong> - {zamowienie.opis}
              <br />
              <strong>Ilość:</strong> {zamowienie.ilosc}
              <br />
              <strong>Status:</strong>{' '}
              {isAdmin ? (
                <Form.Select
                  value={zamowienie.status}
                  onChange={(e) =>
                    zmienStatus(index, e.target.value)
                  }
                >
                  <option value="Zamówione">Zamówione</option>
                  <option value="W trakcie realizacji">
                    W trakcie realizacji
                  </option>
                  <option value="Zrobione">Zrobione</option>
                </Form.Select>
              ) : (
                zamowienie.status
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
// Panel Admina
function AdminDashBoard({ produkty, setProdukty }) {
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
    <Tabs
      defaultActiveKey="produkty"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="produkty" title="Produkty">
        <ProductCard
          produkty={produkty}
          zamowienia={zamowienia}
          setZamowienia={setZamowienia}
        />
      </Tab>
      <Tab eventKey="zamowienia" title="Zamówienia">
        <OrderHistory
          zamowienia={zamowienia}
          setZamowienia={setZamowienia}
          isAdmin={isAdmin}
        />
      </Tab>
      {isAdmin && (
        <Tab eventKey="admin" title="Panel Admina">
          <AdminDashBoard produkty={produkty} setProdukty={setProdukty} />
        </Tab>
      )}
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
    { nazwa: 'Kanapka z szynką', opis: 'Świeżo przygotowana kanapka z pszennym pieczywem, plasterkami szynki i chrupiącą sałatą. Idealna na szybki lunch.', dostepnosc: 1 },
    { nazwa: 'Kanapka z serem', opis: 'Klasyczna kanapka z delikatnym serem żółtym i kawałkami pomidora. Smaczna i pożywna.', dostepnosc: 1 },
    { nazwa: 'Hot-dog klasyczny', opis: 'Ciepła bułka z parówką, dodatkiem ketchupu i musztardy. Szybka przekąska w każdej chwili.', dostepnosc: 0 },
    { nazwa: 'Tost z serem i szynką', opis: 'Gorący tost z chrupiącym pieczywem, roztopionym serem i plasterkami szynki. Serwowany na ciepło.', dostepnosc: 1 },
    { nazwa: 'Jogurt owocowy', opis: 'Naturalny jogurt z dodatkiem świeżych owoców sezonowych – truskawki, maliny i jagody.', dostepnosc: 0 },
    { nazwa: 'Ciastko czekoladowe', opis: 'Miękkie ciastko z kawałkami czekolady, które rozpływa się w ustach. Doskonałe jako deser lub słodka przekąska.', dostepnosc: 1 }
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
