const sum_cards = (cards)=> cards.reduce((a,c)=>a+=c.value,0);
const will_make = (hand)=>sum_cards(hand)>10;
function partition(array, isValid) {
    return array.reduce(([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    }, [[], []]);
  }
onmessage = (mess) => {
    const {hands,deck,type,depth,key}=mess.data;
    if(type=="worker"){

        const new_hands = [];
        hands.forEach(hand=>deck.forEach(card=>new_hands.push([...hand,card])))
        const [pass,fail] = partition(new_hands,will_make);
        const main_message = {hands:pass,
            deck,
            type:fail.length==0?"resolve":"main",
            key,
            depth};
        const next_message = {hands:fail,
            deck,type:"worker",
            depth:depth+1,
            type:"worker",
            key
        };

        postMessage(next_message);
        postMessage(main_message);

    }
  };
  