import BETS from './Bets_data'
import styles from '@/styles/Home.module.css'

function Bets(props){
    return(<div className={styles.bets}>
        <div className={styles.bet_row}>

        {[BETS[0],BETS[1]].map((x,i)=><Bet 
            key = {`bet-${i}`}

            amount={props.current_bets[i]}
            currently_betting={props.currently_betting}
            handleAdd={()=>props.handleAdd(i)} 
            handleClear={()=>props.handleClear(i)}
            label={x.label} 
            odds={x.odds} 
            once={x.once} 
            mod={x.mod_threshold}
            /> )}

        </div>
        <div className={styles.bet_row}>

{BETS.slice(2,5).map((x,i)=><Bet 
    key = {`bet-${i}`}

    amount={props.current_bets[i+2]}
    currently_betting={props.currently_betting}
    handleAdd={()=>props.handleAdd(i+2)} 
    handleClear={()=>props.handleClear(i+2)}
    label={x.label} 
    odds={x.odds} 
    once={x.once} 
    mod={x.mod_threshold}

    /> )}
</div>


<div className={styles.bet_row}>

{BETS.slice(5,14).map((x,i)=><Bet 
    key = {`bet-${i}`}

    amount={props.current_bets[i+5]}
    currently_betting={props.currently_betting}
    handleAdd={()=>props.handleAdd(i+5)} 
    handleClear={()=>props.handleClear(i+5)}
    label={x.label} 
    odds={x.odds} 
    once={x.once} 
    mod={x.mod_threshold}

    /> )}
</div>


<div className={styles.bet_row}>

{BETS.slice(14,22).map((x,i)=><Bet 
    key = {`bet-${i}`}

    amount={props.current_bets[i+14]}
    currently_betting={props.currently_betting}
    handleAdd={()=>props.handleAdd(i+14)} 
    handleClear={()=>props.handleClear(i+14)}
    label={x.label} 
    odds={x.odds} 
    once={x.once} 
    mod={x.mod_threshold}

    /> )}
</div>


<div className={styles.bet_row}>

{BETS.slice(22,27).map((x,i)=><Bet 
    key = {`bet-${i}`}

    amount={props.current_bets[i+22]}
    currently_betting={props.currently_betting}
    handleAdd={()=>props.handleAdd(i+22)} 
    handleClear={()=>props.handleClear(i+22)}
    label={x.label} 
    odds={x.odds} 
    once={x.once} 
    mod={x.mod_threshold}

    /> )}
</div>


<div className={styles.bet_row}>

{BETS.slice(27,34).map((x,i)=><Bet 
    key = {`bet-${i}`}
    amount={props.current_bets[i+30]}
    currently_betting={props.currently_betting}
    handleAdd={()=>props.handleAdd(i+30)} 
    handleClear={()=>props.handleClear(i+30)}
    label={x.label} 
    odds={x.odds} 
    once={x.once} 
    mod={x.mod_threshold}

    /> )}
</div>

    </div>)
}
function Bet(props){
return (<div className={styles.bet} onClick={props.currently_betting?props.handleAdd:null}>
        {props.currently_betting?<button onClick={props.handleClear}>clear</button>:null}
        <div className={props.currently_betting?styles.bettable_label:styles.bet_label}>
            {props.label}
            </div>
        odds: {props.odds}/1<br />
        {props.once?"one time bet":""}<br />
        current bet: {props.amount}<br />
        {props.mod>0?`multiply with ${props.mod} cards drawn`:null}

        
</div>)
}
export default Bets;
