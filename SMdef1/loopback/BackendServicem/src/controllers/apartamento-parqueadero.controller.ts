import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Apartamento,
  Parqueadero,
} from '../models';
import {ApartamentoRepository} from '../repositories';

export class ApartamentoParqueaderoController {
  constructor(
    @repository(ApartamentoRepository) protected apartamentoRepository: ApartamentoRepository,
  ) { }

  @get('/apartamentos/{id}/parqueaderos', {
    responses: {
      '200': {
        description: 'Array of Apartamento has many Parqueadero',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parqueadero)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Parqueadero>,
  ): Promise<Parqueadero[]> {
    return this.apartamentoRepository.parqueaderos(id).find(filter);
  }

  @post('/apartamentos/{id}/parqueaderos', {
    responses: {
      '200': {
        description: 'Apartamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parqueadero)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Apartamento.prototype.id_apartamento,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parqueadero, {
            title: 'NewParqueaderoInApartamento',
            exclude: ['id_parqueadero'],
            optional: ['apartamentoId']
          }),
        },
      },
    }) parqueadero: Omit<Parqueadero, 'id_parqueadero'>,
  ): Promise<Parqueadero> {
    return this.apartamentoRepository.parqueaderos(id).create(parqueadero);
  }

  @patch('/apartamentos/{id}/parqueaderos', {
    responses: {
      '200': {
        description: 'Apartamento.Parqueadero PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parqueadero, {partial: true}),
        },
      },
    })
    parqueadero: Partial<Parqueadero>,
    @param.query.object('where', getWhereSchemaFor(Parqueadero)) where?: Where<Parqueadero>,
  ): Promise<Count> {
    return this.apartamentoRepository.parqueaderos(id).patch(parqueadero, where);
  }

  @del('/apartamentos/{id}/parqueaderos', {
    responses: {
      '200': {
        description: 'Apartamento.Parqueadero DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parqueadero)) where?: Where<Parqueadero>,
  ): Promise<Count> {
    return this.apartamentoRepository.parqueaderos(id).delete(where);
  }
}
