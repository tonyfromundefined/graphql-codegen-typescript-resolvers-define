# graphql-codegen-typescript-resolvers-define

Declare the Resolver beautifully using the `define` function output from GraphQL Codegen without ugly TypeScript type annotation.

## How to use
`codegen.yml`

```yml
generates:
  ./src/__generated__/resolvers.ts:
    plugins:
      - "@graphql-codegen/typescript"
      - "@graphql-codegen/typescript-resolvers"

      # add this plugin
      - "graphql-codegen-typescript-resolvers-define"
```

`MyResolver.ts`

```typescript
/**
 * as-is
 */
import { Resolvers } from "../__generated__/resolvers";

const MyObject: Resolvers['MyObject'] = {
  // ...
}

/**
 * to-be
 */
import { defineResolvers } from "../__generated__/resolvers";

const MyObject = defineMyObjectResolvers({
  // ...
})
```
