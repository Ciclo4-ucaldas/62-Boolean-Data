import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Apartamento} from '../models';
import {ApartamentoRepository} from './apartamento.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id_propietario,
  PropietarioRelations
> {

  public readonly apartamentos: HasManyRepositoryFactory<Apartamento, typeof Propietario.prototype.id_propietario>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('ApartamentoRepository') protected apartamentoRepositoryGetter: Getter<ApartamentoRepository>,
  ) {
    super(Propietario, dataSource);
    this.apartamentos = this.createHasManyRepositoryFactoryFor('apartamentos', apartamentoRepositoryGetter,);
    this.registerInclusionResolver('apartamentos', this.apartamentos.inclusionResolver);
  }
}
