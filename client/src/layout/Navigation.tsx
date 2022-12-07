import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const NavItems: MenuProps['items'] = [
  'System', 
  'Dialogue', 
  'Account'
].map((item, idx) => ({
  key: idx,
  label: `${item}`,
}));


function Navigation() {
  // defaultSelectedKeys should match navigation url
  // const defaultSelected = useMatch('/system') ? '0' : useMatch('/dialogue') ? '1' : useMatch('/account') ? '2' : '0';

  return (
    <>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} items={NavItems} />
      </Header>
    </>
  );
}


export default Navigation
