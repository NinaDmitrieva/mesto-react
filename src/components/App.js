import React, { useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import {api} from './../utils/Api';

function App() {
  
  const [isPopupProfileOpen, setPopupProfileOpened] = React.useState(false); //хук для открытия попапа профайла
  const [isPopupSaveNewPhoto, setPopupSaveNewPhoto] = React.useState(false); //попап, сохраняющий картинку
  const [isPopupAvatarUpdate, setPopupAvatarUpdate] = React.useState(false); //попап, меняющий аватар
  ///const [isuserInfo, setUserInfo] = React.useState({}); //получаем данные о пользователе
//   const [userAvatar, setUserAvatar] = React.useEffect('avatar');
  const [userName, setUserName] = React.useEffect('name');
  const [userDescription, setUserDescription] = React.useEffect('about')
//   const [card, setCardInfo] = React.useState([]); //получаем данные о пользователе

  //блок функций, открывающих попап
  function handleEditProfileClick() { 
    setPopupProfileOpened(true);
  }

  function handleAddPlaceClick() {
    setPopupSaveNewPhoto(true);   
  }

  function handleEditAvatarClick() {
    setPopupAvatarUpdate(true);
  }

  //закрытие попапа
  function closeAllPopups() {
    setPopupProfileOpened(false)
    setPopupSaveNewPhoto(false)
    setPopupAvatarUpdate(false)
  }

  //запрос данных о пользователе и карточки
  React.useEffect(() => {
  api.getUserInfo()
        .then((data) => {
        // setUserAvatar(data.avatar);
        setUserName(data);
        setUserDescription(data);
        console.log(data)
    })
        // .then(()=> {
        // initCards()
        // })
            .catch((err) => {
        console.log(err);
    })
 }, [])
  
  //запрос данных о карточках
//   React.useEffect(() => {

//   })

// запрос на карточки
//  function initCards(id) {
//     api.getInitialCards()
//         .then((data) => {
//             cardsList.setData(data)
//             cardsList.renderItems(id)
//     })
//         .catch((err) => {
//             console.log(err)
//     })
// }

    return (
     
<div className="root">
  <div className="page">
        <Header />
        <Main 
        onEditProfile={handleEditProfileClick} //протаскиваем отработчик из майна профайл
        onAddPlace={handleAddPlaceClick} // новая картинка
        onEditAvatarClick={handleEditAvatarClick} //аватар 
        // setUserAvatar={userAvatar}
        userName={userName}
        userDescription = {userDescription}
       

        />
        <Footer />
        <PopupWithForm title='Редактировать профиль' name='_profile' isOpen={isPopupProfileOpen} btnText='Сохранить' onClose={closeAllPopups}>
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

        <PopupWithForm title='Новое место' name='foto' isOpen={isPopupSaveNewPhoto} btnText='Создать' onClose={closeAllPopups}>
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

       <PopupWithForm title='Обновить аватар' name='update' isOpen={isPopupAvatarUpdate} btnText='Сохранить' onClose={closeAllPopups}>
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
