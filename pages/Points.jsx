import styles from '@/styles/Home.module.css'
import PlayingCard from './PlayingCard';

function Points(props){
    return(<div className={styles.points}>

        {props.list.map((x,i)=><div
            key={`point-${i}`} 
            className={x.on==true?styles.onPoint:styles.offPoint}
        >
            <div className={styles.pointName}>{x.name}</div>
            <div className={styles.pointValue}>
                {x.value}
                </div>
                <div className={styles.pointBin}>
                    {
                    x.bin.map((h,j)=><div key={`bin-${i}-${j}`} className={styles.points_hand}> {h.cards.map(c=><PlayingCard {...c}  />)}</div>)
                    }
                    </div>
            </div>)
}
    </div>)
}
export default Points;
