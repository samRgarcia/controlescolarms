import Rutas from "./pages";
import axios from "axios";
axios.defaults.baseURL=process.env.REACT_APP_API_URL;

function App() {
  return (
    <div className="App">
     <Rutas/>
    </div>
  );
}

export default App;
