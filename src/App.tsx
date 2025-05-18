import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  const darkMode = localStorage.getItem("darkMode");

  return (
    <BrowserRouter>
      <Router />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode === "true" ? "dark" : "light"}
      />
    </BrowserRouter>
  );
}

export default App;
