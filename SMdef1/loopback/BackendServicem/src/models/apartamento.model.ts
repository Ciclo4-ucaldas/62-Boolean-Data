import {Entity, model, property, belongsTo, hasMany, hasOne} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {Parqueadero} from './parqueadero.model';
import {Torre} from './torre.model';
import {Copropiedad} from './copropiedad.model';

@model()
export class Apartamento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_apartamento?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_apartamento: string;

  @property({
    type: 'number',
    required: true,
  })
  piso_apartamento: number;

  @property({
    type: 'string',
    required: true,
  })
  id_propietario: string;

  @property({
    type: 'string',
    required: true,
  })
  id_parqueadero: string;

  @property({
    type: 'string',
    required: true,
  })
  id_bodega: string;

  @property({
    type: 'number',
    required: true,
  })
  area: number;

  @property({
    type: 'number',
    required: true,
  })
  piso: number;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @hasMany(() => Parqueadero)
  parqueaderos: Parqueadero[];

  @belongsTo(() => Torre)
  torreId: string;

  @hasOne(() => Copropiedad)
  copropiedad: Copropiedad;

  @property({
    type: 'string',
  })
  copropiedadId?: string;

  constructor(data?: Partial<Apartamento>) {
    super(data);
  }
}

export interface ApartamentoRelations {
  // describe navigational properties here
}

export type ApartamentoWithRelations = Apartamento & ApartamentoRelations;
