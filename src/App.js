import './App.css';
import Welcome from "./components/welcome/Welcome";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
        <Header />
        <Welcome />
        <Footer />
    </div>
  );
}

export default App;
