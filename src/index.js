import React                from "react";
import ReactDOM             from "react-dom";
import * as serviceWorker   from "./serviceWorker";
import { Home }             from "./pages";
import "./styles/styles.scss";

// Redux
import { Provider }         from "react-redux";
import { PersistGate }      from "redux-persist/lib/integration/react";
import { persistor, store } from "./store/store.js";

const routing = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Home/>
        </PersistGate>
    </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));
