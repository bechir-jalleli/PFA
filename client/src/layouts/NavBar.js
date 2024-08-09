// src/layouts/NavBar.js
import React from 'react';
import { AppstoreOutlined, TeamOutlined, UserOutlined, CarryOutFilled, AppstoreFilled } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    label: 'Admin',
    key: 'admin',
    icon: <UserOutlined />,
  },
  {
    label: 'Responsables',
    key: 'responsables',
    icon: <UserOutlined />,
  },
  {
    label: 'Chefs Project',
    key: 'chefs-project',
    icon: <UserOutlined />,
  },
  {
    label: 'Membres equipe',
    key: 'membres-equipe',
    icon: <TeamOutlined />,
  },
  {
    label: 'Organisations',
    key: 'organisations',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Sous Organisation',
    key: 'sous-organisation',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Project',
    key: 'project',
    icon: <AppstoreFilled />,
  },
  {
    label: 'Taches',
    key: 'taches',
    icon: <CarryOutFilled />,
  },
];

function NavBar({ onSelect }) {
  const [current, setCurrent] = React.useState('admin');

  const handleClick = (e) => {
    setCurrent(e.key);
    if (onSelect) onSelect(e.key);
  };

  return <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default NavBar;
