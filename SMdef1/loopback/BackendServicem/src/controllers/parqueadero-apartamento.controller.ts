import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Parqueadero,
  Apartamento,
} from '../models';
import {ParqueaderoRepository} from '../repositories';

export class ParqueaderoApartamentoController {
  constructor(
    @repository(ParqueaderoRepository)
    public parqueaderoRepository: ParqueaderoRepository,
  ) { }

  @get('/parqueaderos/{id}/apartamento', {
    responses: {
      '200': {
        description: 'Apartamento belonging to Parqueadero',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Apartamento)},
          },
        },
      },
    },
  })
  async getApartamento(
    @param.path.string('id') id: typeof Parqueadero.prototype.id_parqueadero,
  ): Promise<Apartamento> {
    return this.parqueaderoRepository.apartamento(id);
  }
}
