import { ApolloClient, InMemoryCache } from '@apollo/client/core'

export const apolloClient = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          Page: {
            // 告诉 Apollo：不同变量分页结果不要合并，直接覆盖
            merge: false
          }
        }
      }
    }
  })
})