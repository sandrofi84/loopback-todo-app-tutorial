import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Picture} from '../models';
import {PictureRepository} from '../repositories';

export class PictureController {
  constructor(
    @repository(PictureRepository)
    public pictureRepository : PictureRepository,
  ) {}

  @post('/pictures', {
    responses: {
      '200': {
        description: 'Picture model instance',
        content: {'application/json': {schema: getModelSchemaRef(Picture)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Picture, {
            title: 'NewPicture',
            exclude: ['id'],
          }),
        },
      },
    })
    picture: Omit<Picture, 'id'>,
  ): Promise<Picture> {
    return this.pictureRepository.create(picture);
  }

  @get('/pictures/count', {
    responses: {
      '200': {
        description: 'Picture model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Picture) where?: Where<Picture>,
  ): Promise<Count> {
    return this.pictureRepository.count(where);
  }

  @get('/pictures', {
    responses: {
      '200': {
        description: 'Array of Picture model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Picture, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Picture) filter?: Filter<Picture>,
  ): Promise<Picture[]> {
    return this.pictureRepository.find(filter);
  }

  @patch('/pictures', {
    responses: {
      '200': {
        description: 'Picture PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Picture, {partial: true}),
        },
      },
    })
    picture: Picture,
    @param.where(Picture) where?: Where<Picture>,
  ): Promise<Count> {
    return this.pictureRepository.updateAll(picture, where);
  }

  @get('/pictures/{id}', {
    responses: {
      '200': {
        description: 'Picture model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Picture, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Picture, {exclude: 'where'}) filter?: FilterExcludingWhere<Picture>
  ): Promise<Picture> {
    return this.pictureRepository.findById(id, filter);
  }

  @patch('/pictures/{id}', {
    responses: {
      '204': {
        description: 'Picture PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Picture, {partial: true}),
        },
      },
    })
    picture: Picture,
  ): Promise<void> {
    await this.pictureRepository.updateById(id, picture);
  }

  @put('/pictures/{id}', {
    responses: {
      '204': {
        description: 'Picture PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() picture: Picture,
  ): Promise<void> {
    await this.pictureRepository.replaceById(id, picture);
  }

  @del('/pictures/{id}', {
    responses: {
      '204': {
        description: 'Picture DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pictureRepository.deleteById(id);
  }
}
