import { pascalCase } from "change-case";
import type { GraphQLSchema } from "graphql";
import { isInterfaceType } from "graphql";
import { isObjectType } from "graphql";

module.exports = {
  plugin(schema: GraphQLSchema) {
    const lines: string[] = [];

    const typeMap = schema.getTypeMap();

    Object.values(typeMap).forEach((type) => {
      if (isObjectType(type) && !type.name.startsWith("__")) {
        lines.push(
          `export function define${type.name}Resolvers(resolvers: Resolvers["${type.name}"]) {`,
        );
        lines.push(`  return resolvers;`);
        lines.push(`}`);
      }
      if (isInterfaceType(type)) {
        lines.push(
          `export function define${type.name}Resolvers(resolvers: Resolvers["${type.name}"]) {`,
        );
        lines.push(`  return resolvers;`);
        lines.push(`}`);
      }
    });

    if (isObjectType(typeMap.Query)) {
      Object.keys(typeMap.Query.getFields()).forEach((queryField) => {
        lines.push(
          `export function define${pascalCase(
            queryField,
          )}QueryResolver(resolver: QueryResolvers["${queryField}"]) {`,
        );
        lines.push(`  return resolver;`);
        lines.push("}");
      });
    }
    if (isObjectType(typeMap.Mutation)) {
      Object.keys(typeMap.Mutation.getFields()).forEach((mutationField) => {
        lines.push(
          `export function define${pascalCase(
            mutationField,
          )}MutationResolver(resolver: MutationResolvers["${mutationField}"]) {`,
        );
        lines.push(`  return resolver;`);
        lines.push("}");
      });
    }
    if (isObjectType(typeMap.Subscription)) {
      Object.keys(typeMap.Subscription.getFields()).forEach((subscriptionField) => {
        lines.push(
          `export function define${pascalCase(
            subscriptionField,
          )}SubscriptionResolver(resolver: SubscriptionResolvers["${subscriptionField}"]) {`,
        );
        lines.push(`  return resolver;`);
        lines.push("}");
      });
    }

    lines.push(`export function defineResolvers(resolvers: Resolvers) {`);
    lines.push(`  return resolvers;`);
    lines.push(`}`);

    return lines.join("\n");
  },
};
