import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Country } from '../entities/Country';

@Resolver()
export class CountryResolver {
  @Mutation(() => Country)
  async addCountry(
    @Arg('code') code: string,
    @Arg('name') name: string,
    @Arg('emoji') emoji: string,
    @Arg('continent') continent: string
  ) {
    const country = Country.create({
      code,
      name,
      emoji,
      continent,
    });
    await country.save();
    return country;
  }

  @Query(() => [Country])
  async countries() {
    return Country.find();
  }

  @Query(() => [Country])
  async countriesByContinent(@Arg('continent') continent: string) {
    return Country.find({ where: { continent } });
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg('code') code: string) {
    return Country.findOne({ where: { code } });
  }
}
