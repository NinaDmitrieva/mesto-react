import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {api} from './../utils/Api';
import {CurrentUserContext}  from '../contexts/CurrentUserContext';
import ConfirmPopupOpen from './ConfirmPopup';

export default function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); 
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); 
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [renderLoading, setRenderLoading] = useState(false);

  const [card, setCard] = useState({});
  const [deletedPopup, setDeletedPopup] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]); 

  function handleConfirmClick(card) {
    setConfirmPopupOpen(true);
    setDeletedPopup(card);
}

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
  setRenderLoading(true)
   api.deleteCard(card._id).
      then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
      closeAllPopups()
      })
        .catch((err)=> {
        console.log(err)
       })
       .finally(()=>{
        setRenderLoading(false)
       })

  };

  function handleChangeUser(user) {
    setRenderLoading(true)
    api.setUserInfo(user.name, user.about).
      then((userData) => {
      setCurrentUser({
        ...currentUser,
        name: userData.name,
        about: userData.about
      });
        closeAllPopups()
       })
       .catch((err)=> {
        console.log(err)
       })
       .finally(()=> {
        setRenderLoading(false)
       })
  };

  function handleUpdateAvatar(data) {
   setRenderLoading(true)
   api.setAvatarInfo(data).
      then((data) => {
      setCurrentUser({
        ...currentUser,
        avatar: data.avatar
      });
          closeAllPopups()
        })
        .catch((err)=> {
          console.log(err)
         })
        .finally(()=>{
          setRenderLoading(false)
        })
  }

  function handleAddNewCard(card) {
    setRenderLoading(true)
    api.addNewCard(card.name, card.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err)=> {
      console.log(err)
     })
     .finally(()=>{
      setRenderLoading(false)
     })
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
    setConfirmPopupOpen(false)
    setCard({})
    setDeletedPopup({})
  };

  // function handleEscClose(e) {
  //   if (e.key === 'Escape') {
  //     closeAllPopups()
  //   }
  // }

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
        onCardDelete={handleConfirmClick}
        cards={cards}
        />
        <Footer />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen}  
          onClose={closeAllPopups}
          onUpdateUser={handleChangeUser}
          renderLoading={renderLoading}
        />

       <AddPlacePopup
          isOpen={isAddPlacePopupOpen}  
          onClose={closeAllPopups}
          onAddPlace={handleAddNewCard}
          renderLoading={renderLoading}
       />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          renderLoading={renderLoading}
        /> 
       
        <ConfirmPopupOpen
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={deletedPopup}
          renderLoading={renderLoading}
        />

        <ImagePopup 
          card={card} 
          onClose={closeAllPopups}
        
        />
  </div>
</div>
</CurrentUserContext.Provider>
  );
}

