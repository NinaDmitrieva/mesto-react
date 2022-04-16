import React from 'react';
import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';

function App() {
  
  const [isPopupProfileOpen, setPopupProfileOpened] = React.useState(false); //хук для открытия попапа профайла
  const [isPopupSaveNewPhoto, setPopupSaveNewPhoto] = React.useState(false); //попап, сохраняющий картинку
  const [isPopupAvatarUpdate, setPopupAvatarUpdate] = React.useState(false); //попап, меняющий аватар

  
  function handleEditProfileClick() { 
    setPopupProfileOpened(true);
  }

  function handleAddPlaceClick() {
    setPopupSaveNewPhoto(true);   
  }

  function handleEditAvatarClick() {
    setPopupAvatarUpdate(true);
  }

  function closeAllPopups() {
    setPopupProfileOpened(false)
    setPopupSaveNewPhoto(false)
    setPopupAvatarUpdate(false)
  }
  
    return (
     
<div className="root">
  <div className="page">
        <Header />
        <Main 
        onEditProfile={handleEditProfileClick} //протаскиваем отработчик из майна профайл
        onAddPlace={handleAddPlaceClick} // новая картинка
        onEditAvatarClick={handleEditAvatarClick} //аватар 
        />
        <Footer />
        <PopupWithForm title='Редактировать профиль' name='_profile' isOpen={isPopupProfileOpen} btnText='Сохранить' onClose={closeAllPopups}>
            <input className="popup__style popup__name input"
                    placeholder='Имя'
                    type="text"
                    names="name" /*исправь везде name на names */
                    defaultValue = ""
                    minLength="2"  
                    maxLength="40" 
                    id="name-card"required
            />
            <span id="name-card-error" className="error"></span>
            <input className="popup__style popup__work input" 
                    placeholder="Профессиональная деятельность"   
                    type="text"
                    name="job"    /*исправь везде name на names */              
                    defaultValue = ""
                    minLength="2" 
                    maxLength="200"
                    id="work" required
            />
            <span id="work-error" className="error"></span>
        </PopupWithForm>

        <PopupWithForm title='Новое место' name='foto' isOpen={isPopupSaveNewPhoto} btnText='Создать' onClose={closeAllPopups}>
            <input className="popup__style popup__cards input" 
                type="text" 
                id="name-place"
                names="name"  /*исправь везде name на names */
                placeholder="Название" 
                minLength="2" 
                maxLength="30" 
                required
            />
            <span id="name-place-error" className="error"></span>
            <input className="popup__style popup__place input" 
                type="url" 
                names="link"  /*исправь везде name на names */
                id="place-url"
                placeholder="Ссылка на картинку" 
                required
            />
            <span id="place-url-error" className="error"></span>
        </PopupWithForm>

       <PopupWithForm title='Обновить аватар' name='update' isOpen={isPopupAvatarUpdate} btnText='Сохранить' onClose={closeAllPopups}>
       <span id="name-place-error-one" className="error"></span>
            <input className="popup__style popup__place input" 
                    type="url" 
                    names="avatar"
                    id="avatar-id"
                    placeholder="Ссылка на картинку" 
                    required
            />
            <span id="place-url-error-two" className="error"></span>
       </PopupWithForm>
       
        <PopupWithForm title='Вы уверены?' name='confirm' btnText='Да' onClose={closeAllPopups}>  
        </PopupWithForm>

        <section className="popup popup_open-foto">
            <div className="popup__block-img">
                <button className="popup__close-icon popup__foto-close" type="button"></button>
                <img className="popup__img-open" alt = '' src = '#'/>
                <h3 className="popup__foto-name"></h3>
            </div>
        </section>

  </div>

    <template id="card" className="card-template">
        <div className="element">
            <img className="element__foto" alt = '' src = '#'/>
            <button className="element__close-icon" type="button"></button>
            <div className="element__mask-group">
                <h2 className="element__title"></h2>
                <div className="element__like-container">
                <button className="element__like element__click" type="button"></button>
                <span className="element__span-like"></span>
                </div>
            </div>
        </div>
    </template> 
</div>

  );
}

export default App;
