import { describe, it } from 'mocha'
import { expect } from 'chai'
import { gelatoGroups } from './../../../server/handlers/resources'

const swagger = {
  "paths": {
    "/biding_reports": {
      "x-gelato-group": "Bids"
    },
    "/accident_logs": {
      "x-gelato-group": "Accident Logs"
    },
    "/oauth/token": {
      "x-gelato-group": "Authentication"
    }
  }
}

const expectedGroups = [
  'Accident Logs',
  'Authentication',
  'Bids'
]

describe('handlers.resources', () => {
  describe('gelatoGroups', () => {
    it('gathers resource name', () => {
      expect(gelatoGroups(swagger)).to.eql(expectedGroups)
    })
  })
})
