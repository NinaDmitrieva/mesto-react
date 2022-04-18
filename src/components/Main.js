import React, { useEffect } from 'react';
import {api} from './../utils/Api';
import Card from './Card';

export default function Main({onEditProfile, onAddPlace, onEditAvatarClick, onCardClick}) {

  const [userAvatar, setUserAvatar] = React.useState();
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [cards, setCards] = React.useState([]); 

  React.useEffect(() => {
    api.getUserInfo()
        .then((data) => {
          setUserAvatar(data.avatar);
          setUserName(data.name);
          setUserDescription(data.about);
        })
            .catch((err) => {
            console.log(err);
          })

          api.getInitialCards()
          .then((cards) => {
            setCards(cards)
            console.log(cards)
          });
   }, [])
   
  return (
  <main>
    <section className="profile">
        <div className="profile__about-whom">
            <div className="profile__hover-img">
                 <img className="profile__foto" 
                      src={userAvatar}
                      alt="Аватар" 
                      onClick={onEditAvatarClick} 
                      />

            </div>
            <div className="profile__profile-info">
                  <div className="profile__name">

                        <button className="profile__edit-button" 
                                onClick={onEditProfile} 
                                type="button"
                                >
                        </button>
                        <h1 className="profile__title">{userName}</h1>
                  </div>
                    <h2 className="profile__subtitle">{userDescription}</h2>
            </div>
        </div>

        <button className="profile__add-button" 
                onClick={onAddPlace} 
                type="button">
        </button>
                
    </section>

    <section className="elements">  

        {cards.map((card)=> (
          <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
            >
          </Card>
        ))}
    
    </section>
            
  </main>
    );
  }
  
 