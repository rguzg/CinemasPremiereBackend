import { Subscription } from './Subscription'
import { types } from "./Types";

export type UpdateRecordOperations = 'create' | 'update' | 'upsert' | 'connect';
export type CreateRecordOperations = 'create' | 'connect';

const path = require("path");
const { mergeResolvers, fileLoader } = require("merge-graphql-schemas");

const resolversQuery = fileLoader(path.join(__dirname, "./Query/**/*.ts"));
const Query = mergeResolvers(resolversQuery);

const resolversMutation = fileLoader(path.join(__dirname, "./Mutation/**/*.ts"));
const Mutation = mergeResolvers(resolversMutation);

export default {
  Query,
  Mutation,
  Subscription,
  ...types
};
