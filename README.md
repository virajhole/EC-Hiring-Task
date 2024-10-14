# React Authentication and Product Listing Application

## Overview

This application is a simple product listing app with user registration, login, and protected routes. It uses the following technologies:

- **React** for frontend development
- **React Router** for navigation
- **TailwindCSS** for styling
- **MUI (Material-UI)** for notifications
- **Fetch API** for HTTP requests
- **LocalStorage** for storing tokens

## Features

- **User Authentication:** Users can register and log in using their email and password.
- **Protected Routes:** Product listing is only accessible to logged-in users.
- **Product Search & Pagination:** Users can search products by title and navigate through pages.
- **Snackbar Notifications:** Display feedback messages for success or failure.

## Pages

1.  **Register Page**: Allows users to create a new account.
2.  **Login Page**: Users log in to access the product listing.
3.  **Product List Page**: Displays products with search functionality, only accessible to authenticated users.

## API Endpoints

- **Registration:** `POST /auth/signup`
- **Login:** `POST /auth/login`
- **Current User:** `GET /api/me`
- **Product List:** `GET /api/products`

## Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   npm run dev
   ```

4. Access the app at `http://localhost:3000`.

## Usage

1. **Register** a new user by providing email and password on the register page.
2. After registration, **log in** using the same credentials.
3. Once logged in, the **product listing** page will be displayed.
4. You can search for products by title or navigate between product pages.

## Authentication Workflow

- On successful login, the token is stored in `localStorage` and used for subsequent API requests.
- If the user is unauthorized, they are redirected to the login page.

## Styling

The app uses **TailwindCSS** for UI styling and **Material-UI** for displaying success or error messages via the Snackbar component.

## License

This project is licensed under the MIT License.

---
