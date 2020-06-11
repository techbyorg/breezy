/* eslint-disable
    no-unused-expressions,
    no-unused-vars,
*/
// TODO: This file was created by bulk-decaffeinate.
// Fix any style issues and re-enable lint.
import config from '../config'

export default class IrsPerson {
  constructor ({ auth }) { this.getAllByEin = this.getAllByEin.bind(this); this.search = this.search.bind(this); this.auth = auth; null }

  getAllByEin (ein) {
    return this.auth.stream({
      query: `\
query IrsPersonGetAllByEin($ein: String!) {
  irsPersons(ein: $ein) {
    nodes { name, years { title, compensation, year } }
  }
}\
`,
      variables: { ein },
      pull: 'irsPersons'
    })
  }

  search ({ query, limit }) {
    return this.auth.stream({
      query: `\
query IrsPersonSearch($query: ESQuery!) {
  irsPersons(query: $query) {
    nodes {
      name
    }
  }
}\
`,
      variables: { query },
      pull: 'irsPersons'
    })
  }
}