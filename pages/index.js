import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Deck_space from './Deck_space'
import { useEffect } from 'react'
import BETS from './Bets_data'
import Bets from './Bets'
import Points from './Points'
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
    const [win_on,set_win_on]=useState(11);
    const [streak,set_streak]=useState(0)
    const [draw_count,set_draw_count]=useState(2);
    const [point,set_points]=useState(0);
    const [deck_count,set_deck_count]=useState(4)
    const [deck,set_deck]=useState([])
    const [played,set_played]=useState([])
    const [discard,set_discard]=useState([])
    const [current_bets,set_current_bets]=useState(Array(BETS.length).fill(0));
    const [timeLeft, setTimeLeft] = useState(bet_time);

    useEffect(() => {
        if (!timeLeft) {
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
    function payout(c1,c2){
        console.log("paying out");
        for(let i=0;i< BETS.length;i++){
            const v = c1.value+c2.value;
            const win_amount = BETS[i].calculate(c1,c2,v,point,discard.length==0?0:7,current_bets[i]);
            console.log("calculating bets",BETS[i],win_amount,c1,c2,v)
        
            set_money(prev=>prev+win_amount)
            set_casino_money(prev=>prev-win_amount);
        }
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
        set_money(prev=>prev+=amount);
    }
    function reset(signal){
        const cards_to_return = [...discard,...played];
        set_played([]);
        set_discard([]);
        set_points(0)
        set_deck(prev=>shuffle([...prev,...cards_to_return]));
        handle_reset_bets(signal);
    }
    function handle_reset_bets(signal){
        let clear_arr=[]
        for(let i=0;i<BETS.length;i++){
            
            if(BETS[i].once){
                clear_arr.push(1);
            }else if(BETS[i].clear_ons.some(s=>s==signal)){
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
    function Draw(){
        console.log("click");
        const cards = [deck[0],deck[1]]
        if(played.length>0){
            set_discard(prev=>[...prev,...played])
            set_played([]);
        }
        set_deck(prev=>prev.slice(2))
        set_played(prev=>[...cards]);
        const draw_value = cards[0].value+cards[1].value
        if(point==0&&draw_value!=win_on){
            //set first point, else win on else check if lose
            set_streak(streak+1);
            set_currently_betting(true);
            setTimeLeft(bet_time);
            set_points(draw_value);
        }else if(point==draw_value){
            console.log("WIN!!!")
            set_win_count(prev=>prev+1);
            set_current_bets((prev)=>prev.map((x,i)=>i==1?0:x))
            set_currently_betting(true)
            reset('win')
        }else if(draw_value==win_on){
            console.log("LOSE")
            set_streak(0);
            set_current_bets(prev=>prev.map(x=>0))
            set_lose_count(prev=>prev+1);
            setTimeLeft(bet_time);
            set_currently_betting(true)
            reset("lose");

        }else{
            console.log("game continues...");
            set_streak(prev=>prev+1);

            set_currently_betting(true)
            setTimeLeft(bet_time);
        }
        payout(cards[0],cards[1])
        handle_reset_bets(`v${draw_value}`);
    }   

    return (
    <>
      <Head>
        <title>crap-jack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.points_and_play_area}>
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
        <Deck_space 
            point={point} 
            deck={deck} 
            played={played} 
            discard={discard} 
            onClick={Draw} 
            currently_betting={currently_betting}
            timeLeft={timeLeft}
            money={money}
            current_value={played[0]?.value+played[1]?.value}
            />
            <Points list = {
                [
                    {value:2,"name":"two", on:point==2},
                    {value:3,"name":"three", on:point==3},
                    {value:4,"name":"four", on:point==4},
                    {value:5,"name":"five", on:point==5},
                    {value:6,"name":"six", on:point==6},
                    {value:7,"name":"seven", on:point==7},
                    {value:8,"name":"eight", on:point==8},
                    {value:9,"name":"nine", on:point==9},
                    {value:10,"name":"ten", on:point==10},
                    {value:12,"name":"twelve", on:point==12},
                    {value:13,"name":"thirteen", on:point==13},
                    {value:14,"name":"fourteen", on:point==14},
                    {value:15,"name":"fifteen", on:point==15},
                    {value:16,"name":"sixteen", on:point==16},
                    {value:17,"name":"seventeen", on:point==17},
                    {value:18,"name":"eighteen", on:point==18},
                    {value:19,"name":"nineteen", on:point==19},
                    {value:20,"name":"twenty", on:point==20},
                ]} />
        </div>
            <Bets current_bets={current_bets} currently_betting={currently_betting} handleAdd={handleAdd} handleClear={handleClear} />
      </main>
    </>
  )
}
