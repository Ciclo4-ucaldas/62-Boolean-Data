import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoResidente, TipoResidenteRelations} from '../models';

export class TipoResidenteRepository extends DefaultCrudRepository<
  TipoResidente,
  typeof TipoResidente.prototype.id_residente,
  TipoResidenteRelations
> {
  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource,
  ) {
    super(TipoResidente, dataSource);
  }
}
