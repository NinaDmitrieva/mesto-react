import React from 'react';
export default function ImagePopup(props) {

  return(

  <section className={`popup popup_open-foto ${props.card.name && 'popup_activ'}`}>

  <div className="popup__block-img">

      <button className="popup__close-icon popup__foto-close" 
      type="button" 
      onClick={props.onClose}
      ></button>

      <img className="popup__img-open" 
            alt = {props.card.name} 
            src = {props.card.link}
        />
      <h3 className="popup__foto-name">
            {props.card.name}
      </h3>

  </div>
</section>
  )
}