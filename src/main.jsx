import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Parse from "parse";
import "./components/css/Books.css";
import "./components/css/BooksByAuthor.css";
import "./components/css/BookDetails.css";
import "./components/css/BorrowBook.css";
import "./components/css/ReturnBook.css";

const PARSE_APPLICATION_ID = "kJfixo1LqIpeWxAxQFn4oqOq3SH1nWpH7gff6hnR";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "DGEGBWHJPSqECzt02B76diWzfz6vxObESfN0pA9D";

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
