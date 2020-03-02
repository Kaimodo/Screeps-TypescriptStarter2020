// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  _trav: any;
  _travel: any;
  role: string;
  room: string;
  working: boolean;
  avoid: any;
}

interface Memory {
  [key: string]: any;
  uuid: number;
  log: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
    cc: any;
    Profiler: any;
  }
}

interface RoomMemory {
  [name: string]: any;
}
interface FlagMemory {
  [name: string]: any;
}
interface SpawnMemory {
  [name: string]: any;
}
