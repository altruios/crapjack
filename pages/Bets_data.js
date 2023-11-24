class Bet{
    constructor(label,condition, odds, once, clear_ons){
        this.label=label;
        this.odds=odds;
        this.once=once;
        this.condition=condition;
        this.clear_ons=clear_ons;
    }
    calculate(c1,c2,value,point,dread,amount){
        if(this.condition(c1,c2,value,point,dread)){
            return amount*this.odds;
        }
        return 0;
    }
}

const bets_data = [
    ["make point", (c1,c2,v,p,d)=>v==p&&v!=d,1.8,false,['lose']],
    ["make dread",(c1,c2,v,p,d)=>v=!p&&v==d,1.7,false,['win']],
    ["hit 2-5",(c1,c2,v,p,d)=>v>=2&&v<=5,4,true,['']],
    ["hit 7-10",(c1,c2,v,p,d)=>v>=7&&v<=10,4,true,['']],
    ["hit 12-15",(c1,c2,v,p,d)=>v>=12&&v<=15,4,true,['']],
    ["hit 16-19",(c1,c2,v,p,d)=>v>=16&&v<=19,4,true,['']],
    ["any twenty",(c1,c2,v,p,d)=>v==20,2,true,['']],
    ["stay 2-5",(c1,c2,v,p,d)=>v>=2&&v<=5,1.5,false,['win']],
    ["stay 7-10",(c1,c2,v,p,d)=>v>=7&&v<=10,1.5,false,['win']],
    ["stay 12-15",(c1,c2,v,p,d)=>v>=12&&v<=15,1.5,false,['win']],
    ["stay 16-19",(c1,c2,v,p,d)=>v>=16&&v<=19,1.5,false,['win']],
    ["stay any twenty",(c1,c2,v,p,d)=>v==20,1.5,false,['win']],
    ["hard 4",(c1,c2,v,p,d)=>c1.value==c2.value&&v==4,8,false,['v4','lose']],
    ["hard 6",(c1,c2,v,p,d)=>c1.value==c2.value&&v==6,8,false,['v6','lose']],
    ["hard 8",(c1,c2,v,p,d)=>c1.value==c2.value&&v==8,8,false,['v8','lose']],
    ["hard 10",(c1,c2,v,p,d)=>c1.value==c2.value&&v==10,8,false,['v10','lose']],
    ["hard 12",(c1,c2,v,p,d)=>c1.value==c2.value&&v==12,8,false,['v12','lose']],
    ["hard 14",(c1,c2,v,p,d)=>c1.value==c2.value&&v==14,8,false,['v14','lose']],
    ["hard 16",(c1,c2,v,p,d)=>c1.value==c2.value&&v==16,8,false,['v16','lose']],
    ["hard 18",(c1,c2,v,p,d)=>c1.value==c2.value&&v==18,8,false,['v18','lose']],
    ["red hard 4",(c1,c2,v,p,d)=>c1.value==c2.value&&v==4,15,true,['']],
    ["red hard 6",(c1,c2,v,p,d)=>c1.value==c2.value&&v==6,15,true,['']],
    ["red hard 8",(c1,c2,v,p,d)=>c1.value==c2.value&&v==8,15,true,['']],
    ["red hard 10",(c1,c2,v,p,d)=>c1.value==c2.value&&v==10,15,true,['']],
    ["red hard 12",(c1,c2,v,p,d)=>c1.value==c2.value&&v==12,15,true,['']],
    ["red hard 14",(c1,c2,v,p,d)=>c1.value==c2.value&&v==14,15,true,['']],
    ["red hard 16",(c1,c2,v,p,d)=>c1.value==c2.value&&v==16,15,true,['']],
    ["red hard 18",(c1,c2,v,p,d)=>c1.value==c2.value&&v==18,15,true,['']],
    ["suited pair",(c1,c2,v,p,d)=>c1.suit==c2.suit&&c1.name==c2.name,9,true,['']],
    ["diamond pair",(c1,c2,v,p,d)=>c1.suit==c2.suit&&c1.suit=="diamond",11,true,['']],
    ["heart pair",(c1,c2,v,p,d)=>c1.suit==c2.suit&&c1.suit=="heart",11,true,['']],
    ["spade pair",(c1,c2,v,p,d)=>c1.suit==c2.suit&&c1.suit=="spade",11,true,['']],
    ["club pair",(c1,c2,v,p,d)=>c1.suit==c2.suit&&c1.suit=="club",11,true,['']],
    ["matching suits",(c1,c2,v,p,d)=>c1.suit==c2.suit,1.5,true,['']],
    ["only plebs", (c1,c2,v,p,d)=>[c1,c2].forEach(c=>(c.value<=9||c.name=="ten")),1.7,true,['']],
    ["only Royals", (c1,c2,v,p,d)=>[c1,c2].forEach(c=>(c.value==10&&c.name!="ten")),1.7,true,['']],
    ["ten pair", (c1,c2,v,p,d)=>[c1,c2].forEach(c=>(c.name=="ten")),2,true,['']],
    ["jack pair", (c1,c2,v,p,d)=>[c1,c2].forEach(c=>(c.name=="ten")),2,true,['']],
    ["queen pair", (c1,c2,v,p,d)=>[c1,c2].forEach(c=>(c.name=="ten")),2,true,['']],
    ["king pair", (c1,c2,v,p,d)=>[c1,c2].forEach(c=>(c.name=="ten")),2,true,['']],

];

const BETS = bets_data.map(x=>new Bet(...x));
export default BETS
