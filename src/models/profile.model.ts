import {Entity, hasMany, model, property} from '@loopback/repository';
import {Picture, PictureWithRelations} from './picture.model';

@model()
export class Profile extends Entity {
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
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  displayName: string;

  @property({
    type: 'string',
    required: true,
  })
  profilePicture: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @hasMany(() => Picture)
  pictures: Picture[];

  constructor(data?: Partial<Profile>) {
    super(data);
  }
}

export interface ProfileRelations {
  // describe navigational properties here
  pictures?: PictureWithRelations[];
}

export type ProfileWithRelations = Profile & ProfileRelations;
