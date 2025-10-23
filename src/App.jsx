import { BrowserRouter } from "react-router-dom";
import Router from "./helpers/Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Router></Router>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
