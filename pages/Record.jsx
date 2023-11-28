import styles from '@/styles/Home.module.css'

function Record(props){

    return (<div className={styles.Record}>
        {props.list.map((x,i)=>i>props.limit?null:<div key={`record-${i}`}>
            <div >value: {x.value}</div> 
            <div > {x.codes.map((y,j)=><div key={`record-codes-${j}`}>{y}</div>)} </div>
        </div>)}
    </div>)

}
export default Record
