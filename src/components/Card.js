export default function Card(props) {

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
                <button className="element__close-icon" 
                        type="button">
                </button>
                <div className="element__mask-group">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="element__like-container">
                        <button className="element__like element__click" 
                                type="button"
                        >
                        </button>
                        <span className="element__span-like"></span>
                    </div>
                </div>
            </div>
    ) 
}