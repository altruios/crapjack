import { useState , useEffect } from 'react'
import Record from './Record'
import shuffle from './shuffle'
const SIGNALS=[
    "WIN","DREAD","MATCHED-SUITS",
    "TENS","JACKS","QUEENS","KINGS",
    "HARD-12","HARD-14","HARD-16","HARD-18",
    "DIAMONDS","HEARTS","SPADES","CLUBS",
    "ROYALS","PLEBS","FULL-X"
]


function mod_to_card(num){
    const suits = {0:"heart",1:"diamond",2:"spade",3:"club"}
    const names = {0:"ace",1:"two",2:"three",3:"four", 4: "five",5: "six",6: "seven",7: "eight",8: "nine",9: "ten",10: "jack",11: "queen",12:"king"}
    const value = num%13+1;
    const suit = suits[Math.floor(num/13)];
    const _name = names[value-1];

    return {name:_name,value:Math.min(value,10),suit}
}
function export_record_of_game(list,clearFn){



    clearFn([]);
}




export default function Home() {
    console.log("wa")
    const first_point=20;
    const first_dread=[11];
    const second_dread=[11,20];
    const [start,setStart]=useState(false);
    const [bet_time,set_bet_time]=useState(1);
    const [currently_betting,set_currently_betting]=useState(true);
    const [streak,set_streak] = useState(0);
    const [value,set_value]=useState(0);
    const [dread,set_dread]=useState([11])
    const [point,set_point]=useState(20);
    const [deck_count,set_deck_count]=useState(11);
    const [deck,set_deck]=useState([])
    const [played,set_played]=useState([])
    const [discard,set_discard]=useState([])
    const [timeLeft, setTimeLeft] = useState(bet_time);
    const [record,set_record]=useState([]);
    const [round_record,set_round_record]=useState([]);
    const [played_hands,set_played_hands]=useState([]);
    const [made_bucket,set_made_bucket]=useState([0,0,0,0,0,0,0,0,0,0]);
    useEffect(()=>{
        console.log("made bucket");
        made_bucket.forEach((m,i)=>{
            if(m>=3)set_dread(prev=>Array.from(new Set([...prev,i+11])))
            if(m==0)set_dread(prev=>prev.filter(x=>x!=m))
        })
    },[made_bucket])
    
    useEffect(()=>{
        console.log("this runs at start")
      let deck=[];
      for(let j=0;j<deck_count;j++){
          for(let i=0;i<52;i++){
              deck.push(mod_to_card(i))
            }
        }
        set_deck(shuffle(deck))
        console.log("deck set"," deck",deck);
  },[])
  useEffect(()=>{
    console.log(round_record.reduce((acc,x)=>x.win?acc+=1:acc,0),"wins");
  },[round_record])
  
    function card_feature_signals(cards){
        const signals =[]
        const rc = ['jack','queen','king'];
        const v = cards.reduce((acc,item)=>acc+=item.value,0);
        if(point==v)signals.push(SIGNALS[0])
        if(dread.includes(d=>d==v))signals.push(SIGNALS[1])
        if(cards.every((c,i,arr)=>c.suit==arr[0].suit))signals.push(SIGNALS[2])
        if(cards.every((c,i,arr)=>c.name=="ten"))signals.push(SIGNALS[3])
        if(cards.every((c,i,arr)=>c.name=="jack"))signals.push(SIGNALS[4])
        if(cards.every((c,i,arr)=>c.name=="queen")) signals.push(SIGNALS[5])
        if(cards.every((c,i,arr)=>c.name=="king"))  signals.push(SIGNALS[6])
        if(cards.every((c,_,arr)=>c.value==2)&&v==12)signals.push(SIGNALS[7])
        if(cards.every((c,_,arr)=>c.value==2)&&v==14)signals.push(SIGNALS[8])
        if(cards.every((c,_,arr)=>c.value==2)&&v==16)signals.push(SIGNALS[9])
        if(cards.every((c,_,arr)=>c.value==2)&&v==18)signals.push(SIGNALS[10])
        if(cards.every((c,_,arr)=>c.suit=="diamond"))signals.push(SIGNALS[11])
        if(cards.every((c,_,arr)=>c.suit=="spade"))signals.push(SIGNALS[12])
        if(cards.every((c,_,arr)=>c.suit=="club"))signals.push(SIGNALS[13])
        if(cards.every((c,_,arr)=>c.suit=="heart"))signals.push(SIGNALS[14])
        if(cards.every(c=>rc.some(x=>x==c.name)))signals.push(SIGNALS[15])
        if(cards.every(c=>rc.every(x=>x!=c.name)))signals.push(SIGNALS[16]);
        if(cards.every((c,_,arr)=>c.name==arr[0].name&&c.value>9))signals.push(SIGNALS[17]);
        return signals;
    }
    function reset(){
        console.log("reset")
        const cards_to_return = [...discard,...played];
        set_played([]);
        set_discard([]);
        set_point(20);
        set_dread([11])
        set_deck(prev=>shuffle([...prev,...cards_to_return]));
        set_played_hands([]);
        const has_won =record.length&&record[record.length-1].codes.includes(SIGNALS[0]);
        set_round_record(prev=>[...prev,{raw:record,win:has_won}]);
        set_record([]);
    }
    
    function sumValue(cards){
        return cards.reduce((acc,item)=>acc+=item.value,0);
    }

    
    useEffect(()=>{
        console.log("game tick");
        if(streak==0){
            console.log("tis a reset, yes?")
        }
        if(streak>0){
            console.log("this is first")
            const b_win = point == value;
            const b_lose = dread.includes(x=>x==value);
            const b_next = (!b_lose)&&(!b_win);
          
                
            if(b_next){
                console.log("game continues...");
                const signals = [`v${value}`,...card_feature_signals(played)]
                set_record(prev=>[{value,codes:signals},...prev])
                
            }
            if(b_win||b_lose)reset();
        }
        setTimeLeft(bet_time);
        set_currently_betting(true)
    },[streak])
    useEffect(()=>{
        console.log("dread change");
    },[dread])
    useEffect(()=>{
        console.log("value")
        set_made_bucket(prev=>prev.map((x,i)=>((i+11)==value?++x:x)))
    },[value])
    
    useEffect(()=>{
        console.log("played effect");
        set_deck(prev=>prev.slice(played.length))
        set_value(played.reduce((acc,item)=>acc+=item.value,0));
        set_played_hands(prev=>[...prev,
            {cards:played,value,codes:card_feature_signals(played),draw_count:played.length}
        ])
    
    },[played])
    useEffect(()=>{
        console.log("played hands");
        const b_first =point==first_point;
        if(b_first){
            set_point(value);   
            set_streak(0)
        }
        //only once played hands changes and everything is updated do we evaluate game state;
        set_streak(prev=>prev+=1)
    },[played_hands])
    
    useEffect(()=>{
        console.log("set dread");
        if(played_hands.length==1){
            set_dread(first_dread)
        }else{
            set_dread(second_dread)
        }
    },[point])
    function Draw(){
        console.log("click",played.length);
    
        if(played.length>0){
            console.log("setting discard");
            set_discard(prev=>[...prev,...played])
        }    
        console.log("deck",deck);
        const hand = deck.reduce((acc,item)=>{
            if(sumValue(acc)>10)return acc
            acc.push(item);
            return acc;
        },[])
        set_played(hand);
        console.log("played",played,hand);
    }
    
    useEffect(() => {
        console.log("counting")
        if (timeLeft<=0) {
            set_currently_betting(false);    
            console.log("about to draw");
            Draw();
        };
        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
      }, [timeLeft]);
    return (
    <>

      <main>
        {console.log(record)}
        <Record list={record} limit={30} />

      </main>
    </>
  )
}
