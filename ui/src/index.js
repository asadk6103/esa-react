import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './store';
import { persistStore } from 'redux-persist'
import Layout from './Layout';
import { green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
import { darkTheme, lightTheme } from './common/theme';
// Add with other imports
import io from "socket.io-client";
import { handleChangeActiveUsers, handleChangeNotificaiton } from './common/commonSlice';
import { getItem } from './utils/storage';
import { openErrorToast } from './common/toast';

const theme = createTheme(lightTheme);

const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor = persistStore(store);


export const socket = io.connect(`${window.location.protocol}//${window.location.hostname}:3502`, {
  extraHeaders: {
    authorization: getItem('secret')
  }
});


const App = () => {
  const dispatch = useDispatch()

  const refreshSocket = async () => {
    try {
      await socket.on("noty", (data) => {
        dispatch(handleChangeNotificaiton(data))
      });

      await socket.on("users", (user) => {
        dispatch(handleChangeActiveUsers(user))
      })
    } catch (err) {
      openErrorToast(err)
    }
  }
  useEffect(() => {
    //listens for the event list from the backend
    refreshSocket()

  }, []);

  return (

    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout />
        <ToastContainer autoClose={5000} draggable={false} limit={5} />
      </BrowserRouter>
    </ThemeProvider>

  );
}

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);