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
import {TipoResidente} from '../models';
import {TipoResidenteRepository} from '../repositories';

export class TiporesidenteController {
  constructor(
    @repository(TipoResidenteRepository)
    public tipoResidenteRepository: TipoResidenteRepository,
  ) { }

  @post('/tipo-residentes')
  @response(200, {
    description: 'TipoResidente model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoResidente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoResidente, {
            title: 'NewTipoResidente',
            exclude: ['id_residente'],
          }),
        },
      },
    })
    tipoResidente: Omit<TipoResidente, 'id'>,
  ): Promise<TipoResidente> {
    return this.tipoResidenteRepository.create(tipoResidente);
  }

  @get('/tipo-residentes/count')
  @response(200, {
    description: 'TipoResidente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoResidente) where?: Where<TipoResidente>,
  ): Promise<Count> {
    return this.tipoResidenteRepository.count(where);
  }

  @get('/tipo-residentes')
  @response(200, {
    description: 'Array of TipoResidente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoResidente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoResidente) filter?: Filter<TipoResidente>,
  ): Promise<TipoResidente[]> {
    return this.tipoResidenteRepository.find(filter);
  }

  @patch('/tipo-residentes')
  @response(200, {
    description: 'TipoResidente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoResidente, {partial: true}),
        },
      },
    })
    tipoResidente: TipoResidente,
    @param.where(TipoResidente) where?: Where<TipoResidente>,
  ): Promise<Count> {
    return this.tipoResidenteRepository.updateAll(tipoResidente, where);
  }

  @get('/tipo-residentes/{id}')
  @response(200, {
    description: 'TipoResidente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoResidente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoResidente, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoResidente>
  ): Promise<TipoResidente> {
    return this.tipoResidenteRepository.findById(id, filter);
  }

  @patch('/tipo-residentes/{id}')
  @response(204, {
    description: 'TipoResidente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoResidente, {partial: true}),
        },
      },
    })
    tipoResidente: TipoResidente,
  ): Promise<void> {
    await this.tipoResidenteRepository.updateById(id, tipoResidente);
  }

  @put('/tipo-residentes/{id}')
  @response(204, {
    description: 'TipoResidente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoResidente: TipoResidente,
  ): Promise<void> {
    await this.tipoResidenteRepository.replaceById(id, tipoResidente);
  }

  @del('/tipo-residentes/{id}')
  @response(204, {
    description: 'TipoResidente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoResidenteRepository.deleteById(id);
  }
}
