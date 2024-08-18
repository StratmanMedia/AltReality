import { RealmModel } from 'src/app/core/alt-reality-api/realm/models/realm-model';
import { GuildModel } from 'src/app/core/alt-reality-api/guild/models/guild-model';
import { CharacterMediaModel } from './character-media-model';

export class CharacterModel {
  id: number;
  name: string;
  gender: string;
  faction: string;
  race: string;
  playableClass: string;
  activeSpecialization: string;
  realm: RealmModel;
  guild: GuildModel;
  level: number;
  experience: number;
  achievementPoints: number;
  lastLogin: Date;
  averageItemLevel: number;
  equippedItemLevel: number;
  activeTitleId: number;
  media: CharacterMediaModel;
  wowAccountId: number;
}
