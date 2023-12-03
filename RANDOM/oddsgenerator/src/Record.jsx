
function Record(props){

    return (<div className="record">
        {props?.list?.map((x,i)=>i>props.limit?null:<div key={`record-${i}`}>
            <div >value: {x.value}</div> 
            <div > {x?.codes?.map((y,j)=><div key={`record-codes-${j}`}>{y}</div>)} </div>
        </div>)}
    </div>)

}
export default Record
