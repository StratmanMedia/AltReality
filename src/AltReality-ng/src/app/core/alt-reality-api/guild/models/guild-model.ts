import { RealmModel } from 'src/app/core/alt-reality-api/realm/models/realm-model';

export class GuildModel {
  id: number;
  name: string;
  realm: RealmModel;
  faction: string;
  slug: string;
}
