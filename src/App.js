import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Payments from "./pages/Payments";
import Notifications from "./pages/Notifications";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import "./styles/App.css";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/perfil"
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
              <Route
                path="/editar-perfil"
                element={
                  <Layout>
                    <EditProfile />
                  </Layout>
                }
              />
              <Route
                path="/pagamentos"
                element={
                  <Layout>
                    <Payments />
                  </Layout>
                }
              />
              <Route
                path="/notificacoes"
                element={
                  <Layout>
                    <Notifications />
                  </Layout>
                }
              />
              <Route
                path="/privacidade"
                element={
                  <Layout>
                    <Privacy />
                  </Layout>
                }
              />
              <Route
                path="/ajuda"
                element={
                  <Layout>
                    <Help />
                  </Layout>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
