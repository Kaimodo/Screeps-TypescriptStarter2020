import * as Inscribe from "screeps-inscribe";
import * as Config from "settings/config";

export function log_info() {
  // Periodic logging of useful info
  if (Game.time % 100 === 0) {
    // CPU: limit: 30, tickLimit: 500, bucket: 10000, used: 4.08803
    console.log(
      `[${Inscribe.color(Config.roomName, "skyblue")}]| Game-Tick: ${Game.time}` + "| CPU Used: " + Game.cpu.getUsed()
    );
  }
}
