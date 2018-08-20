class Bird extends egret.DisplayObjectContainer {

    private static _instance: Bird;
    private birdAnim: dragonBones.EgretArmatureDisplay;

    private static readonly gravity = 9.8;
    private velocity: number = 0;
    private scale: number = 3;
    private timeOnEnterFrame: number = 0;
    private deltaTime: number = 0;

    private constructor() {
        super();
        const birdSkeleton: dragonBones.DragonBonesData = RES.getRes("bird_ske_json");
        const birdTexture: egret.Texture = RES.getRes("bird_tex_png")
        const birdTextureData: any = RES.getRes("bird_tex_json");
        const dbFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dbFactory.addDragonBonesData(dbFactory.parseDragonBonesData(birdSkeleton));
        dbFactory.addTextureAtlasData(dbFactory.parseTextureAtlasData(birdTextureData, birdTexture));
        this.birdAnim = dbFactory.buildArmatureDisplay("Bird");
        this.addChild(this.birdAnim);
        this.birdAnim.scaleX = this.scale;
        this.birdAnim.scaleY = this.scale;
        this.reset();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public reset() {
        this.x = 0;
        this.y = 0;
        this.velocity = 0;
    }

    public fly() {
        this.birdAnim.animation.play("fly");
    }

    public stand() {
        this.birdAnim.animation.stop();
    }

    private onEnterFrame(e: egret.Event) {
        let now = egret.getTimer();
        let time = this.timeOnEnterFrame;
        this.deltaTime = now - time;
        // this.fall(this.deltaTime);
        this.timeOnEnterFrame = egret.getTimer();
    }

    private fall(deltaTime: number) {
        this.velocity += 9.8 * deltaTime;
        this.y += this.velocity * deltaTime;
    }
}