exports.toCursorHash = (string) => Buffer.from(string).toString('base64');

exports.fromCursorHash = (string) =>
  Buffer.from(string, 'base64').toString('ascii');

exports.paginate = async (
  { first, last, before, after }, 
  context,
  model,
  select,
  where = {}
) => {
  const { utils, prisma } = context

  const query = { 
    where: {},
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    first,
    last
  }
  
  if (select) {
    query['select'] = select
  }

  if (after) {
    query.where['createdAt'] = { lt: new Date(utils.fromCursorHash(after)) }
  } else if (before) {
    query.where['createdAt'] = { gt: new Date(utils.fromCursorHash(before)) }
  }

  const result = await prisma[model].findMany(query)

  if (!result.length) {
    /**
     * this will occur in two (2) scenarios
     *  a) client error, pageInfo was not respected when making request
     *  b) there are no posts matching query
     */
    return {
      count: 0,
      edges: [],
      pageInfo: {
        hasPrevPage: false,
        hasNextPage: false,
        startCursor: '',
        endCursor: '',
      }
    }
  }

  const hasPrevPage = Boolean(await prisma[model].count({
    first: 1,
    where: {
      createdAt: { gt: result[0].createdAt }
    }
  }))

  const hasNextPage = Boolean(await prisma[model].count({
    first: 1,
    where: {
      createdAt: { lt: result[result.length - 1].createdAt }
    }
  }))

  const edges = result.map(node => ({
    cursor: utils.toCursorHash(node.createdAt),
    node
  }))

  return {
    count: edges.length,
    edges: edges,
    pageInfo: {
      hasPrevPage,
      hasNextPage,
      startCursor: edges[0].cursor,
      endCursor: edges[edges.length - 1].cursor
    }
  }
}