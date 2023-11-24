import BETS from './Bets_data'
import styles from '@/styles/Home.module.css'

function Bets(props){
    return(<div className={styles.bets}>
        <div className={styles.bet_row}>

        {[BETS[0],BETS[1]].map((x,i)=><Bet 
            amount={props.current_bets[i]}
            currently_betting={props.currently_betting}
            handleAdd={()=>props.handleAdd(i)} 
            handleClear={()=>props.handleClear(i)}
            label={x.label} 
            odds={x.odds} 
            once={x.once} 
            /> )}

        </div>
        <div className={styles.bet_row}>

{BETS.slice(2,7).map((x,i)=><Bet 
    amount={props.current_bets[i+2]}
    currently_betting={props.currently_betting}
    handleAdd={()=>props.handleAdd(i+2)} 
    handleClear={()=>props.handleClear(i+2)}
    label={x.label} 
    odds={x.odds} 
    once={x.once} 
    /> )}
</div>


<div className={styles.bet_row}>

{BETS.slice(7,12).map((x,i)=><Bet 
    amount={props.current_bets[i+7]}
    currently_betting={props.currently_betting}
    handleAdd={()=>props.handleAdd(i+7)} 
    handleClear={()=>props.handleClear(i+7)}
    label={x.label} 
    odds={x.odds} 
    once={x.once} 
    /> )}
</div>


<div className={styles.bet_row}>

{BETS.slice(12,20).map((x,i)=><Bet 
    amount={props.current_bets[i+12]}
    currently_betting={props.currently_betting}
    handleAdd={()=>props.handleAdd(i+12)} 
    handleClear={()=>props.handleClear(i+12)}
    label={x.label} 
    odds={x.odds} 
    once={x.once} 
    /> )}
</div>


<div className={styles.bet_row}>

{BETS.slice(20,28).map((x,i)=><Bet 
    amount={props.current_bets[i+20]}
    currently_betting={props.currently_betting}
    handleAdd={()=>props.handleAdd(i+20)} 
    handleClear={()=>props.handleClear(i+20)}
    label={x.label} 
    odds={x.odds} 
    once={x.once} 
    /> )}
</div>


<div className={styles.bet_row}>

{BETS.slice(28,33).map((x,i)=><Bet 
    amount={props.current_bets[i+28]}
    currently_betting={props.currently_betting}
    handleAdd={()=>props.handleAdd(i+28)} 
    handleClear={()=>props.handleClear(i+28)}
    label={x.label} 
    odds={x.odds} 
    once={x.once} 
    /> )}
</div>


<div className={styles.bet_row}>

{BETS.slice(33,36).map((x,i)=><Bet 
    amount={props.current_bets[i+33]}
    currently_betting={props.currently_betting}
    handleAdd={()=>props.handleAdd(i+33)} 
    handleClear={()=>props.handleClear(i+33)}
    label={x.label} 
    odds={x.odds} 
    once={x.once} 
    /> )}
</div>


<div className={styles.bet_row}>

{BETS.slice(36,40).map((x,i)=><Bet 
    amount={props.current_bets[i+36]}
    currently_betting={props.currently_betting}
    handleAdd={()=>props.handleAdd(i+36)} 
    handleClear={()=>props.handleClear(i+36)}
    label={x.label} 
    odds={x.odds} 
    once={x.once} 
    /> )}
</div>

    </div>)
}
function Bet(props){
return (<div className={styles.bet}>
        <div className={styles.betLabel}>
            {props.label}
            </div>
        odds: {props.odds}/1<br />
        {props.once?"one time bet":""}<br />
        current bet: {props.amount}<br />
        {props.currently_betting?<div>

        <button onClick={props.handleAdd}>add minimum bet</button><button onClick={props.handleClear}>clear</button></div>:null}
        
</div>)
}
export default Bets;
