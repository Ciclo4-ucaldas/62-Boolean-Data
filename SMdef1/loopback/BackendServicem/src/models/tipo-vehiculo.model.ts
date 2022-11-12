import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Parqueadero} from './parqueadero.model';

@model()
export class TipoVehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_tipo_vehiculo?: string;

  @property({
    type: 'string',
    required: true,
  })
  descs_tipo_vehiculo: string;

  @belongsTo(() => Parqueadero, {name: 'suParqueadero'})
  parqueaderoId: string;

  constructor(data?: Partial<TipoVehiculo>) {
    super(data);
  }
}

export interface TipoVehiculoRelations {
  // describe navigational properties here
}

export type TipoVehiculoWithRelations = TipoVehiculo & TipoVehiculoRelations;
