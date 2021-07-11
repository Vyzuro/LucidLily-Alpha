Scene_Menu.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_MenuCommand(0, -600);
    this._commandWindow.setHandler('item',      this.commandItem.bind(this));
    this._commandWindow.setHandler('skill',     this.commandPersonal.bind(this));
    this._commandWindow.setHandler('equip',     this.commandPersonal.bind(this));
    this._commandWindow.setHandler('status',    this.commandPersonal.bind(this));
    this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
    this._commandWindow.setHandler('options',   this.commandOptions.bind(this));
    this._commandWindow.setHandler('save',      this.commandSave.bind(this));
    this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
    this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
    this.addWindow(this._commandWindow);
    this._commandWindow.y = - this._commandWindow.height;
    this._commandWindow.addAnimation(new QueueTweenAnimation(new Point(0, 0), new Point(1.0, 1.0), 0, 10, 2, 0));
};

Scene_Menu.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(-240, 0);
    this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
    this.addWindow(this._goldWindow);
    //Functions that prepares Tween animiation with moving point/ distance of 0
    this._goldWindow.addAnimation(new QueueTweenAnimation(new Point(0, 0), new Point(1.0, 1.0), 0, 10, 0, 1));
    this._goldWindow.addAnimation(new QueueTweenAnimation(new Point(0, Graphics.boxHeight - this._goldWindow.height), new Point(1.0, 1.0), 0, 10, 2, 0));
};

Scene_Menu.prototype.createStatusWindow = function() {
    this._statusWindow = new Window_MenuStatus(Graphics.boxWidth, 0);
    this.addWindow(this._statusWindow);
    this._statusWindow.addAnimation(new QueueTweenAnimation(new Point(0, 0), new Point(1.0, 1.0), 0, 5, 0, 1));
    this._statusWindow.addAnimation(new QueueTweenAnimation(new Point(this._commandWindow.width, 0), new Point(1.0, 1.0), 0, 10, 2, 0));
};