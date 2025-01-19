# Ecommerce Robotica - README
LINK FRONTEND: https://github.com/Uros0396/ROBOT-LIFE-FRONTEND
## Descrizione del Progetto
Questo progetto è un ecommerce dedicato alla vendita online di robot, stampanti 3D e accessori per la robotica. 
Il sito prevede due tipi di utenti:
- **Admin**: solo l'admin (io) può gestire i prodotti.
- **User**: gli utenti possono registrarsi o effettuare il login per accedere ai dettagli dei prodotti, completare gli acquisti e lasciare commenti ai prodotti.

### Funzionalità Principali
- **Accesso Utente**: 
  - Possibilità di login tradizionale o tramite Google.
  - Gestione della sessione utente basata su token JWT tramite l'hook `useSession`.

- **Prodotti e Dettagli**:
  - Gli utenti devono essere registrati per accedere ai dettagli dei prodotti.
  - Implementazione di `ProtectedRoutes` per proteggere le pagine *Details* e il componente *Cart*.

- **Ricerca Prodotti**:
  - Campo di ricerca nella navbar della homepage.
  - Risultati visibili in fondo alla homepage, visualizzati nel componente `MainComponent`.

- **Carrello**:
  - Gestito tramite `cartSlice` in Redux.
  - Middleware `validationPayment` per validare i pagamenti.
  - Notifiche con SweetAlert per confermare aggiunte al carrello.

- **Commenti**:
  - Gli utenti possono inviare commenti sui prodotti nella pagina *Details*.
  - `commentSlice` gestisce la logica per l'invio (`POST`) e la visualizzazione (`GET`) dei commenti tramite il componente `CommentForm`.

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

- **Gestione Stato**:
  - Redux con i reducer:
    - `getProductReducer` per ottenere i prodotti (usato in *CategoryPages*).
    - `cartSlice` per il carrello.
    - `commentSlice` per i commenti.

#### Backend:
- **Tecnologie**:
  - Node.js
  - Express
  - MongoDB
  - Cloudinary per la gestione delle immagini
  - Tecnologia

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
    - `validationPayment` per gestire la validazione dei pagamenti.

#### Strumenti di Sviluppo
- Postman: utilizzato per creare i prodotti (solo dall'admin).

### Altre Informazioni
Tutti i prodotti e i dettagli sono stati caricati dall'admin tramite Postman. Gli utenti non possono aggiungere nuovi prodotti grazie al middleware di autenticazione per admin.

### Installazione
1. Clona il repository:
   ```bash
   git clone <repository-url>
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
