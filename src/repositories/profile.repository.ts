import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {PictureRepository} from '.';
import {DbDataSource} from '../datasources';
import {Picture, Profile, ProfileRelations} from '../models';

export class ProfileRepository extends DefaultCrudRepository<
  Profile,
  typeof Profile.prototype.id,
  ProfileRelations
> {
  public readonly pictures: HasManyRepositoryFactory<
    Picture,
    typeof Profile.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('PictureRepository')
    protected pictureRepositoryGetter: Getter<PictureRepository>,
  ) {
    super(Profile, dataSource);
    this.pictures = this.createHasManyRepositoryFactoryFor(
      'pictures',
      pictureRepositoryGetter,
    );
    this.registerInclusionResolver('pictures', this.pictures.inclusionResolver);
  }
}
