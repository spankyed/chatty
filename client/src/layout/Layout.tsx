import React from 'react';
import { useState } from 'react'
import { LaptopOutlined, NotificationOutlined, PlusSquareOutlined, UserOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Breadcrumb, Layout as Section, Menu } from 'antd';
import './App.css'
import { RecoilRoot } from 'recoil';
import Navigation from './Navigation';
import { Outlet, useLocation } from 'react-router-dom';
import SideMenu from './SideMenu';
import { routes } from './routes';

// type AppProps = { message: string }; /* could also use interface */

// const App = ({ message }: AppProps) => <div>{message}</div>;

const { Sider, Content } = Section;


function Crumby() {
  const location = useLocation();
  const currentRoute = routes.find((route) => route.path === location.pathname);
  const breadcrumbItems = [];

  if (currentRoute) {
    breadcrumbItems.push(
      <Breadcrumb.Item key={currentRoute.name}>
        {currentRoute.name}
      </Breadcrumb.Item>
    );
  }
}

export default function AppLayout() {
  const [count, setCount] = useState(0)
  // const crumbs = useMatch('/system') ? 'System' : useMatch('/dialogue') ? 'Dialogue' : useMatch('/account') ? 'Account' : 'System';
  const location = useLocation();
  const currentRoute = routes.find((route) => `/${route.name}` === location.pathname);
  const crumbItems = [];

  if (currentRoute) {
    crumbItems.push(
      <Breadcrumb.Item key={currentRoute.name}>
        {currentRoute.name}
      </Breadcrumb.Item>
    );
  }
  return (
    <>
      <Section  className="h-full">
        <Navigation/>
        <Section>

          <SideMenu/>

          <Section style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }} className="capitalize">
              {crumbItems}
              {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item> */}
            </Breadcrumb>
            {/* <div className="flex">
              <div className="flex-1">
                <PlusSquareOutlined  style={{ fontSize: '36px', color: '#08c' }}/>
              </div>
            </div> */}

            <Content
              className="site-layout-background text-black"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Outlet />
            </Content>
          </Section>
        </Section>
      </Section>
    </>
  );
}
