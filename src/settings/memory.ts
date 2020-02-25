import * as Config from "settings/config";

export let MemoryVersion = Config.MEMORY_VERSION;

export function setMemVersion(value: number): void {
  MemoryVersion = value;
}

export function getMemVersion(): number {
  return MemoryVersion;
}

export interface GameMemory {
  memVersion: number | undefined;
}
