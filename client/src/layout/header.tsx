import { GithubOutlined } from '@ant-design/icons';
import { Button, Layout, Typography } from 'antd';

const { Header } = Layout;
const { Text } = Typography;

function Navigation() {

  return (
    <>
      <Header className="header">
          <Text style={{ fontSize: 20, fontWeight: 'bold' }} className='inline'>Chatty.ai</Text>
          <div className="ml-4 inline">
            <Button className="">
              <span role="img" aria-label="apiKey" className="anticon anticon-github h-8 w-6 mb-2">
                <svg 
                  style={{ color: 'rgb(245, 78, 66)', fill: 'currentcolor' }}
                  focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
              </span>

            </Button>
            <a href="https://github.com/spankyed/chatty" target="_blank" rel="noreferrer">
              <Button className="ml-4">
                <GithubOutlined className="h-6 w-5" />
              </Button>
            </a>
          </div>

      </Header>
    </>
  );
}


export default Navigation
