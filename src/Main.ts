//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);

        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;
    private flyUI: fairygui.GComponent;
    private context: egret.Sprite;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let sky = this.createBitmapByName("bg_day_png");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        sky.filters

        let bird = Bird.Instance;
        bird.x = stageW * .5;
        bird.y = stageH * .4;
        bird.fly();
        this.addChild(bird);

        fairygui.UIPackage.addPackage("FlappyBird");
        this.flyUI = <fairygui.GComponent>fairygui.UIPackage.createObject("FlappyBird", "Running");
        this.stage.addChild(fairygui.GRoot.inst.displayObject);
        fairygui.GRoot.inst.addChild(this.flyUI);
        let n3 = this.flyUI.getChild("n3");
        n3.addEventListener(egret.TouchEvent.TOUCH_TAP, bird.sprint, bird);


        // this.context = new egret.Sprite();


        let pad1: egret.Shape = new egret.Shape();
        // pad1.$setHeight(1334);
        // pad1.$setWidth(750);
        // pad1.$setX(0);
        // pad1.$setY(0);
        pad1.graphics.beginFill(0xff0000, 0.5);
        pad1.graphics.lineStyle(10, 0x000000, 0.1);
        pad1.graphics.drawRect(40, 40, 222  , 333);
        pad1.graphics.endFill();
        pad1.touchEnabled = true;
        pad1.alpha = 0;
        
        this.addChild(pad1);
        pad1.addEventListener(egret.TouchEvent.TOUCH_TAP, bird.sprintBack, bird);

        // let pad2: egret.Shape = new egret.Shape();
        // pad2.graphics.beginFill(0x00ff00, 0.5);
        // pad2.graphics.lineStyle(10, 0x000000, 0.1);
        // pad2.graphics.drawRect(stageW * 0.5 + 40, 40, stageW * 0.5 - 80, stageH * 0.5 - 80);
        // pad2.graphics.endFill();
        // pad2.touchEnabled = true;
        // this.context.addChild(pad2);
        // // this.addChild(pad2);
        // pad2.addEventListener(egret.TouchEvent.TOUCH_TAP, bird.sprint, bird);

        // this.addChild(this.context);
        // this.context.cacheAsBitmap = true;


        // fairygui.GRoot.inst.displayObject.addEventListener(egret.TouchEvent.TOUCH_TAP, bird.jump, bird, true);
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}