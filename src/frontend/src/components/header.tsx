import { Header as NhsHeader } from "nhsuk-react-components";

function Header() {

  return (
    <NhsHeader>
      <NhsHeader.Container>
        <NhsHeader.Logo href="/" />
        <NhsHeader.ServiceName href="/">UEC Capacity Management</NhsHeader.ServiceName>
      </NhsHeader.Container>
    </NhsHeader>
  );
}

export default Header;
