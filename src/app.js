
var HelloWorldLayer = cc.Layer.extend({
    sprFondo:null,
    sprConejo:null,
    bombas: [],
    creaBomba: function(){
		
		var bomba = new cc.Sprite(res.bomba_png);
		bomba.setScale(0.4,0.4);
        bomba.setPosition(this.random(1,480), this.size.height );
        this.addChild(bomba, 1);
		var moveto = cc.moveTo(this.random(1,9), this.sprConejo.getPositionX(), this.sprConejo.getPositionY());
		bomba.runAction(moveto);
		this.bombas.push(bomba);		
		
	},
    ctor:function () {
        this._super();
        //Obteniendo el tamaño de la pantalla
        var size = cc.winSize;

        //posicionando la imagen de fondo
        this.sprFondo = new cc.Sprite(res.fondo_png);
        this.sprFondo.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.sprFondo, 0);
        this.schedule(this.creaBomba,3);
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

