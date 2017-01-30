const swagger = require('./../swagger-with-refs.json')
const { compose, prop, values, map, uniq, reject, isNil } = require('ramda')
var sort = require('alphanum-sort')
var S = require('string')

const gelatoGroups = compose(
  reject(isNil),
  sort,
  uniq,
  map(prop('x-gelato-group')),
  values,
  prop('paths')
)

const resources = (req, reply) => {
  const groups = compose(
    map(group => ({ label: group, path: `/${S(group).slugify().s}` })),
    gelatoGroups
  );

  return reply({ groups: groups(swagger) })
}

module.exports.gelatoGroups = gelatoGroups

module.exports.resources = resources
