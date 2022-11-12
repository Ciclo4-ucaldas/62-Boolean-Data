import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TipoVehiculo,
  Parqueadero,
} from '../models';
import {TipoVehiculoRepository} from '../repositories';

export class TipoVehiculoParqueaderoController {
  constructor(
    @repository(TipoVehiculoRepository)
    public tipoVehiculoRepository: TipoVehiculoRepository,
  ) { }

  @get('/tipo-vehiculos/{id}/parqueadero', {
    responses: {
      '200': {
        description: 'Parqueadero belonging to TipoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parqueadero)},
          },
        },
      },
    },
  })
  async getParqueadero(
    @param.path.string('id') id: typeof TipoVehiculo.prototype.id_tipo_vehiculo,
  ): Promise<Parqueadero> {
    return this.tipoVehiculoRepository.suParqueadero(id);
  }
}
