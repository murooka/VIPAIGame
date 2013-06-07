// Generated by CoffeeScript 1.6.2
var Config;

Config = (function() {
  function Config() {}

  Config.GAME_WIDTH = 1280;

  Config.GAME_HEIGHT = 640;

  Config.GAME_OFFSET_X = 640;

  Config.GAME_OFFSET_Y = 0;

  return Config;

})();

Config.R = (function() {
  function R() {}

  R.RESOURCE_DIR = "resources";

  R.CHAR = {
    PLAYER: "" + R.RESOURCE_DIR + "/robot/player.png",
    ENEMY: "" + R.RESOURCE_DIR + "/robot/enemy.png"
  };

  R.BACKGROUND_IMAGE = {
    SPACE: "" + R.RESOURCE_DIR + "/background/background_space.png",
    HEADER: "" + R.RESOURCE_DIR + "/background/header.png",
    HP_YELLOW: "" + R.RESOURCE_DIR + "/background/hp_yellow.png",
    HP_BULE: "" + R.RESOURCE_DIR + "/background/hp_blue.png",
    HP_ENCLOSE: "" + R.RESOURCE_DIR + "/background/hpenclose.png",
    PLATE: "" + R.RESOURCE_DIR + "/background/plate.png",
    MSGBOX: "" + R.RESOURCE_DIR + "/background/msgbox.png",
    STATUS_BOX: "" + R.RESOURCE_DIR + "/background/statusbox.png",
    NEXT_BUTTON: "" + R.RESOURCE_DIR + "/background/next_button.png"
  };

  R.UI = {
    FONT0: "" + R.RESOURCE_DIR + "/ui/font0.png",
    ICON0: "" + R.RESOURCE_DIR + "/ui/icon0.png",
    PAD: "" + R.RESOURCE_DIR + "/ui/pad.png",
    APAD: "" + R.RESOURCE_DIR + "/ui/apad.png"
  };

  R.EFFECT = {
    EXPLOSION: "" + R.RESOURCE_DIR + "/effect/explosion_64x64.png",
    SHOT: "" + R.RESOURCE_DIR + "/effect/shot_player.png",
    SPOT_NORMAL: "" + R.RESOURCE_DIR + "/effect/spot_normal.png",
    SPOT_WIDE: "" + R.RESOURCE_DIR + "/effect/spot_wide.png",
    SPOT_DUAL: "" + R.RESOURCE_DIR + "/effect/spot_dual.png",
    BARRIER_NORMAL: "" + R.RESOURCE_DIR + "/effect/barrier_normal.png",
    BARRIER_WIDE: "" + R.RESOURCE_DIR + "/effect/barrier_wide.png",
    BARRIER_DUAL: "" + R.RESOURCE_DIR + "/effect/barrier_dual.png",
    ENPOWER_NORMAL: "" + R.RESOURCE_DIR + "/effect/enpower_normal.png",
    ENPOWER_WIDE: "" + R.RESOURCE_DIR + "/effect/enpower_wide.png",
    ENPOWER_DUAL: "" + R.RESOURCE_DIR + "/effect/enpower_dual.png"
  };

  R.BULLET = {
    ENEMY: "" + R.RESOURCE_DIR + "/bullet/bullet1.png",
    NORMAL: "" + R.RESOURCE_DIR + "/bullet/normal.png",
    WIDE: "" + R.RESOURCE_DIR + "/bullet/wide.png",
    DUAL: "" + R.RESOURCE_DIR + "/bullet/dual.png"
  };

  R.ITEM = {
    NORMAL_BULLET: "" + R.RESOURCE_DIR + "/item/normal_bullet_item.png",
    WIDE_BULLET: "" + R.RESOURCE_DIR + "/item/wide_bullet_item.png",
    DUAL_BULLET: "" + R.RESOURCE_DIR + "/item/dual_bullet_item.png",
    STATUS_BULLET: "" + R.RESOURCE_DIR + "/item/status_bullet.png",
    STATUS_BARRIER: "" + R.RESOURCE_DIR + "/item/status_barrier.png"
  };

  R.TIP = {
    ARROW: "" + R.RESOURCE_DIR + "/tip/arrow.png",
    LIFE: "" + R.RESOURCE_DIR + "/tip/arrow.png",
    PICKUP_BULLET: "" + R.RESOURCE_DIR + "/tip/plus_bullet.png",
    SHOT_BULLET: "" + R.RESOURCE_DIR + "/tip/shot_bullet.png",
    SEARCH_BARRIER: "" + R.RESOURCE_DIR + "/tip/search_barrier.png",
    SEARCH_ENEMY: "" + R.RESOURCE_DIR + "/tip/search_enemy.png",
    CURRENT_DIRECT: "" + R.RESOURCE_DIR + "/tip/arrow.png",
    REST_BULLET: "" + R.RESOURCE_DIR + "/tip/rest_bullet.png"
  };

  return R;

})();

Config.R.String = (function() {
  function String() {}

  String.PLAYER = "プレイヤー";

  String.ENEMY = "エネミー";

  String.CANNOTMOVE = "移動てきません";

  String.CANNOTSHOT = "弾切れです";

  String.CANNOTPICKUP = "弾を補充できません";

  String.pickup = function(s) {
    return "" + s + "は弾を一つ補充しました";
  };

  String.shot = function(s) {
    return "" + s + "は攻撃しました";
  };

  String.move = function(s, x, y) {
    return "" + s + "は(" + x + "," + y + ")に移動しました";
  };

  String.INSTRUCTION = {
    Move: {
      colnum: function() {
        return "移動方向";
      },
      label: [
        function() {
          return "右";
        }, function() {
          return "右上";
        }, function() {
          return "右下";
        }, function() {
          return "左";
        }, function() {
          return "左上";
        }, function() {
          return "左下";
        }
      ],
      description: [
        function(step) {
          return "右に" + step + "マス移動します";
        }, function(step) {
          return "右上に" + step + "マス移動します";
        }, function(step) {
          return "右下に" + step + "マス移動します";
        }, function(step) {
          return "左に" + step + "マス移動します";
        }, function(step) {
          return "左上に" + step + "マス移動します";
        }, function(step) {
          return "左下に" + step + "マス移動します";
        }
      ]
    },
    Shot: {
      colnum: function() {
        return "弾の種類";
      },
      label: [
        function() {
          return "ストレート";
        }, function() {
          return "ワイド";
        }, function() {
          return "デュアル";
        }
      ],
      description: [
        function() {
          return "自機の前に4マス分弾を発射します";
        }, function() {
          return "自機の右前と左前に2マス分弾を発射します";
        }, function() {
          return "自機の前後に2マス分弾を発射します";
        }
      ]
    },
    Pickup: {
      colnum: function() {
        return "弾の種類";
      },
      label: [
        function() {
          return "ストレート";
        }, function() {
          return "ワイド";
        }, function() {
          return "デュアル";
        }
      ],
      description: [
        function() {
          return "ストレートバレッドを拾います";
        }, function() {
          return "ワイドバレッドを拾います";
        }, function() {
          return "デュアルバレッドを拾います";
        }
      ]
    },
    Hp: {
      colnum: function() {
        return "HP";
      },
      description: function(hp) {
        return "HPが" + hp + "以上の時、青矢印に進みます。</ br>HPが" + hp + "未満の時、赤矢印に進みます。";
      }
    },
    HoldBulleft: {
      id: {
        kind: "kind",
        size: "size"
      },
      colnum: function(id) {
        if (id === "kind") {
          return "弾の種類";
        } else if (id === "size") {
          return "弾数";
        }
      },
      label: [
        function() {
          return "ストレート";
        }, function() {
          return "ワイド";
        }, function() {
          return "デュアル";
        }
      ],
      description: [
        function(size) {
          return "ストレートバレッドの保持数が" + size + "以上の時、青矢印に進みます。</br>ストレートバレッドの保持数が" + size + "未満の時、赤矢印に進みます。";
        }, function(size) {
          return "ワイドバレッドの保持数が" + size + "以上の時、青矢印に進みます。</br>ワイドバレッドの保持数が" + size + "未満の時、赤矢印に進みます。";
        }, function(size) {
          return "デュアルバレッドの保持数が" + size + "以上の時、青矢印に進みます。</br>デュアルバレッドの保持数が" + size + "未満の時、赤矢印に進みます。";
        }
      ]
    },
    SearchingRobotDirect: {
      id: {
        direct: "direct",
        lenght: "lenght"
      },
      colnum: function(id) {
        switch (id) {
          case "direct":
            return "方向";
          case "lenght":
            return "距離";
        }
      },
      label: [
        function() {
          return "右";
        }, function() {
          return "右上";
        }, function() {
          return "右下";
        }, function() {
          return "左";
        }, function() {
          return "左上";
        }, function() {
          return "左下";
        }
      ],
      description: [
        function(step) {
          return "右に" + step + "マス索敵を行い敵が見つかった場合、青矢印に進みます。</br>見つからなかった場合、赤矢印に進みます。";
        }, function(step) {
          return "右上に" + step + "マス索敵を行い敵が見つかった場合、青矢印に進みます。</br>見つからなかった場合、赤矢印に進みます。";
        }, function(step) {
          return "右下に" + step + "マス索敵を行い敵が見つかった場合、青矢印に進みます。</br>見つからなかった場合、赤矢印に進みます。";
        }, function(step) {
          return "左に" + step + "マス索敵を行い敵が見つかった場合、青矢印に進みます。</br>見つからなかった場合、赤矢印に進みます。";
        }, function(step) {
          return "左上に" + step + "マス索敵を行い敵が見つかった場合、青矢印に進みます。</br>見つからなかった場合、赤矢印に進みます。";
        }, function(step) {
          return "左下に" + step + "マス索敵を行い敵が見つかった場合、青矢印に進みます。</br>見つからなかった場合、赤矢印に進みます。";
        }
      ]
    },
    SearchingItemDirect: {
      id: {
        direct: "direct",
        lenght: "lenght"
      },
      colnum: function(id) {
        switch (id) {
          case "direct":
            return "方向";
          case "lenght":
            return "距離";
        }
      },
      label: [
        function() {
          return "右";
        }, function() {
          return "右上";
        }, function() {
          return "右下";
        }, function() {
          return "左";
        }, function() {
          return "左上";
        }, function() {
          return "左下";
        }
      ],
      description: [
        function(step) {
          return "右に" + step + "マス索敵を行いバリアアイテムが見つかった場合、青矢印に進みます。</br>見つからなかった場合、赤矢印に進みます。";
        }, function(step) {
          return "右上に" + step + "マス索敵を行いバリアアイテムが見つかった場合、青矢印に進みます。</br>見つからなかった場合、赤矢印に進みます。";
        }, function(step) {
          return "右下に" + step + "マス索敵を行いバリアアイテムが見つかった場合、青矢印に進みます。</br>見つからなかった場合、赤矢印に進みます。";
        }, function(step) {
          return "左に" + step + "マス索敵を行いバリアアイテムが見つかった場合、青矢印に進みます。</br>見つからなかった場合、赤矢印に進みます。";
        }, function(step) {
          return "左上に" + step + "マス索敵を行いバリアアイテムが見つかった場合、青矢印に進みます。</br>見つからなかった場合、赤矢印に進みます。";
        }, function(step) {
          return "左下に" + step + "マス索敵を行いバリアアイテムが見つかった場合、青矢印に進みます。</br>見つからなかった場合、赤矢印に進みます。";
        }
      ]
    },
    CurrentDirect: {
      colnum: function() {
        return " 方向";
      },
      label: [
        function() {
          return "右";
        }, function() {
          return "右上";
        }, function() {
          return "右下";
        }, function() {
          return "左";
        }, function() {
          return "左上";
        }, function() {
          return "左下";
        }
      ],
      description: [
        function(step) {
          return "右を向いている場合、青矢印に進み、他の方向の場合赤矢印に進みます。";
        }, function(step) {
          return "右上を向いている場合、青矢印に進み、他の方向の場合赤矢印に進みます。";
        }, function(step) {
          return "右下を向いている場合、青矢印に進み、他の方向の場合赤矢印に進みます。";
        }, function(step) {
          return "左を向いている場合、青矢印に進み、他の方向の場合赤矢印に進みます。";
        }, function(step) {
          return "左上を向いている場合、青矢印に進み、他の方向の場合赤矢印に進みます。";
        }, function(step) {
          return "左下を向いている場合、青矢印に進み、他の方向の場合赤矢印に進みます。";
        }
      ]
    }
  };

  return String;

})();
