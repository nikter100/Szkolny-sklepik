
# Sklepik Szkolny

Aplikacja React do zarządzania produktami w sklepiku szkolnym, umożliwiająca przeglądanie, zamawianie, i administrowanie produktami. Aplikacja wykorzystuje React Bootstrap do stylizacji oraz stan komponentów do zarządzania danymi.

# Funkcjonalności

Ogólnodostępne funkcje:
	•	Przeglądanie produktów:
	•	Wyświetlanie listy produktów w kartach.
	•	Informacja o dostępności produktu (Dostępny/Niedostępny).
	•	Wyświetlanie ceny produktu zaokrąglonej do 2 miejsc po przecinku.
	•	Składanie zamówień:
	•	Możliwość wybrania ilości zamawianego produktu z listy rozwijanej.
	•	Wyświetlanie sumy zamówienia w podsumowaniu.
	•	Historia zamówień:
	•	Wyświetlanie wszystkich złożonych zamówień wraz z ich statusami.
	•	Status zamówienia (np. Zamówione, W trakcie realizacji, Zrobione).

Funkcje dostępne dla administratora:
	•	Logowanie do panelu administratora:
	•	Login: admin
	•	Hasło: admin
	•	Zarządzanie produktami:
	•	Dodawanie nowych produktów (nazwa, opis, cena, dostępność).
	•	Zmiana dostępności produktów w czasie rzeczywistym za pomocą checkboxów.
	•	Ustawianie cen podczas dodawania produktów.
	•	Usuwanie produktów.
	•	Zarządzanie zamówieniami:
	•	Zmiana statusu zamówienia w historii zamówień za pomocą listy rozwijanej.

# Instalacja

Aby uruchomić projekt lokalnie, wykonaj następujące kroki:
	1.	Sklonuj repozytorium:

git clone https://github.com/twoj-uzytkownik/sklepik-szkolny.git
cd sklepik-szkolny


	2.	Zainstaluj zależności:

npm install


	3.	Uruchom projekt:

npm start


	4.	Otwórz przeglądarkę i przejdź do http://localhost:3000, aby zobaczyć aplikację.

Użyte technologie
	•	React: Framework do budowy interfejsu użytkownika.
	•	React Bootstrap: Biblioteka do łatwego stylizowania komponentów.
	•	CSS: Drobne dostosowania stylów.

# Wygląd aplikacji

Widok użytkownika:
	•	Produkty wyświetlane w formie kart.
	•	Możliwość składania zamówień i podgląd statusu w zakładce “Historia zamówień”.

Widok administratora:
	•	Logowanie do panelu administratora.
	•	Dodawanie nowych produktów.
	•	Zmiana dostępności i usuwanie produktów.
	•	Zarządzanie statusem zamówień.

Stopka

Aplikacja zawiera stopkę z napisem:

	“Stronę przygotował Jakub Spendel”

Stopka jest zawsze widoczna na dole strony.

# Autor

Projekt przygotowany przez Jakuba Spendel
