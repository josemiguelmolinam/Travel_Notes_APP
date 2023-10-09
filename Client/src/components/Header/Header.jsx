import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <Link to='/'>Travel Notes</Link>
    </header>
  );
};

export default Header;
