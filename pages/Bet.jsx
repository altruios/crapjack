import styles from '@/styles/Home.module.css'

function Bet(props){
    return (<div className={styles?.bet} onClick={props?.currently_betting?props?.handleAdd:null}>
            {props?.currently_betting?<button onClick={props?.handleClear}>clear</button>:null}
            <div className={props?.currently_betting?styles?.bettable_label:styles?.bet_label}>
                {props?.label}
                </div>
            odds: {props?.odds}/1<br />
            {props?.once?"one time bet":""}<br />
            current bet: {props?.amount}<br />
            {props?.mod>0?`multiply with ${props?.mod} cards drawn`:null}
    
            
    </div>)
    }
export default Bet;
