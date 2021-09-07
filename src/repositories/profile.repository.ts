import {DefaultCrudRepository} from '@loopback/repository';
import {Profile, ProfileRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProfileRepository extends DefaultCrudRepository<
  Profile,
  typeof Profile.prototype.id,
  ProfileRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Profile, dataSource);
  }
}
