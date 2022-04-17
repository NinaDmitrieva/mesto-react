export default function Card(props) {

    return (
        <template id="card" className="card-template">
            <div className="element"> 

                <img className="element__foto" 
                        alt = {props.card.name} 
                        src = {props.card.link}
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
        </template> 
    ) 
}