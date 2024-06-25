import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unSetUserToken } from "../features/authSlice";
import { getToken, removeToken } from "../services/LocalStorageService";
import ChangePassword from "./auth/ChangePassword";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { useEffect, useState } from "react";
import {
  setUserInfo,
  unsetUserInfo,
  selectUserInfo,
} from "../features/userSlice";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const userInfo = useSelector(selectUserInfo);
  const kakashiImageUrl =
    "https://imgs.search.brave.com/5FVuab4hqplxgD8PN4AtuDQl94G7JUitoKhET2MWQFA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDI2NzMy/MzcuanBn";

  // Rule for monthly savings
  const monthlySavingsRule = "Each member is required to save $500 per month.";

  const handleShowChangePassword = () => {
    setShowChangePassword(true);
  };

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          email: data.email,
          name: data.name,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Welcome, {userInfo.name}!
              </Typography>
              <Avatar
                alt={userInfo.name}
                src={kakashiImageUrl}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="body1">Email: {userInfo.email}</Typography>
              <Typography variant="body1">{monthlySavingsRule}</Typography>
              <Button
                variant="contained"
                color="warning"
                size="large"
                onClick={() => setShowChangePassword(!showChangePassword)}
                sx={{ mt: 4 }}
              >
                {showChangePassword
                  ? "Hide Change Password"
                  : "Change Password"}
              </Button>
              {showChangePassword && <ChangePassword />}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Money Saving Tips
              </Typography>
              <Typography variant="body1">
                Here are some tips to help you save money:
                <ul>
                  <li>Set a budget and stick to it</li>
                  <li>Avoid unnecessary expenses</li>
                  <li>Use cashback and rewards programs</li>
                  <li>Invest in a high-interest savings account</li>
                  <li>Track your spending and savings goals</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
