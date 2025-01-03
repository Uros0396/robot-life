Questo e' il link per il Frontend: https://github.com/Uros0396/ROBOT-LIFE-FRONTEND
Qua il VIDEO del mio progetto: https://www.loom.com/share/8af9755028f446dbbf8fc1c09ef37b2b?sid=481e75f4-e9c1-482b-9856-69c6f20bfb9d   

ROBOTLIFE

# Ecommerce Robotica - README

## Descrizione del Progetto

Questo progetto è un ecommerce dedicato alla vendita online di robot, stampanti 3D e accessori per la robotica.
Il sito prevede due tipi di utenti:

- **Admin**: solo l'admin (io) può gestire i prodotti.
- **User**: gli utenti possono registrarsi o effettuare il login per accedere ai dettagli dei prodotti e completare gli acquisti.

### Funzionalità Principali

- **Accesso Utente**:

  - Possibilità di login tradizionale o tramite Google.
  - Gestione della sessione utente basata su token JWT tramite l'hook `useSession`.

- **Prodotti e Dettagli**:

  - Gli utenti devono essere registrati per accedere ai dettagli dei prodotti.
  - Implementazione di `ProtectedRoutes` per proteggere le pagine _Details_ e il componente _Cart_.

- **Ricerca Prodotti**:

  - Campo di ricerca nella navbar della homepage.
  - Risultati visibili in fondo alla homepage, visualizzati nel componente `MainComponent`.

- **Carrello**:

  - Gestito tramite `cartSlice` in Redux.
  - Middleware `validationPayment` per validare i pagamenti.
  - Notifiche con SweetAlert per confermare aggiunte al carrello.

- **Commenti**:

  - Gli utenti possono inviare commenti sui prodotti nella pagina _Details_.
  - `commentSlice` gestisce la logica per l'invio (`POST`) tramite il componente e la visualizzazione (`GET`) dei commenti e' in details `CommentForm`.

- **Messaggi di Supporto**:
  - Integrazione di SendGrid per consentire agli utenti di inviare messaggi nel caso di prodotti guasti tramite il componente `ContactForm`.

### Tecnologie Utilizzate

#### Frontend:

- **Librerie e Framework**:

  - React
  - Redux
  - SweetAlert
  - Bootstrap
  - CSS
  - lucide
  - Bootstrap react icons

- **Gestione Stato**:
  - Redux con i reducer:
    - `detProductReducer` per ottenere i prodotti (usato in _CategoryPages_).
    - `cartSlice` per il carrello.
    - `commentSlice` per i commenti.

#### Backend:

- **Tecnologie**:

  - Node.js
  - Express
  - MongoDB
  - Cloudinary per la gestione delle immagini.

- **Modelli**:

  - `Product`, `User`, `Order`, `Comment`.

- **Rotte**:

  - Login
  - Google
  - Comments
  - Order
  - Products
  - SendGrid
  - User

- **Middleware**:
  - 8 middleware, inclusi:
    - `authAdminMiddleware` per autorizzare solo l'admin alla creazione di nuovi prodotti.
    - `validationPayment` per gestire la validazione dei pagamenti.(frontend)

#### Strumenti di Sviluppo

- Postman: utilizzato per creare i prodotti (solo dall'admin).

### Altre Informazioni

Tutti i prodotti e i dettagli sono stati caricati dall'admin tramite Postman. Gli utenti non possono aggiungere nuovi prodotti grazie al middleware di autenticazione per
admin.

# Variabili d' ambiente backend:

DB_URI

DEBUG_MODE

JWT_SECRET
VITE_STRIPE_SECRET_KEY

CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET
CLOUDINARY_CLOUD_NAME

SENDGRID_API_KEY

SENDER_EMAIL

googleapi

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

GOOGLE_CALLBACK_URL

FRONTEND_URL

# Variabili d' ambiente frontend:
VITE_SERVER_BASE_URL



### Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/Uros0396/ROBOT-LIFE-FRONTEND
   ```
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Configura le variabili d'ambiente per:

   - MongoDB
   - SendGrid
   - Cloudinary

4. Avvia il progetto:
   ```bash
   npm run start
   ```

### Crediti

Progetto sviluppato da Uros Milenkovic.
