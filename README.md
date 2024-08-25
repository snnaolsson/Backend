**Repositoryt innehåller ett REST API byggt med Express. APIet hanterar tre MongoDB-tabeller: användare, bokningar och menyalternativ.**

**Installation**
- Klona ned källkodsfilerna.
- Kör kommandot npm install för att installera de npm-paket som behövs.
- Skapa en .env-fil i rotmappen med dina miljövariabler för MongoDB och JWT-nyckel.
- Kör kommandot node server eller npm start för att starta servern.
**Användning**
För att nå API
, använd http://127.0.0.1:3005/api eller http://localhost:3005/api.

**Routes:**
Användarhantering

Skapa användare: /users/register (POST)
Logga in: /users/login (POST)
Skyddad route: /users/protected (GET)
Menyhantering

Skapa menyalternativ: /api/menu (POST)
Hämta alla menyalternativ: /api/menu (GET)
Uppdatera menyalternativ: /api/menu/:id (PUT)
Radera menyalternativ: /api/menu/:id (DELETE)
Bokningshantering

Skapa bokning: /api/bookings (POST)
Hämta alla bokningar: /api/bookings (GET)
Uppdatera bokning: /api/bookings/:id (PUT)
Radera bokning: /api/bookings/:id (DELETE)
