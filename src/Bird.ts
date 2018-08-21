class Bird extends egret.DisplayObjectContainer {

    private static _instance: Bird;
    private birdAnim: dragonBones.EgretArmatureDisplay;

    private static readonly gravity = 9.8;
    private velocity: number;
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
        this.width = 200;
        this.height = 200;
    }

    public static get Instance(): Bird {
        return this._instance || (this._instance = new this());
    }

    public reset(): void {
        this.x = 0;
        this.y = 0;
        this.velocity = 50;
    }

    public fly(): void {
        this.birdAnim.animation.play("fly");
        // egret.startTick(this.fall, this);
    }

    public stand(): void {
        this.birdAnim.animation.stop();
    }

    private fall(deltaTime: number): boolean {
        deltaTime *= .001;
        this.y += this.velocity * deltaTime * 0.1;
        this.velocity += Bird.gravity * deltaTime * 0.1;
        return false;
    }

    public jump(e: egret.TouchEvent) {
        console.log("Jump");
    }
}