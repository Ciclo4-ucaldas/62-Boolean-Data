import {Entity, model, property, hasMany} from '@loopback/repository';
import {Apartamento} from './apartamento.model';

@model()
export class Propietario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_propietario?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres_apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  idm_propietario: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono_1: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono_2: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_hijo1: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_hijo2: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_hijo3: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_hijo4: string;

  @property({
    type: 'number',
    required: true,
  })
  no_hijos: number;

  @property({
    type: 'number',
    required: true,
  })
  no_mascotas: number;

  @property({
    type: 'number',
    required: true,
  })
  tipo_mascota: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_nacimiento_propietario: string;

  @property({
    type: 'number',
    required: true,
  })
  edad_propietario: number;

  @property({
    type: 'string',
    required: true,
  })
  ocupacion_propietario: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_residente: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_mascota: string;

  @hasMany(() => Apartamento)
  apartamentos: Apartamento[];

  constructor(data?: Partial<Propietario>) {
    super(data);
  }
}

export interface PropietarioRelations {
  // describe navigational properties here
}

export type PropietarioWithRelations = Propietario & PropietarioRelations;
