ROBOT-LIFE E-Commerce - README

Frontend LINK: https://robot-life-frontend.vercel.app/

Frontend GitHub LINK: https://github.com/Uros0396/ROBOT-LIFE-FRONTEND

Project Description
This project is an e-commerce platform dedicated to the online sale of robots, 3D printers, and robotics accessories.
The website features two types of users:

Admin: Only the admin (me) can manage the products.
User: Users can register or log in to access product details, complete purchases, and leave product comments.
Main Features
User Login:

Traditional login or login via Google.
User session management based on JWT token using the useSession hook.
Products and Details:

Users must be registered to access product details.
Implementation of ProtectedRoutes to protect the Details page and the Cart component.
Product Search:

A search field in the navbar of the homepage.
Search results are displayed at the bottom of the homepage within the MainComponent.  

Shopping Cart:
Managed using cartSlice in Redux.
validationPayment middleware to validate payments.
SweetAlert notifications to confirm items added to the cart.

Comments:
Users can leave comments on products on the Details page.
commentSlice handles the logic for submitting (POST) and displaying (GET) comments via the CommentForm component.
Support Messages:

SendGrid integration allows users to send messages in case of defective products via the ContactForm component.
Technologies Used
Frontend:
Libraries & Frameworks:

React
Redux
SweetAlert
Bootstrap
CSS
Stripe

State Management:

Redux with the following reducers:
getProductReducer for fetching products (used in CategoryPages).
cartSlice for managing the shopping cart.
commentSlice for managing comments.

Backend:
Technologies:

Node.js
Express
MongoDB
Cloudinary for image management
SendGrid
Stripe

Models:
Product, User, Order, Comment.

Routes:
Login
Google
Comments
Order
Products
SendGrid
User
Middleware:

8 middleware functions, including:
authAdminMiddleware to authorize only the admin to create new products.
validationPayment to manage payment validation.
Development Tools
Postman: Used for creating products (only by the admin).

Additional Information
All products and details were uploaded by the admin using Postman. Users cannot add new products due to the admin authentication middleware.

Installation
Clone the repository:
git clone <repository-url>

Install dependencies:
npm install

Configure environment variables for:
MongoDB
SendGrid
Cloudinary

Run the project:
npm run dev

Credits
Project developed by Uros Milenkovic.


