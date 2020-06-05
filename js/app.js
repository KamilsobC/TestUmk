

class Character {
    constructor(name,hp,pos_q,pos_r){
        this.name=name;
        this.hp=hp;
        this.info="";
        this.pos_q=pos_q;
        this.pos_r=pos_r;
        this.movment=1;
        this.range=1;
        this.possibleTiles=[];
    }

    takeDamage(amount) {
            this.hp=this.hp-parseInt(amount);
            if (this.hp<=0){
                this.hp=0;
            }
        }
    getPossibleMovment(map){
        console.log(this.pos_q);
        console.log(this.pos_r);
        console.log('map ' + this.map);
        this.possibleTiles=[];
        var possibleMovments=[];

        for (var i=-1;i<=1;i++){
            
            for(var j=-1;j<=1;j++){
                var movment= [parseInt(this.pos_q) + parseInt(i),parseInt(this.pos_r) + parseInt(j) ];
            possibleMovments.push(movment);
            }
        }

        possibleMovments.forEach(element=>{
            
            map.tiles.forEach(tile=>{

                if  (element[0]==tile.q && element[1]==tile.r){
                      
                        if  (element[0]!=this.pos_q && element[1]!=this.pos_r){
                            console.log(element);
                            this.possibleTiles.push(element);
                        }
                    
                }   
            })
        })
        this.possibleTiles.forEach(el =>{
        })
    }
    getInfo(){
        console.log('name ' + this.name + ' hp: ' + this.hp + ' pos r:' + this.pos_r + ' pos q' + this.pos_q);
    }
    move(q,r){
        this.pos_q=q;
        this.pos_r=r;

    }   
    
}
class Hero extends Character{
    constructor(name,hp,pos_q,pos_r,experience){
       super(name,hp,pos_q,pos_r);
        this.experience=experience;
    }
}
class Enemy extends Character{
    constructor(name,hp,pos_q,pos_r){
        super(name,hp,pos_q,pos_r);

    }
}
class Item{
    constructor(name,modifier,amount){
        this.name=name;
        this.modifier=modifier;
        this.amount=amount;
    }
}
class Terrain{
    constructor(passable,movmentModifier){
        this.passable=true;
        this.movmentModifier=movmentModifier;
    }
}
class Map{
    constructor(tiles){
        this.tiles=tiles;
    }
    getTile(q,r){
        this.tiles.forEach(element=>{
            if(element.q==q && element.r ==r ){
                console.log(element.holds);
                return element.holds;
            }

        })
    }
}
class Tile{
    constructor(q,r,holds){
        this.q=q;
        this.r=r;
        this.holds=holds;
    }
    info(){
        'r: '+ this.r + ' q:' +this.q + ' holds:' +this.holds }
}
class BattleManager{

    constructor(enemy_pos_q,enemy_pos_r,hero_pos_q,hero_pos_r,map_info){
        this.enemy = new Enemy('goblin',100,enemy_pos_q,enemy_pos_r);
        this.hero = new Hero('hero',100,hero_pos_q,hero_pos_r,1000);
        this.lastclicked =null;
        this.updateMapInfo(map_info);
        this.hero.getPossibleMovment(this.Map);
        this.enemy.getPossibleMovment(this.Map);
        console.log(this.hero.possibleTiles);
        this.hero.possibleTiles.forEach(el=>{
            this.Map.getTile(el[0],el[1]);
        })
    }
    updateMapInfo(tiles){
        this.map = new Map(tiles);
    }
    get Map(){
        return this.map;
    }

    changelastClick(newSelect){
        this.previousClick= this.lastclicked;
        this.lastclicked= newSelect;

        console.log(this.lastclicked)
        console.log(this.previousClick);
        if (this.previousClick=='hero' && this.lastclicked == 'enemy'){
                this.enemy.takeDamage(30);
                this.changeHP('enemy');
        }
        if (this.previousClick=='enemy' && this.lastclicked == 'hero'){
            this.hero.takeDamage(30);
            this.changeHP('hero');
        
        if (this.previousClick=='hero' && this.lastclicked == 'nothing'){
            console.log(this.hero.possibleTiles);
        }
    }
    }

    changeHP(character){
        var idstring = character + 'hp';
        var hpbars= document.getElementsByClassName(idstring);
        for (let hpbar of hpbars){
            if(character=='enemy'){
                hpbar.innerText=this.enemy.hp + "%";
            }
            else if (character=='hero'){
                hpbar.innerText=this.hero.hp + "%";
            }

        }

    }
    

}
// 
//
//
//
const TREE =createElementFromHTML( "<div class=\"thing\"> <div class=\"tree \"> <img src=\'img/tree.png\'/> </div> </div>");
const HERO = createElementFromHTML( "<div class=\"character\" > <div class=\"hero \"><div class='hpbg'><div class='herohp'>100</div></div><img src=\'img/hero.png\'/> </div> </div>");
const ENEMY = createElementFromHTML( "<div class=\"character\"  > <div class=\"enemy \"><div class='hpbg'><div class='enemyhp'>100</div></div> <img src=\'img/enemy.png\'/> </div> </div>");
const EMPTY = createElementFromHTML("<div class=\"nothing\"  ><img src=\'img/empty.png\'/></div>")

 
function nextTurnUpdate(){
    //TODO
    var elements = document.getElementsByClassName('nextchar');
    for (var i=0;i<elements.length;i++){

    }
}

function getinfo(element){
    console.log(element);
    console.log(element.children[0].getAttribute('class'));
}
function getRandom( from,to,round) {

    var result = from + (Math.random()*(to-from));
    if (round==true){
        return Math.floor(result);
    }
    else{
        return result;
    }
  }
function getRandomElementFrom(items){
    var item = items[Math.floor(Math.random() * items.length)];
    return item;
}
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
  
}

  S(document).ready(function(){


    var hexmap = S.hexmap('hexmap-8');
    hexmap.positionHexes().resize();
    
    // Populowanie poczatkowe mapy
	hexmap.setContent(function(id,hex){

        var str = '<div class="token">';
        //przerobić by wstawiało całe obiekty
        if(hex.onTile == "hero"  || hex.onTile== "enemy"){
            str += '<div class="character">'
            if(hex.onTile == "hero"){
                str+= '<div class="hero"> <img src=\'img/hero.png\'/> </div>'
            } 
            else if (hex.onTile == "enemy"){
                str+= '<div class="enemy "> <img src=\'img/enemy.png\'/> </div>';
            }
            str += '</div>';
        }
        if(hex.onTile == "tree"){
                str+= '<div class="thing"><img src=\'img/tree.png\'/> </div>'
            } 
		str += '</div>';

		return str;
    });
        //Dodawanie onclicku wszystkim hexom



	// Set the CSS class of each hex to be the hex type
	hexmap.setClass(function(id,hex){
		return hex.type;
	});

    alert('press generate map');
	// Create button which randomises the terrain
	S('#button-8-terrain').on('click',function(){
        function generateMap(lenOfMap){

            var treecnt=4;
            var herocnt=1;
            var enemycnt=1;
            var allHexes= lenOfMap;
            var emptyTiles= allHexes-treecnt-herocnt-enemycnt;

            const types= ['tree','hero','enemy','empty'];
            var list_of_elems=[];
            
            for (i = 0; i < lenOfMap; i++) {

                var notPossible = true;
               
                while(notPossible){
                    var type = getRandomElementFrom(types)
                    if(type=='tree' && treecnt>0){
                        treecnt--;
                        notPossible=false;
                    }else if (type=='hero' && herocnt>0){
                        herocnt--;
                        notPossible=false;
                    }else if(type=='enemy' && enemycnt>0){
                        enemycnt--;
                        notPossible=false;
                    }else if (type=='empty' && emptyTiles>0){
                      emptyTiles--;
                       notPossible=false;
                    }
                    else{
                        
                    }
                    
                }
                list_of_elems.push(type);
              
              } 
            return list_of_elems;
        
        };
        var dataids =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S'];
        var result = generateMap(dataids.length)
        var terrains = ['hills','pasture','mountains','fields','forest'];
        var hexes = document.querySelectorAll('.hex');
        var hero_pos_q,hero_pos_r,enemy_pos_q,enemy_pos_r;

        //tworzenie mapy z typów
        var mapInfo=[];
        hexes.forEach(element =>{

                var proper = element.firstChild.firstChild.firstChild;
                if (proper.hasChildNodes()){
                    var to_delete = proper.lastChild;
                    proper.removeChild(to_delete);
                }
                to_insert=result.pop()
                
                if (to_insert=='tree'){
                    to_insert=TREE;
                }else if(to_insert=='hero'){
                    to_insert=HERO;
                    
                    hero_pos_q=element.getAttribute('data-q');
                    hero_pos_r=element.getAttribute('data-r');

                }else if(to_insert=='enemy'){
                    to_insert=ENEMY;
                    
                    enemy_pos_q=element.getAttribute('data-q');
                    enemy_pos_r=element.getAttribute('data-r');

                }else if(to_insert=='empty'){
                    to_insert=EMPTY;
                }
                if(to_insert!=undefined){
                    proper.appendChild(to_insert.cloneNode(true));
                }
                
        });
        //info mapa
        hexes.forEach(element=>{

            var proper = element.firstChild.firstChild.firstChild;
            var q=element.getAttribute('data-q');
            var r=element.getAttribute('data-r');
            var newTile = new Tile(q,r,proper.lastChild);
            mapInfo.push(newTile);
        })
        
        //tworzenie podłoża
        var t = new Array(hexmap.hexes.length);
		for(var i = 0; i < hexmap.hexes.length; i++){
            t[i] = terrains[Math.floor(Math.random()*terrains.length)];
            
		}

		for(var i = 0; i < hexmap.hexes.length; i++){
            if(hexmap.hexes[i].n ) hexmap.hexes[i].setClass(t[i]);
        }
        nextTurnUpdate();
        const battlemanager = new BattleManager(enemy_pos_q,enemy_pos_r,hero_pos_q,hero_pos_r,mapInfo)
        populateChars();

        function populateChars(){

            function getqr(param){
                param = param.originalTarget.offsetParent.offsetParent;
                r = param.getAttribute('data-r');
                q = param.getAttribute('data-q');
                return [q,r]
            }

            var elem = document.querySelector('.hero');
            
            elem.onclick= function(param){
                var qr = getqr(param);
                battlemanager.hero.getInfo();
                battlemanager.changelastClick('hero');
                var newTile = new Tile(q,r);
                console.log(qr[0],qr[1])
            }

            elem =document.querySelector('.enemy');
            elem.onclick = function(param){
                var qr = getqr(param);
                battlemanager.enemy.getInfo();
                battlemanager.changelastClick('enemy');
                console.log(qr[0],qr[1])
            }
            elem=document.querySelectorAll('.nothing');
            elem.forEach(ele=>{
                ele.onclick= function(param){
                    battlemanager.changelastClick('nothing');
                    var qr = getqr(param);
                    console.log(qr[0],qr[1])
                }
            });

            elem=document.querySelectorAll('.thing');

            elem.forEach(ele=>{
                ele.onclick = function(param) {
                        battlemanager.changelastClick('thing');
                        var qr = getqr(param);
                        console.log(qr[0],qr[1])
                }
            });

        }
        
});});
