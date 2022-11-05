import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Copropiedad, CopropiedadRelations, Apartamento} from '../models';
import {ApartamentoRepository} from './apartamento.repository';

export class CopropiedadRepository extends DefaultCrudRepository<
  Copropiedad,
  typeof Copropiedad.prototype.id_copropiedad,
  CopropiedadRelations
> {

  public readonly apartamentos: HasManyRepositoryFactory<Apartamento, typeof Copropiedad.prototype.id_copropiedad>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('ApartamentoRepository') protected apartamentoRepositoryGetter: Getter<ApartamentoRepository>,
  ) {
    super(Copropiedad, dataSource);
    this.apartamentos = this.createHasManyRepositoryFactoryFor('apartamentos', apartamentoRepositoryGetter,);
    this.registerInclusionResolver('apartamentos', this.apartamentos.inclusionResolver);
  }
}
