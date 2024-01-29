import React from 'react';
import { Header as NhsHeader } from "nhsuk-react-components";

const Header: React.FC = () => {
  return (
    <NhsHeader>
      <NhsHeader.Container>
        <NhsHeader.Logo href="/" alt='Home Page' />
        <NhsHeader.ServiceName href="/">UEC Capacity Management</NhsHeader.ServiceName>
      </NhsHeader.Container>
    </NhsHeader>
  );
}

export default Header;
