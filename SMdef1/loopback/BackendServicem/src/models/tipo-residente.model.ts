import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoResidente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_residente?: string;

  @property({
    type: 'string',
    required: true,
  })
  desc_tipo_residente: string;


  constructor(data?: Partial<TipoResidente>) {
    super(data);
  }
}

export interface TipoResidenteRelations {
  // describe navigational properties here
}

export type TipoResidenteWithRelations = TipoResidente & TipoResidenteRelations;
