
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    size:null,
    bombas: [],
    random: function getRandomInt(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    creaBomba: function(){
		
		var bomba = new cc.Sprite(res.bomba_png);
		//bomba.setScale(0.4,0.4);
        bomba.setPosition(this.random((this.size.width/2)-240,(this.size.width/2)+240), this.size.height);
        this.addChild(bomba, 1);
		var moveto = cc.moveTo(3, bomba.getPositionX(), -50);
		bomba.runAction(moveto);
		this.bombas.push(bomba);		
		
	},
    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;
        this.size = size;
        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        this.schedule(this.creaBomba,0.6);
        //posicionando la imagen de fondo
        this.sprConejo = new cc.Sprite(res.conejo_png);
        this.sprConejo.setPosition(size.width / 2,size.height * 0.15);
        this.addChild(this.sprConejo, 1);


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

