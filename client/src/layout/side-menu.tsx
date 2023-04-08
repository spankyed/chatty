import React from 'react';
import { useState } from 'react'
import { MenuProps } from 'antd';
import { Layout as Section, Menu } from 'antd';
import { routes } from './routes';
import { Link, PathMatch, useMatch, useMatches } from 'react-router-dom';

const { Sider } = Section;

export default function SideMenu() {

  const matchingRoute: { [key: string]: PathMatch<string> | null } = {
    catalog: useMatch("/catalog"),
    agents: useMatch("/agents"),
    database: useMatch("/database"),
    modules: useMatch("/system/modules"),
    ensembles: useMatch("/system/ensembles"),
    dialogues: useMatch("/system/dialogues"),
  }

  const dynamicMatches: { [key: string]: PathMatch<string> | null } = {
    modules: useMatch("/system/modules/:moduleId"),
    ensembles: useMatch("/system/ensembles/:ensembleId"),
    dialogues: useMatch("/system/dialogues/:dialogueId"),
  }

  const currSelected = `${Object.keys(matchingRoute).find((key) => matchingRoute[key] || dynamicMatches[key])}`;
  // console.log('currSelected: ', currSelected);

  // const match = useMatches();
  // console.log('match: ', match);

  const menuItems: MenuProps['items'] = routes.map(
    (route, index) => {
      return {
        key: `${route.name}`,
        icon: React.createElement(route.icon),
        label: route.name === 'system' ? 'System' : <Link to={`/${route.name}`} style={{ textTransform: 'capitalize' }}>{route.name}</Link>,
        children: route.name === 'system' && [ 
          {
            key: 'modules',
            label: <Link to={`/system/modules`} style={{ textTransform: 'capitalize' }}>Modules</Link>,
          },
          {
            key: 'ensembles',
            label: <Link to={`/system/ensembles`} style={{ textTransform: 'capitalize' }}>Ensembles</Link>,
          },
          {
            key: 'dialogue',
            label: <Link to={`/system/dialogues`} style={{ textTransform: 'capitalize' }}>Dialogues</Link>,
          },
        ]
      };
    },
  );

  return (
    <Sider width={200} className="site-layout-background capitalize">
      <Menu
        mode="inline"
        selectedKeys={[currSelected]}
        // defaultSelectedKeys={['dialogue']}
        defaultOpenKeys={['system']}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
}
