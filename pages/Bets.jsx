import BETS from '../lib/Bets_data'
import styles from '@/styles/Home.module.css'
import BetRow from './BetRow';

function Bets(props){
const splits = [0,2,5,14,22,27,34]



return(<div className={styles?.bets}>
        {splits?.map((s,j,arr)=>{
            if(j>=(arr?.length-1)) return <div key={`bet-row-${j}`} />;
            const next = arr[j+1];
            console.log(next ,"next");

            console.log(s,j,arr[j+1]);
            return(
                <BetRow 
                    key = {`bet-row-${j}`} 
                    {...props} 
                    current_bets={props?.current_bets?.slice(s,next)}
                    bets={BETS?.slice(s,next)}
                    j={j}
                    s={s}
                    />

            )
        }
        )}
            

    </div>)
}
export default Bets;
