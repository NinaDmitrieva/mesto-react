import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopupOpen({isOpen, onClose, onCardDelete, card}) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card)
  };

  return(

    <PopupWithForm 

          title='Вы уверены?' 
          name='confirm' 
          btnText='Да' 
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >  
    </PopupWithForm>
  )
}