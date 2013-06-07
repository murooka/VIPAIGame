// Generated by CoffeeScript 1.6.2
var CurrentDirectBranchInstruction, CurrentDirectStr, HoldBulletBranchInstruction, HoldBulletStr, HpBranchInstruction, HpStr, MoveInstruction, MoveStr, PickupInstruction, PickupStr, R, RobotInstruction, SearchDirectBranchInstruction, SearchDirectItemBranchInstruction, SearchDirectRobotBranchInstruction, SearchingItemDirectStr, SearchingRobotDirectStr, ShotInstruction, ShotStr,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

R = Config.R;

MoveStr = R.String.INSTRUCTION.Move;

ShotStr = R.String.INSTRUCTION.Shot;

PickupStr = R.String.INSTRUCTION.Pickup;

HpStr = R.String.INSTRUCTION.Hp;

HoldBulletStr = R.String.INSTRUCTION.HoldBulleft;

SearchingRobotDirectStr = R.String.INSTRUCTION.SearchingRobotDirect;

SearchingItemDirectStr = R.String.INSTRUCTION.SearchingItemDirect;

CurrentDirectStr = R.String.INSTRUCTION.CurrentDirect;

Debug.dump(CurrentDirectStr);

RobotInstruction = (function() {
  function RobotInstruction() {}

  RobotInstruction.MOVE = "move";

  RobotInstruction.SHOT = "shot";

  RobotInstruction.PICKUP = "pickup";

  return RobotInstruction;

})();

MoveInstruction = (function(_super) {
  __extends(MoveInstruction, _super);

  MoveInstruction.direct = [Direct.RIGHT, Direct.RIGHT | Direct.UP, Direct.RIGHT | Direct.DOWN, Direct.LEFT, Direct.LEFT | Direct.UP, Direct.LEFT | Direct.DOWN];

  MoveInstruction.frame = [0, 4, 5, 2, 6, 7];

  function MoveInstruction(robot) {
    var parameter;

    this.robot = robot;
    MoveInstruction.__super__.constructor.apply(this, arguments);
    this._id = 0;
    this.setAsynchronous(true);
    parameter = new TipParameter(MoveStr.colnum(), 0, 0, 5, 1);
    this.addParameter(parameter);
    this.icon = new Icon(Game.instance.assets[R.TIP.ARROW], 32, 32);
  }

  MoveInstruction.prototype.action = function() {
    var plate, ret;

    ret = true;
    this.robot.frame = MoveInstruction.frame[this._id];
    plate = this.robot.map.getTargetPoision(this.robot.currentPlate, MoveInstruction.direct[this._id]);
    ret = this._move(plate);
    this.setAsynchronous(ret !== false);
    return this.robot.onCmdComplete(RobotInstruction.MOVE, ret);
  };

  MoveInstruction.prototype._move = function(plate) {
    var pos, ret,
      _this = this;

    ret = false;
    this.robot.prevPlate = this.robot.currentPlate;
    if ((plate != null) && plate.lock === false) {
      pos = plate.getAbsolutePos();
      this.robot.tl.moveTo(pos.x, pos.y, PlayerRobot.UPDATE_FRAME).then(function() {
        return _this.onComplete();
      });
      this.robot.currentPlate = plate;
      ret = new Point(plate.ix, plate.iy);
    } else {
      ret = false;
    }
    return ret;
  };

  MoveInstruction.prototype.onComplete = function() {
    this.robot.onAnimateComplete();
    return MoveInstruction.__super__.onComplete.apply(this, arguments);
  };

  MoveInstruction.prototype.clone = function() {
    var obj;

    obj = this.copy(new MoveInstruction(this.robot));
    obj._id = this._id;
    return obj;
  };

  MoveInstruction.prototype.onParameterChanged = function(parameter) {
    return this._id = parameter.value;
  };

  MoveInstruction.prototype.mkDescription = function() {
    return MoveStr.description[this._id](1);
  };

  MoveInstruction.prototype.mkLabel = function() {
    return MoveStr.label[this._id]();
  };

  MoveInstruction.prototype.getIcon = function() {
    this.icon.frame = this._id;
    return this.icon;
  };

  return MoveInstruction;

})(ActionInstruction);

ShotInstruction = (function(_super) {
  var bltQueue;

  __extends(ShotInstruction, _super);

  bltQueue = null;

  function ShotInstruction(robot) {
    var parameter;

    this.robot = robot;
    ShotInstruction.__super__.constructor.apply(this, arguments);
    if (bltQueue === null) {
      bltQueue = [this.robot.bltQueue, this.robot.wideBltQueue, this.robot.dualBltQueue];
    }
    parameter = new TipParameter(ShotStr.colnum(), 0, 0, 2, 1);
    this.icon = new Icon(Game.instance.assets[R.TIP.SHOT_BULLET], 32, 32);
    this._id = 0;
    this.addParameter(parameter);
    this.setAsynchronous(true);
  }

  ShotInstruction.prototype.action = function() {
    var b, queue, ret, _i, _len, _ref,
      _this = this;

    ret = false;
    queue = bltQueue[this._id];
    if (!queue.empty()) {
      _ref = queue.dequeue();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        b.shot(this.robot.x, this.robot.y, this.robot.getDirect());
        this.robot.scene.world.bullets.push(b);
        this.robot.scene.world.insertBefore(b, this.robot);
        b.setOnDestoryEvent(function() {
          return _this.onComplete();
        });
        ret = b;
      }
    }
    this.setAsynchronous(ret !== false);
    return this.robot.onCmdComplete(RobotInstruction.SHOT, ret);
  };

  ShotInstruction.prototype.onComplete = function() {
    this.robot.onAnimateComplete();
    return ShotInstruction.__super__.onComplete.apply(this, arguments);
  };

  ShotInstruction.prototype.onParameterChanged = function(parameter) {
    return this._id = parameter.value;
  };

  ShotInstruction.prototype.clone = function() {
    var obj;

    obj = this.copy(new ShotInstruction(this.robot));
    obj._id = this._id;
    return obj;
  };

  ShotInstruction.prototype.mkLabel = function() {
    return ShotStr.label[this._id]();
  };

  ShotInstruction.prototype.mkDescription = function() {
    return ShotStr.description[this._id]();
  };

  ShotInstruction.prototype.getIcon = function() {
    this.icon.frame = this._id;
    return this.icon;
  };

  return ShotInstruction;

})(ActionInstruction);

PickupInstruction = (function(_super) {
  var bltQueue, itemClass, type;

  __extends(PickupInstruction, _super);

  type = [BulletType.NORMAL, BulletType.WIDE, BulletType.DUAL];

  itemClass = [NormalBulletItem, WideBulletItem, DualBulletItem];

  bltQueue = null;

  function PickupInstruction(robot) {
    var parameter;

    this.robot = robot;
    PickupInstruction.__super__.constructor.apply(this, arguments);
    if (bltQueue === null) {
      bltQueue = [this.robot.bltQueue, this.robot.wideBltQueue, this.robot.dualBltQueue];
    }
    this.setAsynchronous(true);
    parameter = new TipParameter(PickupStr.colnum(), 0, 0, 2, 1);
    this._id = 0;
    this.icon = new Icon(Game.instance.assets[R.TIP.PICKUP_BULLET], 32, 32);
    this.addParameter(parameter);
  }

  PickupInstruction.prototype.action = function() {
    var blt, item, ret,
      _this = this;

    blt = BulletFactory.create(type[this._id], this.robot);
    ret = bltQueue[this._id].enqueue(blt);
    if (ret !== false) {
      item = new itemClass[this._id](this.robot.x, this.robot.y);
      this.robot.scene.world.addChild(item);
      this.robot.scene.world.items.push(item);
      item.setOnCompleteEvent(function() {
        return _this.onComplete();
      });
      ret = blt;
    }
    this.setAsynchronous(ret !== false);
    return this.robot.onCmdComplete(RobotInstruction.PICKUP, ret);
  };

  PickupInstruction.prototype.onComplete = function() {
    this.robot.onAnimateComplete();
    return PickupInstruction.__super__.onComplete.call(this);
  };

  PickupInstruction.prototype.onParameterChanged = function(parameter) {
    return this._id = parameter.value;
  };

  PickupInstruction.prototype.clone = function() {
    var obj;

    obj = this.copy(new PickupInstruction(this.robot));
    obj._id = this._id;
    return obj;
  };

  PickupInstruction.prototype.mkLabel = function() {
    return PickupStr.label[this._id]();
  };

  PickupInstruction.prototype.mkDescription = function() {
    return PickupStr.description[this._id]();
  };

  PickupInstruction.prototype.getIcon = function() {
    this.icon.frame = this._id;
    return this.icon;
  };

  return PickupInstruction;

})(ActionInstruction);

HpBranchInstruction = (function(_super) {
  __extends(HpBranchInstruction, _super);

  function HpBranchInstruction(robot) {
    var parameter;

    this.robot = robot;
    HpBranchInstruction.__super__.constructor.call(this);
    parameter = new TipParameter(HpStr.colnum(), 1, 1, 4, 1);
    this.icon = new Icon(Game.instance.assets[R.TIP.LIFE], 32, 32);
    this.hp = 1;
    this.addParameter(parameter);
  }

  HpBranchInstruction.prototype.action = function() {
    return this.hp <= this.robot.hp;
  };

  HpBranchInstruction.prototype.clone = function() {
    var obj;

    obj = this.copy(new HpBranchInstruction(this.robot));
    obj.hp = this.hp;
    return obj;
  };

  HpBranchInstruction.prototype.onParameterChanged = function(parameter) {
    return this.hp = parameter.value;
  };

  HpBranchInstruction.prototype.mkDescription = function() {
    return HpStr.description(this.hp);
  };

  HpBranchInstruction.prototype.getIcon = function() {
    this.icon.frame = this._id;
    return this.icon;
  };

  return HpBranchInstruction;

})(BranchInstruction);

HoldBulletBranchInstruction = (function(_super) {
  var bltQueue;

  __extends(HoldBulletBranchInstruction, _super);

  bltQueue = null;

  function HoldBulletBranchInstruction(robot) {
    var parameter;

    this.robot = robot;
    HoldBulletBranchInstruction.__super__.constructor.apply(this, arguments);
    if (bltQueue === null) {
      bltQueue = [this.robot.bltQueue, this.robot.wideBltQueue, this.robot.dualBltQueue];
    }
    this._id = 0;
    this.bulletSize = 0;
    this.icon = new Icon(Game.instance.assets[R.TIP.REST_BULLET], 32, 32);
    parameter = new TipParameter(HoldBulletStr.colnum(HoldBulletStr.id.kind), 0, 0, 3, 1);
    parameter.id = HoldBulletStr.id.kind;
    this.addParameter(parameter);
    parameter = new TipParameter(HoldBulletStr.colnum(HoldBulletStr.id.size), 0, 0, 5, 1);
    parameter.id = HoldBulletStr.id.size;
    this.addParameter(parameter);
  }

  HoldBulletBranchInstruction.prototype.action = function() {
    return this.bulletSize <= bltQueue[this._id].size();
  };

  HoldBulletBranchInstruction.prototype.clone = function() {
    var obj;

    obj = this.copy(new HoldBulletBranchInstruction(this.robot));
    obj._id = this._id;
    obj.bulletSize = this.bulletSize;
    return obj;
  };

  HoldBulletBranchInstruction.prototype.onParameterChanged = function(parameter) {
    if (parameter.id === HoldBulletStr.id.kind) {
      return this._id = parameter.value;
    } else if (parameter.id === HoldBulletStr.id.size) {
      return this.bulletSize = parameter.value;
    }
  };

  HoldBulletBranchInstruction.prototype.mkLabel = function(parameter) {
    if (parameter.id === HoldBulletStr.id.kind) {
      return HoldBulletStr.label[this._id]();
    } else if (parameter.id === HoldBulletStr.id.size) {
      return parameter.value;
    }
  };

  HoldBulletBranchInstruction.prototype.mkDescription = function() {
    return HoldBulletStr.description[this._id](this.bulletSize);
  };

  HoldBulletBranchInstruction.prototype.getIcon = function() {
    this.icon.frame = this._id;
    return this.icon;
  };

  return HoldBulletBranchInstruction;

})(BranchInstruction);

SearchDirectBranchInstruction = (function(_super) {
  var stringObject;

  __extends(SearchDirectBranchInstruction, _super);

  stringObject = null;

  function SearchDirectBranchInstruction(robot, stringObj) {
    var parameter;

    this.robot = robot;
    this.direct = [Direct.RIGHT, Direct.RIGHT | Direct.UP, Direct.RIGHT | Direct.DOWN, Direct.LEFT, Direct.LEFT | Direct.UP, Direct.LEFT | Direct.DOWN];
    SearchDirectBranchInstruction.__super__.constructor.apply(this, arguments);
    stringObject = stringObj;
    this._id = 0;
    this.lenght = 1;
    parameter = new TipParameter(stringObject.colnum(stringObject.id.direct), 0, 0, 5, 1);
    parameter.id = stringObject.id.direct;
    this.addParameter(parameter);
    parameter = new TipParameter(stringObject.colnum(stringObject.id.lenght), 1, 1, 4, 1);
    parameter.id = stringObject.id.lenght;
    this.addParameter(parameter);
  }

  SearchDirectBranchInstruction.prototype.onParameterChanged = function(parameter) {
    var _this = this;

    if (parameter.id === stringObject.id.direct) {
      Map.instance.eachPlate(this.robot.currentPlate, this.direct[this._id], function(plate, i) {
        if (i > 0) {
          return plate.setState(Plate.STATE_NORMAL);
        }
      });
      this._id = parameter.value;
    } else if (parameter.id === stringObject.id.lenght) {
      this.lenght = parameter.value;
    }
    return Map.instance.eachPlate(this.robot.currentPlate, this.direct[this._id], function(plate, i) {
      if (i > 0 && i <= _this.lenght) {
        return plate.setState(Plate.STATE_SELECTED);
      } else if (i > 0 && i > _this.lenght) {
        return plate.setState(Plate.STATE_NORMAL);
      }
    });
  };

  SearchDirectBranchInstruction.prototype.onParameterComplete = function(parameter) {
    var _this = this;

    return Map.instance.eachPlate(this.robot.currentPlate, this.direct[this._id], function(plate, i) {
      if (i > 0) {
        return plate.setState(Plate.STATE_NORMAL);
      }
    });
  };

  SearchDirectBranchInstruction.prototype.mkLabel = function(parameter) {
    if (parameter.id === stringObject.id.direct) {
      return stringObject.label[this._id]();
    } else if (parameter.id === stringObject.id.lenght) {
      return parameter.value;
    }
  };

  SearchDirectBranchInstruction.prototype.mkDescription = function() {
    return stringObject.description[this._id](this.lenght);
  };

  SearchDirectBranchInstruction.prototype.getIcon = function() {
    this.icon.frame = this._id;
    return this.icon;
  };

  return SearchDirectBranchInstruction;

})(BranchInstruction);

SearchDirectRobotBranchInstruction = (function(_super) {
  __extends(SearchDirectRobotBranchInstruction, _super);

  function SearchDirectRobotBranchInstruction(robot) {
    this.robot = robot;
    this.icon = new Icon(Game.instance.assets[R.TIP.SEARCH_ENEMY], 32, 32);
    SearchDirectRobotBranchInstruction.__super__.constructor.call(this, this.robot, SearchingRobotDirectStr);
  }

  SearchDirectRobotBranchInstruction.prototype.action = function() {
    return Map.instance.isExistObject(this.robot.currentPlate, this.direct[this._id], this.lenght);
  };

  SearchDirectRobotBranchInstruction.prototype.clone = function() {
    var obj;

    obj = this.copy(new SearchDirectRobotBranchInstruction(this.robot, SearchingRobotDirectStr));
    obj._id = this._id;
    obj.lenght = this.lenght;
    return obj;
  };

  return SearchDirectRobotBranchInstruction;

})(SearchDirectBranchInstruction);

SearchDirectItemBranchInstruction = (function(_super) {
  __extends(SearchDirectItemBranchInstruction, _super);

  function SearchDirectItemBranchInstruction(robot) {
    this.robot = robot;
    this.icon = new Icon(Game.instance.assets[R.TIP.SEARCH_BARRIER], 32, 32);
    SearchDirectItemBranchInstruction.__super__.constructor.call(this, this.robot, SearchingItemDirectStr);
  }

  SearchDirectItemBranchInstruction.prototype.action = function() {
    var ret,
      _this = this;

    ret = false;
    Map.instance.eachPlate(this.robot.currentPlate, this.direct[this._id], function(plate, i) {
      if (plate.spotEnabled === true) {
        return ret = true;
      }
    });
    return true;
  };

  SearchDirectItemBranchInstruction.prototype.clone = function() {
    var obj;

    obj = this.copy(new SearchDirectItemBranchInstruction(this.robot, SearchingItemDirectStr));
    obj._id = this._id;
    obj.lenght = this.lenght;
    return obj;
  };

  return SearchDirectItemBranchInstruction;

})(SearchDirectBranchInstruction);

CurrentDirectBranchInstruction = (function(_super) {
  var frame;

  __extends(CurrentDirectBranchInstruction, _super);

  frame = [0, 4, 5, 2, 6, 7];

  function CurrentDirectBranchInstruction(robot) {
    var parameter;

    this.robot = robot;
    CurrentDirectBranchInstruction.__super__.constructor.apply(this, arguments);
    this.icon = new Icon(Game.instance.assets[R.TIP.CURRENT_DIRECT], 32, 32);
    this._id = 0;
    parameter = new TipParameter(CurrentDirectStr.colnum(), 0, 0, 5, 1);
    this.addParameter(parameter);
  }

  CurrentDirectBranchInstruction.prototype.action = function() {
    return this.robot.frame === frame[this._id];
  };

  CurrentDirectBranchInstruction.prototype.clone = function() {
    var obj;

    obj = this.copy(new CurrentDirectBranchInstruction(this.robot));
    obj._id = this._id;
    return obj;
  };

  CurrentDirectBranchInstruction.prototype.onParameterChanged = function(parameter) {
    return this._id = parameter.value;
  };

  CurrentDirectBranchInstruction.prototype.mkLabel = function(parameter) {
    return CurrentDirectStr.label[this._id]();
  };

  CurrentDirectBranchInstruction.prototype.mkDescription = function() {
    return CurrentDirectStr.description[this._id]();
  };

  CurrentDirectBranchInstruction.prototype.getIcon = function() {
    this.icon.frame = this._id;
    return this.icon;
  };

  return CurrentDirectBranchInstruction;

})(BranchInstruction);
