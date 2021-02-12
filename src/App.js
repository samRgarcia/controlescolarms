import Rutas from "./pages";
import axios from "axios";
import {SnackbarProvider} from 'notistack';
import ProviderAuth from './Contex/authContext';

axios.defaults.baseURL=process.env.REACT_APP_API_URL;

function App() {
  return (
    <div className="App">
        <ProviderAuth>
            <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Rutas/>
            </SnackbarProvider>
        </ProviderAuth>
    </div>
  );
}

export default App;
