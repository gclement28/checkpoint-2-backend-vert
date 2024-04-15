import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { CountryResolver } from './resolvers/CountryResolver';
import dataSource from './config/db';
import { startStandaloneServer } from '@apollo/server/standalone';

const start = async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
