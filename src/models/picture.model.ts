import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Profile, ProfileWithRelations} from './profile.model';

@model()
export class Picture extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  uri: string;

  @property({
    type: 'string',
    required: true,
  })
  provider: string;

  @belongsTo(() => Profile)
  profileId: string;

  constructor(data?: Partial<Picture>) {
    super(data);
  }
}

export interface PictureRelations {
  // describe navigational properties here
  profile?: ProfileWithRelations;
}

export type PictureWithRelations = Picture & PictureRelations;
