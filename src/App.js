import React from "react";
import { Provider } from "react-redux";
import { store } from "./Components/ReduxComponent/store";
import ProductList from "./Components/ProductList";
import Cart from "./Components/Cart";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Cart />
        <ProductList />
      </div>
    </Provider>
  );
}

export default App;
