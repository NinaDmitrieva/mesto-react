
export default function Main({onEditProfile, onAddPlace, onEditAvatarClick}) {

// function handleAddPlaceClick() {
//   const popupSaveImg = document.querySelector('.popup_foto');
//   popupSaveImg.classList.add('popup_activ')
// }

// function handleEditAvatarClick() {
//   const popupUpdateAvatar = document.querySelector('.popup_update');
//   popupUpdateAvatar.classList.add('popup_activ')
// }

  return (
  <main>
    <section className="profile">
        <div className="profile__about-whom">
            <div className="profile__hover-img">
                 <img className="profile__foto" 
                      alt="Аватар" 
                      src='' 
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
                        <h1 className="profile__title">Жак-Ив Кусто </h1>
                  </div>
                    <h2 className="profile__subtitle">Исследователь океана</h2>
            </div>
        </div>

        <button className="profile__add-button" 
                onClick={onAddPlace} 
                type="button">
        </button>
                
    </section>

    <section className="elements">    
    </section>
            
  </main>
    );
  }
  
 