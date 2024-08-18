import { WowAccount } from "./wow-account";

export class BattleNetProfile {
  guid: string;
  id: number;
  battleTag: string;
  wowAccounts: WowAccount[];
}