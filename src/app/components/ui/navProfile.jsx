import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../store/slices/userSlice";
import { Avatar, Button, Dropdown, Image, Menu } from "antd";

function NavProfile() {
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  if (!currentUser) return "Loading...";

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link to="/logout" className="dropdown-item">
              Выход
            </Link>
          ),
        },
        // {
        //   key: "2",
        //   label: (
        //     <Link to={`/users/${currentUser._id}`} className="dropdown-item">
        //       Профиль
        //     </Link>
        //   ),
        // },
      ]}
    />
  );

  return (
    <div className="dropdown " onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        {/*<div className="me-2"></div>*/}

        <Dropdown
          overlay={menu}
          placement="bottom"
          arrow={{
            pointAtCenter: true,
          }}
        >
          <Avatar
            src={<Image src={currentUser.image} style={{ width: 40 }} />}
          />
        </Dropdown>
      </div>
    </div>
  );
}

export default NavProfile;
