import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Deck_space from './Deck_space'
import { useEffect } from 'react'
import BETS from '../lib/Bets_data'
import Bets from './Bets'
import Record from './Record'
import Points from './Points'
import Info_space from './Info_space'
function mod_to_card(num){
    const suits = {0:"heart",1:"diamond",2:"spade",3:"club"}
    const names = {0:"ace",1:"two",2:"three",3:"four", 4: "five",5: "six",6: "seven",7: "eight",8: "nine",9: "ten",10: "jack",11: "queen",12:"king"}
    const value = num%13+1;
    const suit = suits[Math.floor(num/13)];
    const _name = names[value-1];

    return {name:_name,value:Math.min(value,10),suit}
}
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
    const [bet_time,set_bet_time]=useState(15);
    const [casino_money,set_casino_money]=useState(1000000000)
    const [minimum_bet,set_minimum_bet]=useState(10);
    const [money,set_money]=useState(200);
    const [currently_betting,set_currently_betting]=useState(true);
    const [win_count,set_win_count]=useState(0)
    const [lose_count,set_lose_count]=useState(0)
    const [win_on,set_win_on]=useState(16);
    const [streak,set_streak]=useState(0)
    const [draw_count,set_draw_count]=useState(2);
    const [point,set_points]=useState(0);
    const [deck_count,set_deck_count]=useState(4)
    const [deck,set_deck]=useState([])
    const [played,set_played]=useState([])
    const [discard,set_discard]=useState([])
    const [current_bets,set_current_bets]=useState(Array(BETS.length).fill(0));
    const [timeLeft, setTimeLeft] = useState(bet_time);
    const [record,set_record]=useState([{value:0,codes:['start']}])
    const [played_hands,set_played_hands]=useState([]);

    useEffect(() => {
        if (timeLeft<=0) {
            set_currently_betting(false);    
        };
    
        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
    
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
      }, [timeLeft]);
    
    console.log("index");
    function card_feature_signals(cards){
        const signals =[];
        const rc = ['jack','queen','king'];
        const v = cards.reduce((acc,item)=>acc+=item.value,0);
        if(cards.every((c,i,arr)=>c.suit==arr[0].suit))signals.push("matched suits")
        if(cards.every((c,i,arr)=>c.name=="ten"))signals.push("tens")
        if(cards.every((c,i,arr)=>c.name=="jack"))signals.push("jacks")
        if(cards.every((c,i,arr)=>c.name=="queen")) signals.push("queens")
        if(cards.every((c,i,arr)=>c.name=="king"))  signals.push("kings")
        if(cards.every((c,_,arr)=>c.value==2)&&v==12)signals.push("hard 12")
        if(cards.every((c,_,arr)=>c.value==2)&&v==14)signals.push("hard 14")
        if(cards.every((c,_,arr)=>c.value==2)&&v==16)signals.push("hard 16")
        if(cards.every((c,_,arr)=>c.value==2)&&v==18)signals.push("hard 18")
        if(cards.every((c,_,arr)=>c.suit=="diamond"))signals.push("diamonds")
        if(cards.every((c,_,arr)=>c.suit=="spade"))signals.push("spades")
        if(cards.every((c,_,arr)=>c.suit=="club"))signals.push("clubs")
        if(cards.every((c,_,arr)=>c.suit=="heart"))signals.push("hearts")


        if(cards.every(c=>rc.some(x=>x==c.name)))signals.push("royals")
        if(cards.every(c=>rc.every(x=>x!=c.name)))signals.push("plebs");
        if(cards.every((c,_,arr)=>c.name==arr[0].name&&c.value>9))signals.push("fullx");
        return signals;
    }
    function payout(cs){
        console.log("paying out");
        const v = cs.reduce((acc,item)=>acc+=item.value,0);
        let total_win = 0;
        for(let i=0;i< BETS.length;i++){
            const win_amount = BETS[i].calculate(cs,v,point,discard.length==0?0:16,current_bets[i]);
            total_win+=win_amount;
        }
        set_casino_money(prev=>prev-total_win);
        set_money(prev=>prev+total_win)
    }
    function handleAdd(n){
        set_current_bets(prev=>{
            return prev.map((x,i)=>i==n?x+minimum_bet:x)
        })
        set_money(prev=>prev-minimum_bet)
    }
    function handleClear(n){
        const amount = current_bets[n];
        set_current_bets(prev=>{
            return prev.map((x,i)=>i==n?0:x)
        })
        console.log("amounts",amount);
        set_money(prev=>prev+=amount);
    }
    function reset(){
        const cards_to_return = [...discard,...played];
        set_played([]);
        set_discard([]);
        set_points(0)
        set_deck(prev=>shuffle([...prev,...cards_to_return]));
        set_played_hands([]);
    }
    function handle_reset_bets(signals){
        let clear_arr=[]
        for(let i=0;i<BETS.length;i++){
            
            if(BETS[i].once){
                clear_arr.push(1);
            }else if(BETS[i].clear_ons.some(s=>signals.some(z=>z==s))){
                    clear_arr.push(1);
            }else{
                clear_arr.push(0)
            }
        }
        set_current_bets(prev=>prev.map((x,i)=>clear_arr[i]?0:x))
    }
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
      useEffect(()=>{

        let deck=[];
        for(let j=0;j<deck_count;j++){
            for(let i=0;i<52;i++){
                deck.push(mod_to_card(i))
              }
          }
          set_deck(shuffle(deck))
    },[])
    function sumValue(cards){
        return cards.reduce((acc,item)=>acc+=item.value,0);
    }
    function Draw(){
        console.log("click");
        const cards = deck.reduce((acc,item)=>{
            if(sumValue(acc)>10)return acc
            acc.push(item);
            return acc;
        },[])
        if(played.length>0){
            set_discard(prev=>[...prev,...played])
            set_played([]);
        }
        set_deck(prev=>prev.slice(cards.length))
        const draw_value = cards.reduce((acc,item)=>acc+=item.value,0);
        set_played(prev=>[...cards]);
        set_played_hands(prev=>[...prev,{cards,value:draw_value}])
        const b_win =((point==draw_value) || (point==0&&draw_value==win_on));
        const b_lose = draw_value==win_on&&!b_win;
        if(point==0&&draw_value!=win_on){
            //set first point, else win on else check if lose
            set_streak(streak+1);
            set_currently_betting(true);
            setTimeLeft(bet_time);
            set_points(draw_value);
        }else if(b_win){
            console.log("WIN!!!")
            set_win_count(prev=>prev+1);
            set_current_bets((prev)=>prev.map((x,i)=>i==1?0:x))
            set_currently_betting(true)
            reset()
        }else if(b_lose){
            console.log("LOSE")
            set_streak(0);
            set_current_bets(prev=>prev.map(x=>0))
            set_lose_count(prev=>prev+1);
            setTimeLeft(bet_time);
            set_currently_betting(true)
            reset();

        }else{
            console.log("game continues...");
            set_streak(prev=>prev+1);

            set_currently_betting(true)
            setTimeLeft(bet_time);
        }
        payout(cards)
        const win_signal = b_lose?"lose":b_win?"win":null;
        const signals = [`v${draw_value}`,win_signal,...card_feature_signals(cards)]
        handle_reset_bets(signals);
        set_record(prev=>[{value:draw_value,codes:signals.slice(1)},...prev])
    }   

    return (
    <>
      <Head>
        <title>crap-jack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            rules:<br />
                each draw: draw {draw_count} cards. <br />
                first draw: win on {win_on}. set point otherwise. <br />
           
            wins {win_count} <br />
            losses {lose_count} <br />
            streak {streak}<br />
          </p>
          </div>
          <div className={styles.game_board}>

        <Record list={record} limit={30} />
        <Deck_space 
            point={point} 
            deck={deck} 
            played={played} 
            discard={discard} 
            onClick={Draw} 
            currently_betting={currently_betting}
            timeLeft={timeLeft}
            money={money}
            current_value={played.reduce((acc,item)=>acc+=item?.value||0,0)}
            />
            <Info_space 
            point={point} 
            currently_betting={currently_betting}
            timeLeft={timeLeft}
            money={money}
            deck={deck} 

            current_value={played.reduce((acc,item)=>acc+=item?.value||0,0)}
            />
            <Points list = {
                ["eleven","twelve","thirteen",
                   "fourteen","fifteen","remove","seventeen",
                   "eighteen","nineteen","twenty"]
                .map((x,i,a)=>({value:11+i,name:x,on:(point==(i+11)),bin:played_hands.filter((y)=>(y.value==(i+11))) }))
                .filter(x=>x.name!='remove')
} />
            <Bets current_bets={current_bets} 
                currently_betting={currently_betting} 
                handleAdd={handleAdd} 
                handleClear={handleClear} 
                />
                </div>
      </main>
    </>
  )
}
