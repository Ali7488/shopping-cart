import { Outlet } from "react-router";
import "./styles/App.css";

function App() {
  return (
    <>
      <nav></nav>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
