class Bird extends egret.DisplayObjectContainer {
    public constructor() {
        super();
         let birdData = RES.getRes("bird_mc_json");
        let birdTexture = RES.getRes("bird_mc_png");
        let birdFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(birdData, birdTexture);
        let behavior2: egret.MovieClip = new egret.MovieClip(birdFactory.generateMovieClipData("bird"));
        behavior2.width = 200;
        console.log(behavior2);
        this.addChild(behavior2);
        behavior2.gotoAndPlay(1, 1000);
    }

    private fly() {
          
    }
}