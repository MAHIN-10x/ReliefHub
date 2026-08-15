import { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  const [page, setPage] = useState("login");

  if (page === "home") {
    return <Home />;
  }

  if (page === "register") {
    return (
      <Register
        onRegister={(e) => {
          e.preventDefault();
          setPage("home");
        }}
        onLoginClick={() => setPage("login")}
      />
    );
  }

  return (
    <Login
      onRegisterClick={() => setPage("register")}
      onLogin={(e) => {
        e.preventDefault();
        setPage("home");
      }}
    />
  );
}

export default App;
