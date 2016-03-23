
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    size:null,
    bombas: [],
    puntos: 0,
    zanahorias:[],
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    moverConejo: function(location, event){
		
        
		var  juego = event.getCurrentTarget();
		var ubicacion = location[0].getLocation();
        if(ubicacion.x <= (juego.size.width / 2 + 200)  && ubicacion.x > (juego.size.width / 2 - 200))
		
        juego.sprConejo.setPosition(ubicacion.x,juego.sprConejo.getPositionY());
        

	},
    creaBomba: function(){
		
		var bomba = new cc.Sprite(res.bomba_png);
		//bomba.setScale(0.4,0.4);
        var rand = this.random(1,3);
        var equis;
        if(rand===1) equis = (this.size.width / 2) - 150;
        if(rand===2) equis = this.size.width / 2;
        if(rand===3) equis = (this.size.width / 2) + 150;
        bomba.setPosition(equis, this.size.height+100);
        this.addChild(bomba, 1);
		var moveto = cc.moveTo(this.random(1,3), bomba.getPositionX(), -50);
		bomba.runAction(moveto);
		this.bombas.push(bomba);
        var booly = true;
        this.schedule(function(){if(this.col(bomba))
            {
                if(booly) {
                    
                cc.log("Habeis perdido!");
                this.puntos /= 2;
                booly = false;
                }
            }},0.1);
        
		
	},
    col: function(object)
    {
        if(object.getPositionX() <  this.sprConejo.getPositionX() + (this.sprConejo.width/2) && object.getPositionX() >  this.sprConejo.getPositionX() - (this.sprConejo.width/2))
            {
                if(object.getPositionY() < this.sprConejo.getPositionY()+(this.sprConejo.height/2) && object.getPositionY() > this.sprConejo.getPositionY() - (this.sprConejo.height/2))
                    return true;
            }
        return false;
    },
    formatear: function()
    {
        /*this.bombas.length = 0;
        this.zanahorias.length = 0;*/
    },
    creaZana: function(){
		
		var zana = new cc.Sprite(res.zanahoria_png);
		var rand = this.random(1,3);
        var equis;
        if(rand===1) equis = (this.size.width / 2) - 150;
        if(rand===2) equis = this.size.width / 2;
        if(rand===3) equis = (this.size.width / 2) + 150;
        zana.setPosition(equis, this.size.height+100);
        this.addChild(zana, 1);
		var moveto = cc.moveTo(3, zana.getPositionX(), -100);
		zana.runAction(moveto);
		this.zanahorias.push(zana);
        var booly=true;
        this.schedule(function(){if(this.col(zana))
            {
                zana.setVisible(false);
                if(booly) {cc.log("Zanahoria!");
                           this.puntos++;}
                booly=false;
            }},0.1);
		
	},
    
    ctor:function () {
        alert("¡Atención! El juego consiste en obtener los puntos que puedas. Las zanahorias valen un punto. Las bombas te quitan seis. ¡Adelante!")
        this._super();
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;
        this.size = size;
        var helloLabel = new cc.LabelTTF("Puntos: 0", "Arial", 38);
        this.schedule(function()
                     {
            helloLabel.setString("Puntos: " + this.puntos);
        },0.1);
        // position the label on the center of the screen
        this.addChild(helloLabel,4);
        helloLabel.x = size.width / 2;
        helloLabel.y = (size.height / 2) + 200;
        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        this.schedule(this.creaBomba,3.2);
        this.schedule(this.creaZana,0.8);
        this.schedule(this.formatear,0.5);
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo, 1);

        cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ALL_AT_ONCE,
			
			onTouchesMoved: this.moverConejo
			
		}, this);
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

