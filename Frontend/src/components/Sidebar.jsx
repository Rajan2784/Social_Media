import React from "react";
import { navigationMenu } from "./sidebar/SidebarNavigation";
import { Avatar, Card, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreVert } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const {user} = useSelector(store => store.auth);

  const handleNavigate = (item)=>{
    if(item.title === "Profile"){
      navigate(`/profile/${user?.id}`)
    }else{
      navigate(item.path)
    }
    
  }

  return (
    <Card className="card h-screen flex flex-col justify-between py-5 ">
      <div className="space-y-8 pl-5">
        <div>
          <span className="logo font-bold text-xl">Social</span>
        </div>

        <div className="space-y-8">
          {navigationMenu.map((item,index) => (
            <div onClick={()=>handleNavigate(item)} key={index} className="flex space-x-3 items-center cursor-pointer">
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>

        <div>
          <Divider />
          <div className="pl-5 flex items-center justify-between pt-5">
            <div className="flex items-center space-x-3">
              <Avatar src="hss" />
              <div>
                <p className="font-bold">{user?.firstName + " " + user?.lastName}</p>
                <p className="opacity-70">{"@" +user?.firstName.toLowerCase() + "_" + user?.lastName.toLowerCase()}</p>
              </div>
            </div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreVert />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
