import { InMemoryCache, makeVar } from '@apollo/client'

// export const musicsVar = makeVar<Record<string, unknown>>({})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
})

export default cache
