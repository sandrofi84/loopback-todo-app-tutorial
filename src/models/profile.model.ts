import {Entity, model, property} from '@loopback/repository';

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
    type: 'array',
    itemType: 'object',
    required: true,
  })
  photos: object[];

  @property({
    type: 'string',
    required: true,
  })
  userId: string;


  constructor(data?: Partial<Profile>) {
    super(data);
  }
}

export interface ProfileRelations {
  // describe navigational properties here
}

export type ProfileWithRelations = Profile & ProfileRelations;
