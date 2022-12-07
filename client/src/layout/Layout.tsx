import React from 'react';
import { useState } from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout as Section, Menu } from 'antd';
import './App.css'
import { RecoilRoot } from 'recoil';
import Navigation from './Navigation';
// import { ReduceStress } from "react-reduce-stress";

// import { useForm } from "react-hook-form";
// import reactLogo from './assets/react.svg'

// type AppProps = { message: string }; /* could also use interface */

// const App = ({ message }: AppProps) => <div>{message}</div>;


const { Sider, Content } = Section;

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

function Layout() {
  const [count, setCount] = useState(0)

  return (
    <RecoilRoot>
      <AppLayout/>
    </RecoilRoot>
  )
}

function AppLayout() {
  return (
    <>
      <Section  className="h-full">
        <Navigation/>
        <Section>
          <SideMenu/>
          <Section style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background text-black"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              Content
            </Content>
          </Section>
        </Section>
      </Section>
    </>
  );
}


function SideMenu() {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        items={items2}
      />
    </Sider>
  );
}


export default Layout
