import {api} from './../utils/Api';
export default function Main({onEditProfile, onAddPlace, onEditAvatarClick, userName, userDescription}) {
   
  return (
  <main>
    <section className="profile">
        <div className="profile__about-whom">
            <div className="profile__hover-img">
                 <img className="profile__foto" 
                      // style={{ backgroundImage: `url(${userAvatar})` }} 
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
    </section>
            
  </main>
    );
  }
  
 