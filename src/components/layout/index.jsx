import React, { useState, useContext} from 'react';
import { DataContext } from '../../context/dataContext';
import {useNavigate} from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  RedditOutlined,
  DesktopOutlined,
  VideoCameraOutlined,
  ShopOutlined,
  PartitionOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, ConfigProvider } from 'antd';
import SearchBox from '../searchBox';

const { Header, Sider, Content } = Layout;
const MenuItems = [
  getItem('Surveys and Forms', '1', <PieChartOutlined />),
  getItem('Landing Pages', '2', <ReadOutlined />),
  getItem('Platform News and Updates', '3', <DesktopOutlined />),
  getItem('Data Management', '4', <PartitionOutlined />),
  getItem('Marketing', 'sub1', <VideoCameraOutlined />, [
    getItem('Email Marketing', '5'),
    getItem('Marketing Automation', '6'),
    getItem('Digital Marketing', '7'),
    getItem('Marketing Analytics', '8'),
  ]),
  getItem('Tips and Best Practise', '9', <RedditOutlined />),
  getItem('Ecommerce', '10', <ShopOutlined />),
];

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MainLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {setCategories} = useContext(DataContext)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const nav = useNavigate()

  function categorySetter(e){
    setCategories(e.domEvent.target.innerText)
    nav('/categories')
  }

  return (
    <Layout>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: '#DC143C',
              borderRadius: 2,

              // Alias Token
              colorBgContainer: '#fffff',
            },
            components:{
              Layout:{
                zeroTriggerWidth:100,
                siderBg:'#fffff',
              }
            }
          }}
        >
      <Sider 
      trigger={null} 
      collapsible 
      collapsed={collapsed}
      collapsedWidth={50}
      breakpoint='sm'
      onBreakpoint={(broken)=>{setCollapsed(broken)}}
      width={270}
      className='fixed top-0'
      >
        <div className="demo-logo-vertical py-6" />
        {!collapsed?<SearchBox/>:''}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={MenuItems}
          onSelect={(evt)=>categorySetter(evt)}
          style={{position:'sticky', top:0, paddingTop:27}}
        />
      </Sider >
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 100,
              height: 64,
            }}
            >
              Menu
            </Button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
      </ConfigProvider>
    </Layout>
  );
};
export default MainLayout;