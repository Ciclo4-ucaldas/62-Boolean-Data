import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Copropiedad} from '../models';
import {CopropiedadRepository} from '../repositories';

export class CoopropiedadController {
  constructor(
    @repository(CopropiedadRepository)
    public copropiedadRepository: CopropiedadRepository,
  ) { }

  @post('/copropiedads')
  @response(200, {
    description: 'Copropiedad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Copropiedad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Copropiedad, {
            title: 'NewCopropiedad',
            exclude: ['id_copropiedad'],
          }),
        },
      },
    })
    copropiedad: Omit<Copropiedad, 'id'>,
  ): Promise<Copropiedad> {
    return this.copropiedadRepository.create(copropiedad);
  }

  @get('/copropiedads/count')
  @response(200, {
    description: 'Copropiedad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Copropiedad) where?: Where<Copropiedad>,
  ): Promise<Count> {
    return this.copropiedadRepository.count(where);
  }

  @get('/copropiedads')
  @response(200, {
    description: 'Array of Copropiedad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Copropiedad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Copropiedad) filter?: Filter<Copropiedad>,
  ): Promise<Copropiedad[]> {
    return this.copropiedadRepository.find(filter);
  }

  @patch('/copropiedads')
  @response(200, {
    description: 'Copropiedad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Copropiedad, {partial: true}),
        },
      },
    })
    copropiedad: Copropiedad,
    @param.where(Copropiedad) where?: Where<Copropiedad>,
  ): Promise<Count> {
    return this.copropiedadRepository.updateAll(copropiedad, where);
  }

  @get('/copropiedads/{id}')
  @response(200, {
    description: 'Copropiedad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Copropiedad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Copropiedad, {exclude: 'where'}) filter?: FilterExcludingWhere<Copropiedad>
  ): Promise<Copropiedad> {
    return this.copropiedadRepository.findById(id, filter);
  }

  @patch('/copropiedads/{id}')
  @response(204, {
    description: 'Copropiedad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Copropiedad, {partial: true}),
        },
      },
    })
    copropiedad: Copropiedad,
  ): Promise<void> {
    await this.copropiedadRepository.updateById(id, copropiedad);
  }

  @put('/copropiedads/{id}')
  @response(204, {
    description: 'Copropiedad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() copropiedad: Copropiedad,
  ): Promise<void> {
    await this.copropiedadRepository.replaceById(id, copropiedad);
  }

  @del('/copropiedads/{id}')
  @response(204, {
    description: 'Copropiedad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.copropiedadRepository.deleteById(id);
  }
}
