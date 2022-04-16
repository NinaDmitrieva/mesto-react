import Logo from './../images/Vector.svg'; 

function Header() {
    return (
     <header className="header">
        <img className="header__logo" alt="Логотип" src={Logo} />
    </header>
    );
  }
  
  export default Header;