import React, { useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

export default function App() {
  
  const [isPopupProfileOpen, setPopupProfileOpened] = React.useState(false); 
  const [isPopupSaveNewPhoto, setPopupSaveNewPhoto] = React.useState(false); 
  const [isPopupAvatarUpdate, setPopupAvatarUpdate] = React.useState(false);
  const [card, setCard] = React.useState({})

  function handleEditProfileClick() { 
    setPopupProfileOpened(true);
  }

  function handleAddPlaceClick() {
    setPopupSaveNewPhoto(true);   
  }

  function handleEditAvatarClick() {
    setPopupAvatarUpdate(true);
  }

  function handleCardClick(card) {
    setCard(card);
  }

  function closeAllPopups() {
    setPopupProfileOpened(false)
    setPopupSaveNewPhoto(false)
    setPopupAvatarUpdate(false)
    setCard({})
  }

    return (
     
<div className="root">
  <div className="page">
        <Header />
        <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick} 
        onEditAvatarClick={handleEditAvatarClick} 
        onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm 
          title='Редактировать профиль' 
          name='_profile' 
          isOpen={isPopupProfileOpen} 
          btnText='Сохранить' 
          onClose={closeAllPopups}
        >
            <input className="popup__style popup__name input"
                    placeholder='Имя'
                    type="text"
                    name="name" 
                    defaultValue = ""
                    minLength="2"  
                    maxLength="40" 
                    id="name-card"required
            />
            <span id="name-card-error" className="error"></span>
            <input className="popup__style popup__work input" 
                    placeholder="Профессиональная деятельность"   
                    type="text"
                    name="job"                 
                    defaultValue = ""
                    minLength="2" 
                    maxLength="200"
                    id="work" required
            />
            <span id="work-error" className="error"></span>
        </PopupWithForm>

        <PopupWithForm 
          title='Новое место' 
          name='foto' 
          isOpen={isPopupSaveNewPhoto} 
          btnText='Создать' 
          onClose={closeAllPopups}
        >
            <input className="popup__style popup__cards input" 
                type="text" 
                id="name-place"
                name="name"  
                placeholder="Название" 
                minLength="2" 
                maxLength="30" 
                required
            />
            <span id="name-place-error" className="error"></span>
            <input className="popup__style popup__place input" 
                type="url" 
                name="link"  
                id="place-url"
                placeholder="Ссылка на картинку" 
                required
            />
            <span id="place-url-error" className="error"></span>
        </PopupWithForm>

       <PopupWithForm 
         title='Обновить аватар' 
         name='update' 
         isOpen={isPopupAvatarUpdate} 
         btnText='Сохранить' 
         onClose={closeAllPopups}
        >
       <span id="name-place-error-one" className="error"></span>
            <input className="popup__style popup__place input" 
                    type="url" 
                    name="avatar"
                    id="avatar-id"
                    placeholder="Ссылка на картинку" 
                    required
            />
            <span id="place-url-error-two" className="error"></span>
       </PopupWithForm>
       
        <PopupWithForm 
          title='Вы уверены?' 
          name='confirm' 
          btnText='Да' 
          onClose={closeAllPopups}
        >  
        </PopupWithForm>

        <ImagePopup 
        card={card} 
        onClose={closeAllPopups}
        />
  </div>
</div>
  );
}


