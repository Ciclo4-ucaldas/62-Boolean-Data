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
  Propietario,
  TipoResidente,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioTipoResidenteController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/tipo-residente', {
    responses: {
      '200': {
        description: 'Propietario has one TipoResidente',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoResidente),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoResidente>,
  ): Promise<TipoResidente> {
    return this.propietarioRepository.suTipoResidente(id).get(filter);
  }

  @post('/propietarios/{id}/tipo-residente', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoResidente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id_propietario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoResidente, {
            title: 'NewTipoResidenteInPropietario',
            exclude: ['id_residente'],
            optional: ['propietarioId']
          }),
        },
      },
    }) tipoResidente: Omit<TipoResidente, 'id_residente'>,
  ): Promise<TipoResidente> {
    return this.propietarioRepository.suTipoResidente(id).create(tipoResidente);
  }

  @patch('/propietarios/{id}/tipo-residente', {
    responses: {
      '200': {
        description: 'Propietario.TipoResidente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoResidente, {partial: true}),
        },
      },
    })
    tipoResidente: Partial<TipoResidente>,
    @param.query.object('where', getWhereSchemaFor(TipoResidente)) where?: Where<TipoResidente>,
  ): Promise<Count> {
    return this.propietarioRepository.suTipoResidente(id).patch(tipoResidente, where);
  }

  @del('/propietarios/{id}/tipo-residente', {
    responses: {
      '200': {
        description: 'Propietario.TipoResidente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoResidente)) where?: Where<TipoResidente>,
  ): Promise<Count> {
    return this.propietarioRepository.suTipoResidente(id).delete(where);
  }
}
