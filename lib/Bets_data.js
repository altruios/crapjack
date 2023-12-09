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
    ["make point", (cs,v,p,d)=>v==p&&v!=d,1.5,false,['lose'],0],
    ["make dread",(cs,v,p,d)=>v=!p&&v==d,2,false,['win'],0],
    ['3/4 cards show',(cs,v,p,d)=>cs.length==3,3,true,[''],5],
    ['5 or more show',(cs,v,p,d)=>cs.length>=4,25,true,[''],6],
    ["hit 11",(cs,v,p,d)=>v==11,2,false,['lose'],4],
    ["hit 12",(cs,v,p,d)=>v==12,2,false,['lose'],4],
    ["hit 13",(cs,v,p,d)=>v==13,2,false,['lose'],4],
    ["hit 14",(cs,v,p,d)=>v==14,2,false,['lose'],4],
    ["hit 15",(cs,v,p,d)=>v==15,2,false,['lose'],4],
    ["hit 16",(cs,v,p,d)=>v==16,2,false,['lose'],4],
    ["hit 17",(cs,v,p,d)=>v==17,2,false,['lose'],4],
    ["hit 18",(cs,v,p,d)=>v==18,2,false,['lose'],4],
    ["hit 19",(cs,v,p,d)=>v==19,2,false,['lose'],4],
    ["hit 20",(cs,v,p,d)=>v==20,2,false,['lose'],4],
    ["hard 12",(cs,v,p,d)=>cs.every(x=>x.value==6)&&cs.length==2,5,false,['v12','lose'],0],
    ["hard 14",(cs,v,p,d)=>cs.every(x=>x.value==7)&&cs.length==2,5,false,['v14','lose'],0],
    ["hard 16",(cs,v,p,d)=>cs.every(x=>x.value==8)&&cs.length==2,5,false,['v16','lose'],0],
    ["hard 18",(cs,v,p,d)=>cs.every(x=>x.value==9)&&cs.length==2,5,false,['v18','lose'],0],
    ["red hard 12",(cs,v,p,d)=>cs.every(x=>x.value==6)&&cs.length==2,25,true,[''],0],
    ["red hard 14",(cs,v,p,d)=>cs.every(x=>x.value==7)&&cs.length==2,25,true,[''],0],
    ["red hard 16",(cs,v,p,d)=>cs.every(x=>x.value==8)&&cs.length==2,25,true,[''],0],
    ["red hard 18",(cs,v,p,d)=>cs.every(x=>x.value==9)&&cs.length==2,25,true,[''],0],
    ["all diamonds",(cs,v,p,d)=>cs.every(x=>x.suit=="diamond"),5,false,['lose',"full-heart","full-spade","full-club"],3],
    ["all hearts",(cs,v,p,d)=>cs.every(x=>x.suit=="heart"),5,false,['lose',"full-diamond","full-spade","full-club"],3],
    ["all spades",(cs,v,p,d)=>cs.every(x=>x.suit=="spade"),5,false,['lose',"full-heart","full-diamond","full-club"],3],
    ["all clubs",(cs,v,p,d)=>cs.every(x=>x.suit=="club"),5,false,['lose',"full-heart","full-spade","full-diamond"],3],
    ["matching suits",(cs,v,p,d)=>cs.every((x,_,arr)=>x.suit==arr[0].suit),.5,true,[''],3],
    ["only plebs", (cs,v,p,d)=>cs.forEach(c=>(c.value<=9||c.name=="ten")),0.2,false,['royals',"lose"],3],
    ["only Royals", (cs,v,p,d)=>cs.forEach(c=>(c.value==10&&c.name!="ten")),3,false,['pleb',"lose"],0],
    ["full tens", (cs,v,p,d)=>cs.forEach(c=>(c.name=="ten")),15,false,['fullx',"lose"],0],
    ["full jacks", (cs,v,p,d)=>cs.forEach(c=>(c.name=="ten")),15,false,['fullx',"lose"],0],
    ["full queens", (cs,v,p,d)=>cs.forEach(c=>(c.name=="ten")),15,false,['fullx',"lose"],0],
    ["full kings", (cs,v,p,d)=>cs.forEach(c=>(c.name=="ten")),15,false,['fullx',"lose"],0],

];

const BETS = bets_data.map(x=>new Bet(...x));
export default BETS
