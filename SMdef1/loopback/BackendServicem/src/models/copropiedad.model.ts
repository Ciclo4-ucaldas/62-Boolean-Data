import {Entity, hasMany, model, property} from '@loopback/repository';
import {Apartamento} from './apartamento.model';

@model()
export class Copropiedad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_copropiedad?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_coopropiedad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion_coopropiedad: string;

  @property({
    type: 'string',
    required: true,
  })
  nit_coopropiedad: string;

  @property({
    type: 'string',
    required: true,
  })
  constructora: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  barrio: string;

  @property({
    type: 'string',
    required: true,
  })
  id_torre: string;

  @property({
    type: 'string',
    required: true,
  })
  id_apartamento: string;

  @property({
    type: 'string',
    required: true,
  })
  id_parqueadero: string;

  @property({
    type: 'number',
    required: true,
  })
  no_recepcion: number;

  @property({
    type: 'string',
    required: true,
  })
  id_parqueadero_visitantes: string;

  @property({
    type: 'string',
    required: true,
  })
  id_zonas_comunes: string;

  @property({
    type: 'string',
    required: true,
  })
  id_zona_recreo: string;

  @property({
    type: 'string',
    required: true,
  })
  id_personal_admin: string;

  @property({
    type: 'string',
    required: true,
  })
  matricula: string;

  @property({
    type: 'string',
    required: true,
  })
  id_infraestructura?: string;

  @property({
    type: 'string',
  })
  apartamentoId?: string;

  @hasMany(() => Apartamento)
  apartamentos: Apartamento[];

  constructor(data?: Partial<Copropiedad>) {
    super(data);
  }
}

export interface CopropiedadRelations {
  // describe navigational properties here
}

export type CopropiedadWithRelations = Copropiedad & CopropiedadRelations;
