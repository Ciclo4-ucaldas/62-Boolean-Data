import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Parqueadero, ParqueaderoRelations, Apartamento} from '../models';
import {ApartamentoRepository} from './apartamento.repository';

export class ParqueaderoRepository extends DefaultCrudRepository<
  Parqueadero,
  typeof Parqueadero.prototype.id_parqueadero,
  ParqueaderoRelations
> {

  public readonly apartamento: BelongsToAccessor<Apartamento, typeof Parqueadero.prototype.id_parqueadero>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('ApartamentoRepository') protected apartamentoRepositoryGetter: Getter<ApartamentoRepository>,
  ) {
    super(Parqueadero, dataSource);
    this.apartamento = this.createBelongsToAccessorFor('apartamento', apartamentoRepositoryGetter,);
    this.registerInclusionResolver('apartamento', this.apartamento.inclusionResolver);
  }
}
