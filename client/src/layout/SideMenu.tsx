import React from 'react';
import { useState } from 'react'
import { MenuProps } from 'antd';
import { Layout as Section, Menu } from 'antd';
import './App.css'
import { routes } from './routes';

const { Sider } = Section;

export default function SideMenu() {
  const items2: MenuProps['items'] = routes.map(
    (route, index) => {
      const key = String(index + 1);
  
      return {
        key: `sub${key}`,
        icon: React.createElement(route.icon),
        label: `${route.name}`,
        // todo replace template code below with fetched route data
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
  return (
    <Sider width={200} className="site-layout-background capitalize">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub3']}
        style={{ height: '100%', borderRight: 0 }}
        items={items2}
      />
    </Sider>
  );
}
