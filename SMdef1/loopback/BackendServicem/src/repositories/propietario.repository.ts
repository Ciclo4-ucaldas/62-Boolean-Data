import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Apartamento, TipoResidente} from '../models';
import {ApartamentoRepository} from './apartamento.repository';
import {TipoResidenteRepository} from './tipo-residente.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id_propietario,
  PropietarioRelations
> {

  public readonly apartamentos: HasManyRepositoryFactory<Apartamento, typeof Propietario.prototype.id_propietario>;

  public readonly suTipoResidente: HasOneRepositoryFactory<TipoResidente, typeof Propietario.prototype.id_propietario>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('ApartamentoRepository') protected apartamentoRepositoryGetter: Getter<ApartamentoRepository>, @repository.getter('TipoResidenteRepository') protected tipoResidenteRepositoryGetter: Getter<TipoResidenteRepository>,
  ) {
    super(Propietario, dataSource);
    this.suTipoResidente = this.createHasOneRepositoryFactoryFor('suTipoResidente', tipoResidenteRepositoryGetter);
    this.registerInclusionResolver('suTipoResidente', this.suTipoResidente.inclusionResolver);
    this.apartamentos = this.createHasManyRepositoryFactoryFor('apartamentos', apartamentoRepositoryGetter,);
    this.registerInclusionResolver('apartamentos', this.apartamentos.inclusionResolver);
  }
}
