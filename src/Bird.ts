class Bird extends egret.DisplayObjectContainer {

    private static _instance: Bird;
    private birdAnim: dragonBones.EgretArmatureDisplay;

    private static readonly gravity = 500;
    private static readonly jumpSpeed: number = -700;
    private velocity: number = 0;
    private scale: number = 3;
    private timeOnEnterFrame: number = 0;
    private time: number = 0;

    private sfxWing: egret.Sound;

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

        this.sfxWing = RES.getRes("sfx_wing_wav");
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
        egret.startTick(this.fall, this);
    }

    public stand(): void {
        this.birdAnim.animation.stop();
    }

    private fall(timeStamp: number): boolean {
        let now: number = timeStamp;
        let time: number = this.time;
        let deltaTime = (now - time) * .001;
        this.time = now;
        this.velocity += Bird.gravity * deltaTime;
        this.y += this.velocity * deltaTime;
        return false;
    }

    public jump(e: egret.TouchEvent) {
        this.velocity = Bird.jumpSpeed;
        this.sfxWing.play(0, 1);
    }

    public sprint(e: egret.TouchEvent) {
        this.x += 50;
        this.sfxWing.play(0, 1);
    }

    public sprintBack(e: egret.TouchEvent) {
        this.x -= 50;
        this.sfxWing.play(0, 1);
    }
}