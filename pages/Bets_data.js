class Bet{
    constructor(label,condition, odds, once, clear_ons,mt){
        this.label=label;
        this.odds=odds;
        this.once=once;
        this.condition=condition;
        this.clear_ons=clear_ons;
        this.mod_threshold=mt;
    }
    calculate(cs,value,point,dread,amount){
        if(this.condition(cs,value,point,dread)){
            const modifier = this.modify(cs.length);
            return amount*this.odds*modifier;
        }
        return 0;
    }
    modify(l){
        if(this.mod_threshold>0) return l>this.mod_threshold?l:1;
        return 1;
    }
}
const bets_data = [
    ["make point", (cs,v,p,d)=>v==p&&v!=d,1.8,false,['lose'],0],
    ["make dread",(cs,v,p,d)=>v=!p&&v==d,1.7,false,['win'],0],
    ['2 cards show',(cs,v,p,d)=>cs.length==2,2,true,[''],0],
    ['3 cards show',(cs,v,p,d)=>cs.length==3,2,true,[''],0],
    ['4 or more show',(cs,v,p,d)=>cs.length>=4,2,true,[''],5],
    ["hit 11",(cs,v,p,d)=>v>=2&&v<=5,4,false,['lose'],4],
    ["hit 12",(cs,v,p,d)=>v>=12&&v<=15,4,false,['lose'],4],
    ["hit 13",(cs,v,p,d)=>v>=12&&v<=15,4,false,['lose'],4],
    ["hit 14",(cs,v,p,d)=>v>=12&&v<=15,4,false,['lose'],4],
    ["hit 15",(cs,v,p,d)=>v>=12&&v<=15,4,false,['lose'],4],
    ["hit 17",(cs,v,p,d)=>v>=12&&v<=15,4,false,['lose'],4],
    ["hit 18",(cs,v,p,d)=>v>=12&&v<=15,4,false,['lose'],4],
    ["hit 19",(cs,v,p,d)=>v>=12&&v<=15,4,false,['lose'],4],
    ["hit 20",(cs,v,p,d)=>v>=16&&v<=19,4,false,['lose'],4],
    ["hard 12",(cs,v,p,d)=>cs.every(x=>x.value==6)&&cs.length==2,8,false,['v12','lose'],0],
    ["hard 14",(cs,v,p,d)=>cs.every(x=>x.value==7)&&cs.length==2,8,false,['v14','lose'],0],
    ["hard 16",(cs,v,p,d)=>cs.every(x=>x.value==8)&&cs.length==2,8,false,['v16','lose'],0],
    ["hard 18",(cs,v,p,d)=>cs.every(x=>x.value==9)&&cs.length==2,8,false,['v18','lose'],0],
    ["red hard 12",(cs,v,p,d)=>cs.every(x=>x.value==6)&&cs.length==2,15,true,[''],0],
    ["red hard 14",(cs,v,p,d)=>cs.every(x=>x.value==7)&&cs.length==2,15,true,[''],0],
    ["red hard 16",(cs,v,p,d)=>cs.every(x=>x.value==8)&&cs.length==2,15,true,[''],0],
    ["red hard 18",(cs,v,p,d)=>cs.every(x=>x.value==9)&&cs.length==2,15,true,[''],0],
    ["all diamonds",(cs,v,p,d)=>cs.every(x=>x.suit=="diamond"),4,false,['lose'],3],
    ["all hearts",(cs,v,p,d)=>cs.every(x=>x.suit=="heart"),4,false,['lose'],3],
    ["all spades",(cs,v,p,d)=>cs.every(x=>x.suit=="spade"),4,false,['lose'],3],
    ["all clubs",(cs,v,p,d)=>cs.every(x=>x.suit=="club"),4,false,['lose'],3],
    ["matching suits",(cs,v,p,d)=>cs.every((x,_,arr)=>x.suit==arr[0].suit),1.5,true,[''],3],
    ["only plebs", (cs,v,p,d)=>cs.forEach(c=>(c.value<=9||c.name=="ten")),1.7,false,['royals',"lose"],3],
    ["only Royals", (cs,v,p,d)=>cs.forEach(c=>(c.value==10&&c.name!="ten")),1.7,false,['pleb',"lose"],0],
    ["full tens", (cs,v,p,d)=>cs.forEach(c=>(c.name=="ten")),2,false,['fullx',"lose"],0],
    ["full jacks", (cs,v,p,d)=>cs.forEach(c=>(c.name=="ten")),2,false,['fullx',"lose"],0],
    ["full queens", (cs,v,p,d)=>cs.forEach(c=>(c.name=="ten")),2,false,['fullx',"lose"],0],
    ["full kings", (cs,v,p,d)=>cs.forEach(c=>(c.name=="ten")),2,false,['fullx',"lose"],0],

];

const BETS = bets_data.map(x=>new Bet(...x));
export default BETS
