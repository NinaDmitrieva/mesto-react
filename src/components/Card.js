import {CurrentUserContext}  from '../contexts/CurrentUserContext';
import React from 'react';
export default function Card(props) {

const currentUser = React.useContext(CurrentUserContext);

const isOwn = props.card.owner._id === currentUser._id;

const cardDeleteButtonClassName = (
  `element__close-icon${isOwn ? ' ' : '_remove'}`
);

// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = props.card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = (
   `element__click ${isLiked ? 'element__like_activ' : 'element__like'}`); 

 function handleClick() {
  props.onCardClick(props.card);
 }  
    return (   
            <div className="element"> 

                <img className="element__foto" 
                        alt = {props.card.name} 
                        src = {props.card.link}
                        onClick={handleClick}
                />
                <button className={cardDeleteButtonClassName}
                        type="button"
                >
                </button>
                <div className="element__mask-group">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="element__like-container">
                        <button className={cardLikeButtonClassName}
                                type="button"
                        >
                        </button>
                        <span className="element__span-like">{props.card.likes.length}</span>
                    </div>
                </div>
            </div>
    ) 
}