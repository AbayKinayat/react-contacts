import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Contacts, CreateContact, Login, Registration, MyContacts, UpdateContact } from './pages';
import { PrivateRoute, Loading } from "./components";
import { useAppSelector, useCurrentPageTitle } from './hooks';
import { routes } from './routes';
import './App.css';

function App() {
  const { isRefreshLoading } = useAppSelector(state => state.authReducer);
  useCurrentPageTitle();

  return (
    <div className="app-container">
      {
        isRefreshLoading && <Loading height="100vh" size='large' />
      }
      <Routes>
        <Route
          path={"/"}
          element={<Login />}
        />
        <Route
          path={routes.login.path}
          element={<Login />}
        />
        <Route
          path={routes.registration.path}
          element={<Registration />}
        />
        <Route
          path={routes.contacts.path}
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        >
          <Route
            path={routes.myContacts.path}
            element={<MyContacts />}
          >
          </Route>
          <Route
            path={routes.updateContacts.generateFullPath()}
            element={<UpdateContact />}
          />
          <Route
            path={routes.createContacts.generateFullPath()}
            element={<CreateContact />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
