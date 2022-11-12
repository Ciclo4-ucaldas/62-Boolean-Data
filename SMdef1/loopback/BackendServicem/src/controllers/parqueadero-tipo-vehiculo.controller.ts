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
  Parqueadero,
  TipoVehiculo,
} from '../models';
import {ParqueaderoRepository} from '../repositories';

export class ParqueaderoTipoVehiculoController {
  constructor(
    @repository(ParqueaderoRepository) protected parqueaderoRepository: ParqueaderoRepository,
  ) { }

  @get('/parqueaderos/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Array of Parqueadero has many TipoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoVehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoVehiculo>,
  ): Promise<TipoVehiculo[]> {
    return this.parqueaderoRepository.susTiposVehiculos(id).find(filter);
  }

  @post('/parqueaderos/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Parqueadero model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Parqueadero.prototype.id_parqueadero,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVehiculo, {
            title: 'NewTipoVehiculoInParqueadero',
            exclude: ['id_tipo_vehiculo'],
            optional: ['parqueaderoId']
          }),
        },
      },
    }) tipoVehiculo: Omit<TipoVehiculo, 'id_tipo_vehiculo'>,
  ): Promise<TipoVehiculo> {
    return this.parqueaderoRepository.susTiposVehiculos(id).create(tipoVehiculo);
  }

  @patch('/parqueaderos/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Parqueadero.TipoVehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVehiculo, {partial: true}),
        },
      },
    })
    tipoVehiculo: Partial<TipoVehiculo>,
    @param.query.object('where', getWhereSchemaFor(TipoVehiculo)) where?: Where<TipoVehiculo>,
  ): Promise<Count> {
    return this.parqueaderoRepository.susTiposVehiculos(id).patch(tipoVehiculo, where);
  }

  @del('/parqueaderos/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Parqueadero.TipoVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoVehiculo)) where?: Where<TipoVehiculo>,
  ): Promise<Count> {
    return this.parqueaderoRepository.susTiposVehiculos(id).delete(where);
  }
}
