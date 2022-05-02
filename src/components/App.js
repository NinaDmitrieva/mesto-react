import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {api} from './../utils/Api';
import {CurrentUserContext}  from '../contexts/CurrentUserContext';

export default function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); 
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); 
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [card, setCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]); 

  useEffect(() => { 
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
   }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLike(card._id, !isLiked).
        then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
        .catch((err)=> {
          console.lig(err)
        })
  }; 

 function handleCardDelete(card) {
   api.deleteCard(card._id).
      then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
      })
        .catch((err)=> {
        console.lig(err)
       })
  };

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
  };

  function handleUpdateAvatar(data) {
   api.setAvatarInfo(data).
      then((data) => {
      setCurrentUser({
        ...currentUser,
        avatar: data.avatar
      });
          closeAllPopups()
        })
        .catch(console.log)
  }

  function handleAddNewCard(card) {
    api.addNewCard(card.name, card.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch(console.log)
  };
    
  function handleEditProfileClick() { 
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);   
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setCard(card);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setCard({})
  };

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

       <AddPlacePopup
          isOpen={isAddPlacePopupOpen}  
          onClose={closeAllPopups}
          onAddPlace={handleAddNewCard}
       />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        /> 
       
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

