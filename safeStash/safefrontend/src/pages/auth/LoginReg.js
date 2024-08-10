import { Grid, Card, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import Pic1 from "../../images/5eccc1a7a44ae.png";
import Registration from "./Registration";
import UserLogin from "./UserLogin";
import "bootstrap/dist/css/bootstrap.min.css";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ mt: 3 }}>{children}</Box>}
    </div>
  );
};

const LoginReg = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", bgcolor: "#f0f0f0" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card className="shadow-sm" sx={{ bgcolor: "#fff", borderRadius: 8 }}>
          <Box sx={{ mb: -10 }}>
            <img
              src={Pic1}
              alt="Background"
              className="img-fluid"
              style={{ width: "100%", borderRadius: "8px 8px 0 0" }}
            />
            <Tabs
              value={value}
              textColor="primary"
              indicatorColor="primary"
              onChange={handleChange}
              centered
              sx={{
                position: "relative",
                top: -32,
                bgcolor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "8px 8px 0 0",
                p: 1,
              }}
            >
              <Tab
                label="Login"
                sx={{ textTransform: "none", fontWeight: 600 }}
              />
              <Tab
                label="Registration"
                sx={{ textTransform: "none", fontWeight: 600 }}
              />
            </Tabs>
          </Box>
          <Box sx={{ p: 3 }}>
            <TabPanel value={value} index={0}>
              <UserLogin />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Registration />
            </TabPanel>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LoginReg;
