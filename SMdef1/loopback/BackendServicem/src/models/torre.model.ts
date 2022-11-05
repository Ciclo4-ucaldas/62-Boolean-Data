import {Entity, model, property, hasMany} from '@loopback/repository';
import {Apartamento} from './apartamento.model';

@model()
export class Torre extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_torre?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_torre: string;

  @property({
    type: 'number',
    required: true,
  })
  no_ascensores: number;

  @property({
    type: 'number',
    required: true,
  })
  no_puertas: number;

  @property({
    type: 'number',
    required: true,
  })
  no_camaras: number;

  @property({
    type: 'string',
    required: true,
  })
  id_apartamento: string;

  @hasMany(() => Apartamento)
  apartamentos: Apartamento[];

  constructor(data?: Partial<Torre>) {
    super(data);
  }
}

export interface TorreRelations {
  // describe navigational properties here
}

export type TorreWithRelations = Torre & TorreRelations;
