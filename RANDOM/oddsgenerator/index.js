const SIGNALS=[
    "WIN","DREAD","MATCHED-SUITS",
    "TENS","JACKS","QUEENS","KINGS","ANY-2:20",
    "HARD-12","HARD-14","HARD-16","HARD-18",
    "DIAMONDS","HEARTS","SPADES","CLUBS",
    "ROYALS","PLEBS","FULL-X",
    'CL-2','CL-3','CL-4','CL-5','CL-6','CL-7','CL-8',
    'CL-9',"CL-10","CL-11"
]
function make_deck(){

    const deck_count=8;
    const deck=[];
    for(let j=0;j<deck_count;j++){
        for(let i=0;i<52;i++){
            deck.push(mod_to_card(i))
        }
    }
    return shuffle(deck)
}
function mod_to_card(num){
    const suits = {0:"heart",1:"diamond",2:"spade",3:"club"}
    const names = {0:"ace",1:"two",2:"three",3:"four", 4: "five",5: "six",6: "seven",7: "eight",8: "nine",9: "ten",10: "jack",11: "queen",12:"king"}
    const value = num%13+1;
    const suit = suits[Math.floor(num/13)];
    const _name = names[value-1];

    return {name:_name,value:Math.min(value,10),suit}
}
function sumValue(cards){
    return cards.reduce((acc,item)=>acc+=item.value,0);
}
function round(stop,r_o,point,dread,hand,value){
    r_o.sum_of_values_drawn[value]++;

    if(value==point){
        
        stop=true;
    }
    if(dread.some(x=>x==value)){

        stop=true;
    }
    const signals = card_feature_signals(hand,value,point,dread);
    for(const s of signals){
        r_o.sum_of_signals[s]+=1;
    }
    return stop;
}
function card_feature_signals(cards,value,point,dread){
    const signals =[]
    const rc = ['jack','queen','king'];
    const np = [...rc,"ace"];
    const v = value
    if(point==v)signals.push(SIGNALS[0])
    if(dread.some(d=>d==v))signals.push(SIGNALS[1])
    
    if(cards.every((c,_,arr)=>c.suit==arr[0].suit))signals.push(SIGNALS[2])
    if(cards.every((c,_,arr)=>c.name=="ten"))signals.push(SIGNALS[3])
    if(cards.every((c,_,arr)=>c.name=="jack"))signals.push(SIGNALS[4])
    if(cards.every((c,_,arr)=>c.name=="queen")) signals.push(SIGNALS[5])
    if(cards.every((c,_,arr)=>c.name=="king"))  signals.push(SIGNALS[6])
    if(value==20&&cards.length==2) signals.push(SIGNALS[7])
    if(cards.every((c,_,arr)=>c.value==6)&&v==12)signals.push(SIGNALS[8])
    if(cards.every((c,_,arr)=>c.value==7)&&v==14)signals.push(SIGNALS[9])
    if(cards.every((c,_,arr)=>c.value==8)&&v==16)signals.push(SIGNALS[10])
    if(cards.every((c,_,arr)=>c.value==9)&&v==18)signals.push(SIGNALS[11])
    if(cards.every((c,_,arr)=>c.suit=="diamond"))signals.push(SIGNALS[12])
    if(cards.every((c,_,arr)=>c.suit=="spade"))signals.push(SIGNALS[13])
    if(cards.every((c,_,arr)=>c.suit=="club"))signals.push(SIGNALS[14])
    if(cards.every((c,_,arr)=>c.suit=="heart"))signals.push(SIGNALS[15])
    if(cards.every(c=>rc.some(x=>x==c.name)))signals.push(SIGNALS[16])
    if(cards.every(c=>np.every(x=>x!=c.name)))signals.push(SIGNALS[17]);
    if(cards.every((c,_,arr)=>c.name==arr[0].name&&c.value>9))signals.push(SIGNALS[18]);
    signals.push(`CL-${cards.length?cards.length:0}`);
    return signals;
}
function make_hand(deck){
    return deck.reduce((acc,item)=>{
        if(sumValue(acc)>10)return acc
        acc.push(item);
        return acc;
    },[])
}
function game(){
    let deck = make_deck();
    let stop=false;
    const r_o={
        hand_count:0,
        hand_length:[],
        continue_count:0,
        sum_of_values_drawn:{11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0},
        sum_of_signals:SIGNALS.reduce((o,s)=>{o[s]=0;return o},{})
    }
    let point=20;
    let continue_count=0;
    let dread=[11];
    let drawn=[];
    while(!stop){
        const hand = make_hand(deck);
        const value =sumValue(hand);
        r_o.hand_count++;
        r_o.hand_length.push(hand.length);
        //never run out of cards
        deck=deck.slice(hand.length);
        deck.push(...hand);
        
        drawn.push(value);
        if(drawn.filter(x=>x==value).length>2){
            dread.push(value);
        }
        if(continue_count==0){
            point=20;
        }else{
            point=drawn[0];
        }
        stop=round(stop,r_o,point,dread,hand,value)
        
        if(continue_count==0){
            dread=[];
        }
        continue_count++;
        if(stop){
            point==20
            dread=[11];
            drawn=[];
            r_o.continue_count=continue_count;
            continue_count=0;
            if(r_o.sum_of_signals.WIN>0&&
                r_o.sum_of_signals.DREAD>0)
                r_o.sum_of_signals.DREAD=0;
                
            if(r_o.sum_of_signals.WIN>0){
                r_o.won_on=value;
                r_o.lost_on=0;
            }else{
                r_o.lost_on=value;
                r_o.won_on=0;
            }
            
            break;
        }
    }
    return r_o;

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
  export default shuffle;

function round_of_games(n){
    const r_o_g = [];
    for(let i=0;i<n;i++){
       process.stdout.write(`round of games: game ${i} \r`);
        r_o_g.push(game());
    }

    return r_o_g;
}
function main(){
    const gameCount=1_500_000;
    const rc=gameCount;
    
    const record = round_of_games(gameCount);
    const combined =record.reduce((o,a)=>{
        o.largest_continue=Math.max(o.largest_continue,a.continue_count);
        o.average_continue+=a.continue_count;
        o.continue_counts.push(a.continue_count);
        o.total_hands+=a.hand_count;
        o.won_on_totals[a.won_on]+=1;
        o.won_on_percentages[a.won_on]+=1;
        o.won_on_odds[a.won_on]+=1;
        o.lost_on_totals[a.lost_on]+=1;
        o.lost_on_percentages[a.lost_on]+=1;
        o.lost_on_odds[a.lost_on]+=1;

        if(!o.hands_length_odds[a.hand_count]){
            o.hands_length_odds[a.hand_count]=0;
        }
        o.hands_length_odds[a.hand_count]+=1;
 
        
        Object.entries(a.sum_of_values_drawn).forEach((kvp)=>{
            const [key, prop]=kvp;
            o.sum_of_values_drawn[key]+=prop;
            o.odds_of_values_drawn[key]+=prop;

        })
            o.continue_odds[a.continue_count]+=1;
            o.continue_percentages[a.continue_count]+=1;

        Object.entries(a.sum_of_signals).forEach((kvp)=>{
            const [key, prop]=kvp;
            o.sum_of_signals[key]+=prop;
            o.odds_of_signals[key]+=prop;
        })
        return o;
    },{
        total_hands:0,
        largest_continue:0,
        won_on_totals:{0:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0},
        won_on_percentages:{0:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0},
        won_on_odds:{0:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0},
        lost_on_totals:{0:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0},
        lost_on_percentages:{0:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0},
        lost_on_odds:{0:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0},
        continue_counts:[],
        continue_percentages:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0},
        continue_odds:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0},
        hands_length_odds:{},
        average_continue:0,
        sum_of_values_drawn:{11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0},
        odds_of_values_drawn:{11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0},
        sum_of_signals:SIGNALS.reduce((o,s)=>{o[s]=0;return o},{}),
        odds_of_signals:SIGNALS.reduce((o,s)=>{o[s]=0;return o},{})
    })
    for(const prop in combined.continue_percentages){
        combined.continue_percentages[prop]/=rc;
        combined.continue_odds[prop]=1/(combined.continue_odds[prop]/rc)
    }
    for(const prop in combined.won_on_percentages){
        combined.won_on_percentages[prop]/=rc
        combined.won_on_odds[prop]=1/(combined.won_on_odds[prop]/rc)
    }
    for(const prop in combined.lost_on_totals){
        combined.lost_on_percentages[prop]/=rc
        combined.lost_on_odds[prop]=1/(combined.lost_on_odds[prop]/rc)
    }    
    for(const prop in combined.hands_length_odds){
        combined.hands_length_odds[prop]=1/(combined.hands_length_odds[prop]/rc);
    }

    combined.average_continue=combined.average_continue/combined.continue_counts.length;
    combined.continue_counts=combined.continue_counts.reduce((obj,item)=>{
        if(!obj[item])obj[item]=0;
        obj[item]+=1
        return obj;
    },{})
    for(const k in combined.odds_of_values_drawn){        
        combined.odds_of_values_drawn[k]=1/(combined.odds_of_values_drawn[k]/rc);
    }
    for(const k in combined.odds_of_signals){
        combined.odds_of_signals[k]=1/(combined.odds_of_signals[k]/rc);
    }

    console.log("\n",combined,"is combined");
   }

console.log(Math.floor(1/(
    ((4*4)/(52*4))*
    ((((4*4)-1)/((52*4)-1)))*
    ((((4*4)-2)/((52*4)-2)))*
    ((((4*4)-3)/((52*4)-3)))*
    ((((4*4)-4)/((52*4)-4)))*
    ((((4*4)-5)/((52*4)-5)))*
    ((((4*4)-6)/((52*4)-6)))*
    ((((4*4)-7)/((52*4)-7)))*
    ((((4*4)-8)/((52*4)-8)))*
    ((((4*4)-9)/((52*4)-9)))*
    ((((4*4)-10)/((52*4)-10))
    ))))
   main();
