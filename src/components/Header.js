import Logo from './../images/Vector.svg'; 

export default function Header() {
    return (
     <header className="header">
        <img className="header__logo" alt="Логотип" src={Logo} />
    </header>
    );
  }
  
