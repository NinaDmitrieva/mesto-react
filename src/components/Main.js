import React, { useEffect } from 'react';
import {api} from './../utils/Api';
import Card from './Card';
import {CurrentUserContext}  from '../contexts/CurrentUserContext';

export default function Main({onEditProfile, onAddPlace, onEditAvatarClick, onCardClick, cards}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
  <main>
    <section className="profile">
        <div className="profile__about-whom">
            <div className="profile__hover-img">
                      {currentUser.avatar && (<img className="profile__foto" 
                      src={currentUser.avatar} 
                      alt="Аватар" 
                      onClick={onEditAvatarClick} />)}

            </div>
            <div className="profile__profile-info">
                  <div className="profile__name">

                        <button className="profile__edit-button" 
                                onClick={onEditProfile} 
                                type="button"
                                >
                        </button>
                        <h1 className="profile__title">{currentUser.name}</h1>
                  </div>
                    <h2 className="profile__subtitle">{currentUser.about}</h2>
            </div>
        </div>

        <button className="profile__add-button" 
                onClick={onAddPlace} 
                type="button"/>
           
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
  
  