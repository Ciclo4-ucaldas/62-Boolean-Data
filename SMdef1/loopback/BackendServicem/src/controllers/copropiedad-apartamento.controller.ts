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
  Copropiedad,
  Apartamento,
} from '../models';
import {CopropiedadRepository} from '../repositories';

export class CopropiedadApartamentoController {
  constructor(
    @repository(CopropiedadRepository) protected copropiedadRepository: CopropiedadRepository,
  ) { }

  @get('/copropiedads/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Array of Copropiedad has many Apartamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Apartamento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Apartamento>,
  ): Promise<Apartamento[]> {
    return this.copropiedadRepository.apartamentos(id).find(filter);
  }

  @post('/copropiedads/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Copropiedad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Apartamento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Copropiedad.prototype.id_copropiedad,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {
            title: 'NewApartamentoInCopropiedad',
            exclude: ['id_apartamento'],
            optional: ['copropiedadId']
          }),
        },
      },
    }) apartamento: Omit<Apartamento, 'id_apartamento'>,
  ): Promise<Apartamento> {
    return this.copropiedadRepository.apartamentos(id).create(apartamento);
  }

  @patch('/copropiedads/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Copropiedad.Apartamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Apartamento, {partial: true}),
        },
      },
    })
    apartamento: Partial<Apartamento>,
    @param.query.object('where', getWhereSchemaFor(Apartamento)) where?: Where<Apartamento>,
  ): Promise<Count> {
    return this.copropiedadRepository.apartamentos(id).patch(apartamento, where);
  }

  @del('/copropiedads/{id}/apartamentos', {
    responses: {
      '200': {
        description: 'Copropiedad.Apartamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Apartamento)) where?: Where<Apartamento>,
  ): Promise<Count> {
    return this.copropiedadRepository.apartamentos(id).delete(where);
  }
}
