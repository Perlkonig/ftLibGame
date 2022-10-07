/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Definitions of possible on-screen game objects
 */
export type FullThrustGameObjects =
  | {
      objType: "ship";
      /**
       * The uuid of the ship found in the `ships` section.
       */
      id: string;
      /**
       * The name of the owning player. Must appear in the `header.players` attribute.
       */
      owner: string;
      /**
       * Either valid x,y coordinates or `null` if the object is cloaked or otherwise invisible
       */
      position: Position | null;
      /**
       * Expressed as a clock facing.
       */
      facing: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
      /**
       * Expressed as degrees. If given, vector movement is assumed for this ship.
       */
      course?: number;
      /**
       * Current speed
       */
      speed: number;
      /**
       * A list of movement vectors, usually rendered by drawing lines on the map. The first entry is the most recent and should be rendered most prominently. Each vector is itself an array of one or more points in the movement (showing course changes and the like).
       */
      vectors?: [Position, Position, ...Position[]][];
      /**
       * Unlike other objects and systems, fighter objects are created at the start of the game and are tracked throughout.
       */
      fighters?: ObjFighters[];
      /**
       * Lists any damaged/repaired systems. A system not listed here is considered pristine.
       */
      systems?: {
        /**
         * The uid of the system
         */
        id: string;
        /**
         * Typical interpretation is this: damaged systems can be repaired, destroyed systems can't be repaired, and repaired systems cannot be damaged, only destroyed.
         */
        state: "damaged" | "repaired" | "destroyed";
        [k: string]: unknown;
      }[];
      /**
       * Core systems are not a normal system. They must be recorded separately.
       */
      coreState?: {
        /**
         * If this propery exists, then the power core has been damaged. It's a simple boolean. It's either damaged or not.
         */
        powerless?: boolean;
        /**
         * Life support will fail once the given number of turns passes.
         */
        lifeless?: number;
        /**
         * No control of the ship for the given number of turns.
         */
        uncontrolled?: number;
        [k: string]: unknown;
      };
      /**
       * Records how much total hull damage has been done
       */
      dmgHull?: number;
      /**
       * Records how much damage has been done to each row of armour. The first element is the inner-most armour layer. Armour is striken off from left to right. It's best if regenerative armour is grouped to the right-hand side of the row.
       */
      dmgArmour?: number[];
      /**
       * Used to track ammo usage throughout the game (ordnance). Every time ammunition is consumed, insert the system id into this array. Each occurrence will reduce 1 from the SSD. For whole systems (like rocket pods), just mark the system as 'destroyed.'
       */
      ammo?: string[];
      [k: string]: unknown;
    }
  | ObjFighters
  | {
      objType: "ordnance";
      /**
       * Every object needs a universally unique identifier
       */
      id: string;
      /**
       * If provided, the device will be marked as owned by that player colour and will theoretically not target friendly ships
       */
      owner?: string;
      /**
       * These are the built-in ordnance types, with an option for custom types
       */
      type: "missile" | "amt" | "salvo" | "salvoER" | "salvoMS" | "plasmaBolt" | "mine" | "rocket" | "_other";
      /**
       * If `type` is `_other`, then you can provide an SVG silhouette here, otherwise a generic marker will be used. The SVG must be a `<symbol>` tag with a `viewBox` attribute and an `id` attribute of the id provided above.
       */
      silhouette?: string;
      position: Position;
      /**
       * If given, hints to the renderer what to display if the object is clicked. Usually used to show a homing or explosion range. Expressed in MUs.
       */
      range?: number;
      [k: string]: unknown;
    }
  | {
      objType: "other";
      /**
       * Every object needs a universally unique identifier
       */
      id: string;
      /**
       * There are built-in types, but custom ones are permitted as well.
       */
      type: "asteroid" | "debris" | "_other";
      /**
       * If `type` is `_other`, then you can provide an SVG silhouette here, otherwise a generic marker will be used. The SVG must be a `<symbol>` tag with a `viewBox` attribute and an `id` attribute of the id provided above.
       */
      silhouette?: string;
      position: Position;
      /**
       * These objects can be made to move in an arbitrary direction. Given as degrees
       */
      course?: number;
      /**
       * Speed of movement in MUs/turn
       */
      speed?: number;
      [k: string]: unknown;
    }
  | ObjPlayer;
/**
 * Definitions of possible commands that change game state
 */
export type FullThrustGameCommands =
  | {
      name: "moveShip";
      /**
       * The uuid of the ship found in the `ships` section.
       */
      id: string;
      position?: Position;
      /**
       * Expressed as a clock facing.
       */
      facing?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
      /**
       * Expressed as degrees. If given, vector movement is assumed for this ship.
       */
      course?: number;
      /**
       * Current speed
       */
      speed?: number;
      /**
       * A list of movement vectors involved in this command. This will be simply added to the existing array.
       *
       * @minItems 2
       */
      vectors?: [Position, Position, ...Position[]];
    }
  | {
      name: "layMine";
      /**
       * The uuid of the ship laying the mine.
       */
      ship: string;
      position: Position1;
    }
  | {
      name: "launchFighters";
      /**
       * The uuid of the launching ship.
       */
      ship: string;
      /**
       * The uuid of the fighter squadron being launched.
       */
      id: string;
      position: Position;
    }
  | {
      name: "launchOrdnance";
      /**
       * The uuid of the launching ship.
       */
      ship: string;
      /**
       * The uuid of the system being triggered. This is what determines the icon to display.
       */
      systemId?: string;
      position: Position;
    }
  | {
      name: "moveOrdnance";
      /**
       * Uuid of ordnance object
       */
      id: string;
      position: Position;
    }
  | {
      name: "useAmmo";
      /**
       * Uuid of the ship
       */
      ship: string;
      /**
       * Uuid of the launching system
       */
      systemId: string;
    }
  | {
      name: "moveFighters";
      /**
       * Uuid of the fighter group
       */
      id: string;
      /**
       * Either a 'position' if launched, or a hangar id if docked.
       */
      position?: Hangar | Position;
      /**
       * Expressed as a clock facing.
       */
      facing?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
      /**
       * A list of movement vectors. Added to the existing vector array.
       *
       * @minItems 2
       */
      vectors?: [Position, Position, ...Position[]];
    }
  | {
      name: "adjustFighters";
      /**
       * Uuid of the fighter group
       */
      id: string;
      /**
       * The number of surviving fighters in the squadron
       */
      number?: number;
      /**
       * The squad's endurance, which is reset when recovered.
       */
      endurance?: number;
      /**
       * Only needed if you are playing with ace/turkey rules
       */
      skill?: "standard" | "ace" | "turkey";
    }
  | {
      name: "fireWeapon";
      /**
       * The uuid of the firing ship
       */
      ship: string;
      /**
       * The uid of the firing weapon system
       */
      weapon: string;
      /**
       * The uuid of target being fired at, whether ship, ordnance, or other
       */
      target: string;
    }
  | {
      name: "dmgShip";
      /**
       * The uuid of the ship object
       */
      ship: string;
      /**
       * Number of hull points lost
       */
      hull: number;
      /**
       * Number of boxes of armour lost. First element is the innermost shell.
       *
       * @minItems 1
       */
      armour?: [number, ...number[]];
    }
  | {
      name: "regenArmour";
      /**
       * The uuid of the ship in question
       */
      ship: string;
      /**
       * Number of boxes of armour to repair. First element is the innermost shell.
       *
       * @minItems 1
       */
      armour: [number, ...number[]];
    }
  | {
      name: "sysDisable";
      /**
       * Uuid of the ship
       */
      ship: string;
      /**
       * Uid of the system
       */
      system: string;
      /**
       * This is only helpful for humans to keep track of whether a system has been repaired before or not. The appearance in the game doesn't necessarily change.
       */
      state?: "damaged" | "destroyed";
    }
  | {
      name: "sysEnable";
      /**
       * Uuid of the ship
       */
      ship: string;
      /**
       * Uid of the system
       */
      system: string;
      /**
       * This is only helpful for humans to keep track of whether a system has been repaired before or not. The appearance in the game doesn't necessarily change.
       */
      state?: "repaired" | null;
    }
  | {
      name: "objDestroy";
      /**
       * Uuid of the object in question
       */
      uuid: string;
    }
  | {
      name: "objHide";
      /**
       * Uuid of the object in question
       */
      uuid: string;
    }
  | {
      name: "_custom";
      msg: string;
    };

/**
 * Representation of a valid Full Thrust game
 */
export interface FullThrustGame {
  /**
   * If present, this signals that the game record is from a particular player's perspective and therefore incomplete. This only happens if you have someone moderating a closed-book game. Certain ships may contain little or no information.
   */
  perspective?: string;
  /**
   * Only present in a closed-book game. It signals what information is visible to each player about individual ships. Once fully visible to all players, the entry is removed, so once all ships have been revealed, this property should be removed.
   */
  masks?: {
    /**
     * The uid of the ship in question
     */
    ship: string;
    /**
     * The name of the player this mask affects. `ship` + `perspective` should be unique.
     */
    perspective: string;
    /**
     * A description of the type of data available. If all information is available, then simply remove the entry. Full information is the default state. The levels are as follows: (0) no information (bogey and general class); (1) true mass; (2) mass, drive, and screens; (3) full system list (original; nothing about current status of systems or hull).
     */
    detail: 0 | 1 | 2 | 3;
    [k: string]: unknown;
  }[];
  /**
   * List of meta information about the game
   */
  header?: {
    /**
     * An arbitrary name/description of the game
     */
    name?: string;
    /**
     * A short description of the universe the game is taking place in (e.g., 'Babylon 5' or 'Star Trek')
     */
    universe?: string;
    /**
     * If this game is part of a larger campaign, give the campaign name here (should be consistent across all associated game reports)
     */
    campaign?: string;
    /**
     * Player names
     *
     * @minItems 1
     */
    players?: [string, ...string[]];
    /**
     * Name of the game moderator, if applicable
     */
    moderator?: string;
    dateStart?: string;
    dateEnd?: string;
    winner?: string;
    [k: string]: unknown;
  };
  /**
   * A description of the playing field
   */
  map?: {
    dimensions?: Dimensions;
    /**
     * List of stationary background features to add to the underlying map (e.g., planets, nebula, etc). Do *not* add moving or destructible objects here, like asteroids.
     */
    features?: MapFeature[];
    [k: string]: unknown;
  };
  /**
   * To avoid duplicating largely unchanging ship definitions, they are stated in full only once, here. Each ship must have a universally unique ID (`uuid` property) that is then referenced by other objects in the schema.
   */
  ships?: FullThrustShip[];
  /**
   * Each game consists of one or more turns. Each turn has a starting position followed by a list of 'commands' that change that starting position. The current visual state of any game turn is the sum of the starting position and all the commands to that point. The next turn's starting position is the sum of the previous turn's starting position and all commands. This makes it possible for a viewer to step forward and back both turn by turn and change by change. Commands can also be batched if they are tightly bound.
   */
  turns?: {
    /**
     * This is the starting state of the turn. It is the sum of the previous turn's starting state and all commands. It contains the essential information for all on-screen objects.
     */
    initialState?: FullThrustGameObjects[];
    /**
     * List of commands to apply to the initial state. Applied in the order received.
     */
    commands?: FullThrustGameCommands[];
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}
/**
 * If the map is fixed, give the dimensions here, otherwise each turn will have its own map dimensions.
 */
export interface Dimensions {
  topLeftCorner: Position;
  /**
   * Given in MUs.
   */
  width: number;
  /**
   * Given in MUs.
   */
  height: number;
  [k: string]: unknown;
}
/**
 * Generic x,y coordinate object. All units are in MUs relative to 0,0.
 */
export interface Position {
  x: number;
  y: number;
  [k: string]: unknown;
}
export interface MapFeature {
  /**
   * Unique identifier for this feature. Must match the `id` attribute in the associated SVG symbol
   */
  id: string;
  /**
   * All features must be expressed as an svg `<symbol>` tag with both a `viewBox` attribute and an `id` attribute that matches the `id` given above.
   */
  symbol: string;
  /**
   * Given in MUs.
   */
  x: number;
  /**
   * Given in MUs.
   */
  y: number;
  /**
   * Given in MUs.
   */
  width: number;
  /**
   * Given in MUs.
   */
  height: number;
  [k: string]: unknown;
}
/**
 * Representation of a valid Full Thrust ship
 */
export interface FullThrustShip {
  points?: number;
  cpv?: number;
  mass?: number;
  hull?: {
    points: number;
    rows: 3 | 4 | 5 | 6;
    stealth: "0" | "1" | "2";
    streamlining: "none" | "partial" | "full";
  };
  /**
   * Rows of armour. First element being the innermost layer. No layer can be larger than the first row of hull boxes. The use of 'oneOf' here is for backwards compatibility.
   */
  armour?: [number, number][];
  /**
   * This property contains all systems that get checked on threshold rolls but that are not used during the 'fire' or 'ordnance' phases of play.
   */
  systems?: (
    | {
        name: "drive";
        advanced?: boolean;
        thrust: number;
        [k: string]: unknown;
      }
    | {
        name: "ftl";
        advanced?: boolean;
        [k: string]: unknown;
      }
    | {
        name: "fireControl" | "adfc" | "sensors";
        advanced?: boolean;
        [k: string]: unknown;
      }
    | {
        name: "hangar";
        isRack?: boolean;
        /**
         * A unique identifier used to target this hangar in orders and in the `fighters` property.
         */
        id: string;
        [k: string]: unknown;
      }
    | {
        name: "launchTube";
        catapult?: boolean;
        [k: string]: unknown;
      }
    | {
        name: "screen";
        advanced?: boolean;
        area?: boolean;
        [k: string]: unknown;
      }
    | {
        name:
          | "suicide"
          | "mineSweeper"
          | "damageControl"
          | "marines"
          | "stealthField"
          | "holofield"
          | "cloakDevice"
          | "cloakField"
          | "ortillery"
          | "reflex";
        [k: string]: unknown;
      }
    | {
        name: "mineLayer";
        capacity?: number;
        [k: string]: unknown;
      }
    | {
        name: "decoy";
        type?: "cruiser" | "capital";
        [k: string]: unknown;
      }
    | {
        name: "bay";
        type: "cargo" | "passenger" | "troop";
        capacity: number;
        /**
         * A unique identifier used to target this specific bay in orders.
         */
        id: string;
        [k: string]: unknown;
      }
    | {
        name: "magazine";
        /**
         * A unique identifier used to tie this magazine to one or more launchers.
         */
        id?: string;
        modifier?: "er" | "twostage";
        capacity?: number;
        [k: string]: unknown;
      }
    | {
        name: "ecm";
        area?: boolean;
        [k: string]: unknown;
      }
    | {
        name: "turret";
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: 1 | 2 | 3 | 4 | 5 | 6;
        /**
         * A list of weapon IDs housed within this turret.
         */
        weapons?: string[];
        /**
         * Purely used by SSD generators to size the turret relative to other systems. Turret glyphs are always square.
         */
        size?: number;
        [k: string]: unknown;
      }
  )[];
  /**
   * This property contains all systems that get deployed during the 'ordnance' phase of play. These systems are also checked on threshold rolls.
   */
  ordnance?: (
    | {
        name: "antiMatterMissile";
        [k: string]: unknown;
      }
    | {
        name: "missile" | "salvo";
        modifier?: "er" | "twostage";
        [k: string]: unknown;
      }
    | {
        name: "salvoLauncher";
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: 3;
        /**
         * The unique ID of a missile magazine
         */
        magazine?: string;
        [k: string]: unknown;
      }
    | {
        name: "rocketPod";
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: 3;
        [k: string]: unknown;
      }
  )[];
  /**
   * This property contains all systems that players can trigger during the 'fire' phase of play. These systems are also checked on threshold rolls.
   */
  weapons?: (
    | {
        name: "pds" | "scatterGun" | "grapeshot" | "spinalNova" | "spinalWave";
        [k: string]: unknown;
      }
    | {
        name: "spinalBeam" | "spinalPlasma" | "spinalSingularity";
        range: "short" | "medium" | "long";
        [k: string]: unknown;
      }
    | {
        name: "ads";
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: 3 | 6;
        [k: string]: unknown;
      }
    | {
        name: "submunition";
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: 3;
        [k: string]: unknown;
      }
    | {
        name: "pulser";
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: 1 | 3 | 6;
        range?: "undefined" | "long" | "medium" | "short";
        [k: string]: unknown;
      }
    | {
        name: "beam" | "emp" | "plasmaCannon" | "phaser" | "transporter" | "needle";
        class: 1 | 2 | 3 | 4;
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: number;
        [k: string]: unknown;
      }
    | {
        name: "graser";
        heavy?: boolean;
        highIntensity?: boolean;
        class: 1 | 2 | 3 | 4;
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: number;
        [k: string]: unknown;
      }
    | {
        name: "gatling" | "particle" | "meson" | "fusion";
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: number;
        [k: string]: unknown;
      }
    | {
        name: "torpedoPulse";
        modifier?: "short" | "long";
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: number;
        [k: string]: unknown;
      }
    | {
        name: "kgun";
        class: 1 | 2 | 3 | 4 | 5 | 6;
        modifier?: "short" | "long";
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: number;
        [k: string]: unknown;
      }
    | {
        name: "gravitic";
        class: 1 | 2 | 3;
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: number;
        [k: string]: unknown;
      }
    | {
        name: "pbl";
        class: 1 | 2 | 3 | 4 | 5 | 6;
        leftArc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        numArcs: number;
        [k: string]: unknown;
      }
    | {
        name: "mkp";
        arc: "F" | "FS" | "FP" | "A" | "AS" | "AP";
        [k: string]: unknown;
      }
  )[];
  /**
   * This property contains all systems that do NOT get checked on threshold rolls. Currently there aren't any.
   */
  extras?: {
    [k: string]: unknown;
  };
  /**
   * There cannot be more fighters than hangars.
   */
  fighters?: {
    /**
     * The fighters' base type
     */
    type:
      | "standard"
      | "interceptor"
      | "attack"
      | "torpedo"
      | "graser"
      | "plasma"
      | "MKP"
      | "missile"
      | "multiRole"
      | "light"
      | "lightInterceptor"
      | "lightAttack";
    mods?: ("heavy" | "fast" | "longRange" | "ftl" | "robot")[];
    /**
     * Must match a hangar id. Omitted if the fighters are deployed.
     */
    hangar?: string;
    /**
     * Only needed during game play to track squadron size over time
     */
    number?: number;
    /**
     * Only needed during game play and only if you are playing with ace/turkey rules
     */
    skill?: "standard" | "ace" | "turkey";
    [k: string]: unknown;
  }[];
  class?: string;
  name?: string;
  /**
   * Only needed during actual game play where each ship needs a truly unique ID.
   */
  uuid?: string;
  /**
   * Markdown-encoded flavour text attached to this particular ship.
   */
  notes?: string;
  /**
   * The symbol you'd want to represent this ship in a game viewer. It must be a `<symbol>` with a `viewBox` attribute. The `id` attribute is set by the renderer.
   */
  silhouette?: string;
  [k: string]: unknown;
}
export interface ObjFighters {
  objType: "fighters";
  /**
   * The uuid of the squadron found in the `ships.fighters` section.
   */
  id: string;
  /**
   * The name of the owning player. Must appear in the `header.players` attribute.
   */
  owner: string;
  /**
   * Either a 'position' if launched, or a hangar id if docked.
   */
  position?: Hangar | Position;
  /**
   * Expressed as a clock facing.
   */
  facing?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /**
   * A list of movement vectors, usually rendered by drawing lines on the map. The first entry is the most recent and should be rendered most prominently. Each vector is itself an array of one or more points in the movement (showing course changes and the like).
   */
  vectors?: [Position, Position, ...Position[]][];
  /**
   * The number of surviving fighters in the squadron
   */
  number: number;
  /**
   * The squad's endurance, which is reset when recovered.
   */
  endurance: number;
  /**
   * Only needed if you are playing with ace/turkey rules
   */
  skill: "standard" | "ace" | "turkey";
  [k: string]: unknown;
}
export interface Hangar {
  /**
   * The uuid of the ship the squadron is housed in.
   */
  ship?: string;
  /**
   * The uid of the hangar on that ship where the squadron is housed.
   */
  hangar?: string;
  [k: string]: unknown;
}
/**
 * Used for representing things that might change about a player over the course of the game; currently just victory points
 */
export interface ObjPlayer {
  objType: "player";
  /**
   * The name of the player from the `header` field.
   */
  name: string;
  /**
   * Current victory point total
   */
  vp?: number;
  [k: string]: unknown;
}
/**
 * Generic x,y coordinate object. All units are in MUs relative to 0,0.
 */
export interface Position1 {
  x: number;
  y: number;
  [k: string]: unknown;
}
