import PlayingCard from "./PlayingCard";
import styles from '@/styles/Home.module.css'
function Deck_space(props) {


    return (
        <div className={styles.Deck_space_outer} >
            <div className={styles.Deck_space}>

                {!props.currently_betting ? <button onClick={props.onClick}>draw a set of cards</button> : <button>wait to draw</button>}
                <div className={styles.Deck_space_inner} ><div>

                    <div className={styles.deck}>deck <br />
                        {props.deck.map((x, i) => <div 
                            key={`deck-card${i}`}
                            className={styles.facedownCard}>{i}</div>)}
                    </div>
                </div>
                </div>
                <div
                    className={styles.played}
                >
                    {props.played.map((x, i) => <PlayingCard
                        key={`p`+i}
                        suit={x?.suit}
                        value={x?.value}
                        name={x?.name}
                    />)}
                </div>

            </div>

        </div>
    )




}


export default Deck_space;
