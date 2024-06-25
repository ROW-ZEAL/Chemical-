import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import AddMembers from "./pages/AddMembers";
import Home from "./pages/Home";
import DipositHistory from "./pages/DropDownPages/DipositHistory";
import DepositAmount from "./pages/DropDownPages/DepositAmount";
import IndividualContribution from "././pages/DropDownPages/IndividualContribution";
import MonthlyDepositSummary from "./pages/DropDownPages/MonthlyDepositSummary";
import Individual_summary from "./pages/DropDownPages/Individual_summary";
import TotalSavings from "./pages/DropDownPages/TotalSavings";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
import "./App.css";
function App() {
  const { access_token } = useSelector((state) => state.auth);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="login"
              element={
                !access_token ? <LoginReg /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="sendpasswordresetemail"
              element={<SendPasswordResetEmail />}
            />
            <Route
              path="api/user/reset/:id/:token"
              element={<ResetPassword />}
            />
          </Route>
          <Route
            path="/dashboard"
            element={access_token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={access_token ? <Users /> : <Navigate to="/login" />}
          />
          <Route
            path="/member"
            element={access_token ? <AddMembers /> : <Navigate to="/login" />}
          />
          <Route
            path="/amount"
            element={
              access_token ? <DepositAmount /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/deposit-history"
            element={
              access_token ? <DipositHistory /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/individual-contribution"
            element={
              access_token ? (
                <IndividualContribution />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/Individual_summary/:firstName"
            element={
              access_token ? <Individual_summary /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/monthly-deposit-summary"
            element={
              access_token ? (
                <MonthlyDepositSummary />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/total-savings"
            element={access_token ? <TotalSavings /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
