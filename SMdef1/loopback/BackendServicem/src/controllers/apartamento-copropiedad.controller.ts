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
  Copropiedad,
} from '../models';
import {ApartamentoRepository} from '../repositories';

export class ApartamentoCopropiedadController {
  constructor(
    @repository(ApartamentoRepository) protected apartamentoRepository: ApartamentoRepository,
  ) { }

  @get('/apartamentos/{id}/copropiedad', {
    responses: {
      '200': {
        description: 'Apartamento has one Copropiedad',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Copropiedad),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Copropiedad>,
  ): Promise<Copropiedad> {
    return this.apartamentoRepository.copropiedad(id).get(filter);
  }

  @post('/apartamentos/{id}/copropiedad', {
    responses: {
      '200': {
        description: 'Apartamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Copropiedad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Apartamento.prototype.id_apartamento,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Copropiedad, {
            title: 'NewCopropiedadInApartamento',
            exclude: ['id_copropiedad'],
            optional: ['apartamentoId']
          }),
        },
      },
    }) copropiedad: Omit<Copropiedad, 'id_copropiedad'>,
  ): Promise<Copropiedad> {
    return this.apartamentoRepository.copropiedad(id).create(copropiedad);
  }

  @patch('/apartamentos/{id}/copropiedad', {
    responses: {
      '200': {
        description: 'Apartamento.Copropiedad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Copropiedad, {partial: true}),
        },
      },
    })
    copropiedad: Partial<Copropiedad>,
    @param.query.object('where', getWhereSchemaFor(Copropiedad)) where?: Where<Copropiedad>,
  ): Promise<Count> {
    return this.apartamentoRepository.copropiedad(id).patch(copropiedad, where);
  }

  @del('/apartamentos/{id}/copropiedad', {
    responses: {
      '200': {
        description: 'Apartamento.Copropiedad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Copropiedad)) where?: Where<Copropiedad>,
  ): Promise<Count> {
    return this.apartamentoRepository.copropiedad(id).delete(where);
  }
}
