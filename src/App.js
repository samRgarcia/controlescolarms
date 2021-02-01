import Rutas from "./pages";
import axios from "axios";
import {SnackbarProvider} from 'notistack';
axios.defaults.baseURL=process.env.REACT_APP_API_URL;

function App() {
  return (
    <div className="App">
        <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Rutas/>
        </SnackbarProvider>
    </div>
  );
}

export default App;
