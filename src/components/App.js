import React, { useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import {api} from './../utils/Api';
import {CurrentUserContext}  from '../contexts/CurrentUserContext';

export default function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); 
  const [isPopupSaveNewPhoto, setPopupSaveNewPhoto] = React.useState(false); 
  const [isPopupAvatarUpdate, setPopupAvatarUpdate] = React.useState(false);
  const [card, setCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([]); 

  React.useEffect(() => { 
    api.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
            .catch((err) => {
            console.log(err);
          })
          api.getInitialCards()
          .then((cards) => {
            setCards(cards)
          })
          .catch((err) => {
            console.log(err);
          });   
   }, [])


   function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLike(card._id, !isLiked).
        then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
        .catch((err)=> {
          console.lig(err)
        })
} 

function handleCardDelete(card) {
  api.deleteCard(card._id).
      then(() => {
      setCards((state) => state.filter((c) => c._id === card._id ));
      })
        .catch((err)=> {
        console.lig(err)
       })
} 

function handleChangeUser(user) {
  api.setUserInfo(user.name, user.about).
      then((userData) => {
      setCurrentUser({
        ...currentUser,
        name: userData.name,
        about: userData.about
      });
          closeAllPopups()
        })
          .catch(console.log)
    }

  function handleEditProfileClick() { 
    setIsEditProfilePopupOpen(true);
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
    setIsEditProfilePopupOpen(false)
    setPopupSaveNewPhoto(false)
    setPopupAvatarUpdate(false)
    setCard({})
  }

    return (
<CurrentUserContext.Provider value={currentUser}>   
 <div className="root">
  <div className="page">
        <Header />
        <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick} 
        onEditAvatarClick={handleEditAvatarClick} 
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
        />
        <Footer />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}  
          onClose={closeAllPopups}
          onUpdateUser={handleChangeUser}
        />

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
</CurrentUserContext.Provider>
  );
}

