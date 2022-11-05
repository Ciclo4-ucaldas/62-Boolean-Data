import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Apartamento, ApartamentoRelations, Propietario, Parqueadero, Torre, Copropiedad} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {ParqueaderoRepository} from './parqueadero.repository';
import {TorreRepository} from './torre.repository';
import {CopropiedadRepository} from './copropiedad.repository';

export class ApartamentoRepository extends DefaultCrudRepository<
  Apartamento,
  typeof Apartamento.prototype.id_apartamento,
  ApartamentoRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof Apartamento.prototype.id_apartamento>;

  public readonly parqueaderos: HasManyRepositoryFactory<Parqueadero, typeof Apartamento.prototype.id_apartamento>;

  public readonly torre: BelongsToAccessor<Torre, typeof Apartamento.prototype.id_apartamento>;

  public readonly copropiedad: HasOneRepositoryFactory<Copropiedad, typeof Apartamento.prototype.id_apartamento>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('ParqueaderoRepository') protected parqueaderoRepositoryGetter: Getter<ParqueaderoRepository>, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>, @repository.getter('CopropiedadRepository') protected copropiedadRepositoryGetter: Getter<CopropiedadRepository>,
  ) {
    super(Apartamento, dataSource);
    this.copropiedad = this.createHasOneRepositoryFactoryFor('copropiedad', copropiedadRepositoryGetter);
    this.registerInclusionResolver('copropiedad', this.copropiedad.inclusionResolver);
    this.torre = this.createBelongsToAccessorFor('torre', torreRepositoryGetter,);
    this.registerInclusionResolver('torre', this.torre.inclusionResolver);
    this.parqueaderos = this.createHasManyRepositoryFactoryFor('parqueaderos', parqueaderoRepositoryGetter,);
    this.registerInclusionResolver('parqueaderos', this.parqueaderos.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
