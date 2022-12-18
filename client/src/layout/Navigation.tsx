import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { routes } from './routes';

const { Header, Footer, Sider, Content } = Layout;

function Navigation() {
  // defaultSelectedKeys should match navigation url
  // const defaultSelected = useMatch('/system') ? '0' : useMatch('/dialogue') ? '1' : useMatch('/account') ? '2' : '0';
  const NavItems: MenuProps['items'] = routes.map((route, idx) => ({
    key: idx,
    label: <Link to={`/${route.name}`} style={{ textTransform: 'capitalize' }}>{route.name}</Link>,
  }));
  return (
    <>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} items={NavItems} />
      </Header>
    </>
  );
}


export default Navigation
