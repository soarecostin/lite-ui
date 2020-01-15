import createRepository from '~/api/repository.js'

export default (ctx, inject) => {
  const repositoryWithAxios = createRepository(ctx.$axios)

  const repositories = {
    subscribers: repositoryWithAxios('subscribers'),
    fields: repositoryWithAxios('fields'),
    fieldTypes: repositoryWithAxios('field-types'),
    tokens: repositoryWithAxios('tokens')
  }

  inject('repositories', repositories)
}
