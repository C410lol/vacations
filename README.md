# Vacation Planner

A web system for **organizing and selecting vacation periods**. The application allows users to view periods that have already been selected and register their own preferences, while an administrative area provides controls over the selection period and the order of users.

This repository contains both parts of the application: a Vue.js frontend and a Node.js/Express API, with data persistence in MongoDB.

## ✨ Features

### For users

- Access to the application through the authentication flow integrated with the backend.
- View their own vacation selection.
- Select a vacation period when the selection phase is enabled.
- View vacation selections registered by other users.
- Check unavailable periods and dates calculated from existing selections.

### For administrators

- View users organized by their assigned position.
- Reorder the sequence of users.
- Enable or disable the vacation selection period.
- Track selections that have already been registered.

The backend also takes users' positions into account during the selection process, applying rules that control when each person can register their choice.

## 🧰 Technologies

### Frontend

- **Vue 3**
- JavaScript
- Vue Router
- Axios
- Vite
- Vue Datepicker
- Vue Draggable

### Backend

- **Node.js**
- **Express 4**
- **MongoDB**
- **Mongoose**
- Nodemailer
- CORS

## 🗂️ Repository structure

```
vacations/
├── vacations-vue/       # Vue.js web interface
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       └── services/
└── vacations-express/   # API and business logic
    ├── models/
    ├── routes/
    ├── services/
    └── app.js
```

## ▶️ How to run locally

### Prerequisites

- Node.js and npm.
- MongoDB running locally or accessible through a connection URI.
- Two terminals to run the frontend and backend.

### 1. Backend

```bash
cd vacations-express
npm install
npm start
```

By default, the current backend configuration uses the local `vacations_express_db` database, with the URI `mongodb://localhost:27017/vacations_express_db`. Make sure MongoDB is available and update the configuration in `app.js` if you use another instance.

### 2. Frontend

In another terminal, from the repository root:

```bash
cd vacations-vue
npm install
npm run dev
```

Vite will display the local address for accessing the interface in the terminal.

Before running the frontend, check the API communication settings in `vacations-vue/src/services/apiCalls.js` and make sure the URL matches the backend address.

## 📌 Notes

- The frontend and backend are separate projects and both must be running for the complete application to work.
- Sending email messages depends on a valid configuration for the email service used by the backend.
- Do not commit database or email credentials to version control.

---

A web development project focused on organizing vacation preferences, integrating frontend and backend components, and persisting data.
