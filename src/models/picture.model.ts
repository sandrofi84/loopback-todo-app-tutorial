import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'string',
    required: true,
  })
  profileId: string;


  constructor(data?: Partial<Picture>) {
    super(data);
  }
}

export interface PictureRelations {
  // describe navigational properties here
}

export type PictureWithRelations = Picture & PictureRelations;
