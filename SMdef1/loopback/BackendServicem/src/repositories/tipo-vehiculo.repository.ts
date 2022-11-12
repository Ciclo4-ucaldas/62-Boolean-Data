import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoVehiculo, TipoVehiculoRelations, Parqueadero} from '../models';
import {ParqueaderoRepository} from './parqueadero.repository';

export class TipoVehiculoRepository extends DefaultCrudRepository<
  TipoVehiculo,
  typeof TipoVehiculo.prototype.id_tipo_vehiculo,
  TipoVehiculoRelations
> {

  public readonly suParqueadero: BelongsToAccessor<Parqueadero, typeof TipoVehiculo.prototype.id_tipo_vehiculo>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('ParqueaderoRepository') protected parqueaderoRepositoryGetter: Getter<ParqueaderoRepository>,
  ) {
    super(TipoVehiculo, dataSource);
    this.suParqueadero = this.createBelongsToAccessorFor('suParqueadero', parqueaderoRepositoryGetter,);
    this.registerInclusionResolver('suParqueadero', this.suParqueadero.inclusionResolver);
  }
}
