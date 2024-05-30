import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Header() {
  return (
    <Navbar>
      <NavContainer>
        <Logo>
          <Link to="/" 
            style={{ 
                textDecoration: 'none', 
                color: '#333',  
                fontSize: '24px',
                fontWeight: 'bold',
            }}>MyApp</Link>
        </Logo>
        <NavLinkList>
          <NavLinkItem>
            <NavLink to="/">Home</NavLink>
          </NavLinkItem>
          <NavLinkItem>
            <NavLink to="/wishlist">Wishlist</NavLink>
          </NavLinkItem>
        </NavLinkList>
      </NavContainer>
    </Navbar>
  );
}

const Navbar = styled.nav`
    background-color: #f8f8f8;
    padding: 10px 20px;
`;

const NavContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled.div`
    color: #333;
    font-size: 1.5rem;
`;

const NavLinkList = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
`;

const NavLinkItem = styled.li`
    margin-left: 20px;
`;

const NavLink = styled(Link)`
    color: #333;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;