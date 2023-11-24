import styles from '@/styles/Home.module.css'

function Points(props){
    return(<div className={styles.points}>
        {props.list.map(x=><div className={x.on==true?styles.onPoint:styles.offPoint}>
            <div className={styles.pointName}>{x.name}</div>
            <div className={styles.pointValue}>
                {x.value}
                </div>
            </div>)
}
    </div>)
}
export default Points;
