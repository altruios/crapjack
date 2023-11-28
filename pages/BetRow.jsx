import styles from '@/styles/Home.module.css'
import Bet from './Bet';


function BetRow(props){
    console.log("test", props?.current_bets?.length==props?.bets?.length)
    console.log("bet row props");
      return(
        <div 
        key={`bet-row-${props?.j}`}
    className={styles?.bet_row}>

{props?.bets?.map((x,i)=><Bet 
key = {`bet-${i}`}

amount={props?.current_bets&&props.current_bets[i]}
currently_betting={props?.currently_betting}
handleAdd={()=>props?.handleAdd(i+props?.s)} 
handleClear={()=>props?.handleClear(i+props?.s)}
label={x?.label} 
odds={x?.odds} 
once={x?.once} 
mod={x?.mod_threshold}
/>)}
</div>
)
}

export default BetRow
