import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { RootState } from "../utils/appStore";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios, { isAxiosError } from "axios";
import { BASE_URL } from "../appConstant";
import { toast } from "react-toastify";
import { removeUser } from "../utils/userSlice";
import { errorMonitor } from "events";
import getAxiosError from "../utils/axiosError";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Workout", "Goals"];

const NavBar = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userData = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    try {
      const response = await axios.post(`${BASE_URL}/logout`);

      toast.info(response.data, { toastId: "logoutResponse" });
      dispatch(removeUser());
      localStorage.removeItem("user");
      return navigate("/login");
    } catch (error) {
      const appError = getAxiosError(error);
      console.log(appError);
      toast.error(appError.errorMessage, { toastId: "logoutError" });
    } finally {
      //clean up logic
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {userData && (
          <>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton sx={{ textAlign: "center", padding: 0 }}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      width: "100%",
                      display: "block",
                    }}
                  >
                    <ListItemText primary={item} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            My Fitness Journey
          </Typography>
          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            {userData &&
              navItems.map((item) => (
                <Button
                  key={item}
                  component={Link}
                  to={`/${item.toLowerCase()}`}
                  sx={{ color: "#fff", textDecoration: "none", mx: 1 }}
                >
                  {item}
                </Button>
              ))}

            {/* User Avatar & Dropdown Menu */}
            {userData && (
              <>
                <IconButton onClick={handleMenuClick} sx={{ ml: 2 }}>
                  <Avatar
                    src={userData.photoURL || ""}
                    alt="User"
                    sx={{ width: 32, height: 32, bgcolor: "gray" }}
                  >
                    {!userData.photoURL && <AccountCircleIcon />}
                  </Avatar>
                </IconButton>

                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/profile"
                  >
                    Profile
                  </MenuItem>

                  <Divider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default NavBar;
