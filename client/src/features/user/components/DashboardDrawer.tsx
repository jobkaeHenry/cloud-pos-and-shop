import {
  Divider,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import WebIcon from "@mui/icons-material/Web";
import Logo from "../../../assets/Logo";
import { DRAWER_WIDTH } from "../../../const/UiSize";
import { Link, NavLink } from "react-router-dom";
import {
  EDIT_CATEGORY_URL,
  EDIT_COUPON_URL,
  EDIT_MENU_URL,
  EDIT_WEBSITE_URL,
  HOME_URL,
} from "../../../const/clientPath";
import { cloneElement } from "react";

const DashboardDrawer = () => {
  const primaryColor = useTheme().palette.primary.main;
  const gray = useTheme().palette.text.secondary;

  const listData = [
    { title: "메뉴 관리", icon: <FastfoodIcon />, href: EDIT_MENU_URL },
    { title: "쿠폰 관리", icon: <LocalActivityIcon />, href: EDIT_COUPON_URL },
    {
      title: "카테고리 관리",
      icon: <FolderOpenIcon />,
      href: EDIT_CATEGORY_URL,
    },
    {
      title: "웹사이트 관리",
      icon: <WebIcon />,
      href: EDIT_WEBSITE_URL,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
        },
      }}
    >
      <ListItem sx={{ p: 3 }}>
        <Link to={HOME_URL}>
          <Logo />
        </Link>
      </ListItem>
      <Divider />
      {listData.map(({ title, icon, href }) => (
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? primaryColor : gray,
          })}
          to={href}
          key={title}
        >
          <ListItem>
            <ListItemButton>
              <ListItemIcon sx={{ color: "inherit" }}>
                {cloneElement(icon, { sx: { color: "inherit" } })}
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        </NavLink>
      ))}
    </Drawer>
  );
};

export default DashboardDrawer;
