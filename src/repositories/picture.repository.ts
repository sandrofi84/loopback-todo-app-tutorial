import {DefaultCrudRepository} from '@loopback/repository';
import {Picture, PictureRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PictureRepository extends DefaultCrudRepository<
  Picture,
  typeof Picture.prototype.id,
  PictureRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Picture, dataSource);
  }
}
