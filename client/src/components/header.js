import * as React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { styled, alpha } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import CreateIcon from "@material-ui/icons/Create";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  zIndex: "99",
  backgroundColor: "rgba(255,255,255,0.15)",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header({ isLogin, handleLogout, getPostings }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    clickMypage();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const logOut = () => {
    window.alert("sign out success!");
    handleLogout();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const clickMypage = () => {
    navigate("/mypage");
  };
  //  검색 함수
  const onSearch = (e) => {
    if (e.keyCode === 13) {
      getPostings(e.target.value);
    }
  };
  const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     anchorOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     id={menuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   ></Menu>
  // );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="medium"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Mypage</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        position="static"
        style={{
          background: "darkorange",
        }}
      >
        <Toolbar
          style={{
            background: "darkorange",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            component={Link}
            to={"/"}
          >
            <WbSunnyOutlinedIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            CoCoFarm
          </Typography>
          <Search
            style={{
              width: "40%",
              borderRadius: "10px",
              zIndex: "99",
              backgroundColor: "rgba(255,255,255,0.15)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.25)",
              },
              marginLeft: "1%",
              color: "inherit",
            }}
          >
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyUp={onSearch}
              style={{
                width: "100%",
                paddingLeft: "1%",
                color: "inherit",
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isLogin ? (
              <Button
                variant="text"
                style={{
                  color: "inherit",
                }}
                component={Link}
                to={"/signin"}
                onClick={logOut}
              >
                SIGN OUT
              </Button>
            ) : (
              <Button
                variant="text"
                style={{
                  color: "inherit",
                }}
                component={Link}
                to={"/signin"}
              >
                SIGN IN
              </Button>
            )}

            <Button
              variant="text"
              style={{
                color: "inherit",
              }}
              component={Link}
              to={"/signup"}
            >
              SIGN UP
            </Button>
            <IconButton
              size="medium"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              component={Link}
              to={"/posting"}
            >
              <CreateIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton color="inherit" component={Link} to={"/vote"}>
              <HowToVoteIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="medium"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
