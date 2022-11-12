import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Parqueadero, ParqueaderoRelations, Apartamento, TipoVehiculo} from '../models';
import {ApartamentoRepository} from './apartamento.repository';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';

export class ParqueaderoRepository extends DefaultCrudRepository<
  Parqueadero,
  typeof Parqueadero.prototype.id_parqueadero,
  ParqueaderoRelations
> {

  public readonly apartamento: BelongsToAccessor<Apartamento, typeof Parqueadero.prototype.id_parqueadero>;

  public readonly susTiposVehiculos: HasManyRepositoryFactory<TipoVehiculo, typeof Parqueadero.prototype.id_parqueadero>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('ApartamentoRepository') protected apartamentoRepositoryGetter: Getter<ApartamentoRepository>, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>,
  ) {
    super(Parqueadero, dataSource);
    this.susTiposVehiculos = this.createHasManyRepositoryFactoryFor('susTiposVehiculos', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('susTiposVehiculos', this.susTiposVehiculos.inclusionResolver);
    this.apartamento = this.createBelongsToAccessorFor('apartamento', apartamentoRepositoryGetter,);
    this.registerInclusionResolver('apartamento', this.apartamento.inclusionResolver);
  }
}
