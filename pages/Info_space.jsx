import PlayingCard from "./PlayingCard";
import styles from '@/styles/Home.module.css'
function Info_space(props){

    
return (
    <div className={styles.Info_space} >
        <div>
           point: {props.point} <br />
            {props.timeLeft>0?`time left to bet: ${props.timeLeft}`:"no more bets"}
            <br />
            current value:{props.current_value} <br />
            current $: {props.money} <br />
            cards left: {props.deck?.length}< br />

        </div>
    </div>
)




}


export default Info_space;
