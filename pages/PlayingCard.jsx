import styles from '@/styles/Home.module.css'
function PlayingCard(props){


    return (
    
        
        <section className={styles.card}>

        <section className={styles[props.suit]} value={props.value}>
   
		<div className={{...styles.card__inner, ...styles['--centered']}}>
			<div className={styles.card__column}>
				<div className={styles.card__symbol}>{props.name}</div>
			</div>
		</div>
	</section>

        </section>




    
    
    )
}
export default PlayingCard



