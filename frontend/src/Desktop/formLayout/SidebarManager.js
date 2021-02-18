import React from "react";
import {Layout, Menu} from "antd";
const { Header, Content, Footer, Sider } = Layout;
const SideBar = ({ panes, active }) => {
    console.log(panes, active);
    return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}
        >
            <div className="logo" />
            {/*<Menu theme="dark" mode="inline" selectedKeys={[active]}>*/}
            <Menu theme="dark" mode="inline">
                {panes.map(pane => (
                    <Menu.Item key={pane.key}>
                        {pane.title}
                        {console.log(pane.content)}
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};
export default SideBar;