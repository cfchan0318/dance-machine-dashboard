import React from "react";
import { Link } from "react-router";
import { Button, Flex, Image, Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBuilding,
    faAddressBook,
    faNoteSticky,
    
} from "@fortawesome/free-regular-svg-icons";
import {
    faList,
    faUser,
    faUserGear,
    faBars,
    faPoll
} from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


import { useDispatch, useSelector } from "react-redux";

import { useNavigate, Navigate } from "react-router";

function SidebarMenu({ collapsed, toggleCollapsed }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedKeys, setSelectedKeys] = useState(["properties"]);

    const handleMenuSelect = ({ key }) => {
        setSelectedKeys([key]); // Update shared selectedKeys
    };

    const handleLogoutOnClick = () => {
        localStorage.clear();
        navigate("/login", { replace: true });
    };

    return (
        <div className="h-full flex flex-col">
            <div className="h-[70%]">
                <div
                    style={{
                        width: "100%",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                        backgroundColor: "#FF6D8D",
                        padding: "20px",
                    }}>
                    {!collapsed ? (
                        <span className="text-white text-lg">智研舞動 DB v2</span>
                    ) : null}

                    <Button
                        style={{
                            border: "none",
                        }}
                        onClick={toggleCollapsed}
                        icon={
                            <FontAwesomeIcon
                                className=" text-white text-lg"
                                icon={faBars}
                            />
                        }
                        ghost
                    />
                </div>
                <Menu
                    mode="inline"
                    onSelect={handleMenuSelect}
                    selectedKeys={selectedKeys}
                    style={{ borderRight: 0 }}>
                    <Menu.Item
                        key="results"
                        icon={<FontAwesomeIcon icon={faPoll} />}>
                        <Link to="/results">Results</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="users"
                        icon={<FontAwesomeIcon icon={faAddressBook} />}>
                        <Link to="/users">Users</Link>
                    </Menu.Item>
                 
                </Menu>
            </div>

            {/** User Menu */}
            <div className="h-[30%] flex flex-col justify-end">
                <Menu
                    selectedKeys={selectedKeys}
                    onSelect={handleMenuSelect}
                    mode="inline"
                    style={{ borderRight: 0 }}>
                    <Menu.Item
                        key="weeks"
                        icon={<FontAwesomeIcon icon={faList} />}>
                        <Link to="/weeks">Weeks</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="videoDetails"
                        icon={<FontAwesomeIcon icon={faUser} />}>
                        <Link to="/videoDetails">Video Details</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="postures"
                        icon={<FontAwesomeIcon icon={faUserGear} />}>
                        <Link to="/poses">Postures</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="logout"
                        icon={
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        }
                        onClick={handleLogoutOnClick}
                    >
                        Logout
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
}

export default SidebarMenu;
