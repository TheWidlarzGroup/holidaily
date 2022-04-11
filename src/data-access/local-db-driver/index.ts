import Realm from 'realm'
import { keys } from 'utils/manipulation'
import { Schemas } from './Schemas'
import type { Models } from './Schemas'

const initDbService = async () => {
  const client = await Realm.open({
    path: 'mirage-state',
    schema: Schemas,
  })
  return {
    _client: client,
    createOne(model: keyof Models, props: Models[typeof model]) {
      let record
      this._client.write(() => {
        record = this._client.create<Models[typeof model]>(model, props)
      })
      return record
    },
    findMany(model: keyof Models, props: Partial<Models[typeof model]>) {
      let query = ''
      const propertyKeys = keys(props)
      propertyKeys.forEach((key, idx) => {
        if (idx === 0) return (query = `${key} == ${props[key]}`)
        query += ` AND ${key} == ${props[key]}`
      })
      const allRecords = this._client.objects(model)
      return query.length ? allRecords.filtered(query) : allRecords
    },
    findOneById(model: keyof Models, id: string) {
      return this._client.objectForPrimaryKey<Models[typeof model]>(model, id)
    },
    updateOneById(model: keyof Models, id: string, props: Partial<Models[typeof model]>) {
      const record = this.findOneById(model, id)
      if (!record) throw new Error('Tried to update non existant record')
      this._client.write(() => {
        // @ts-ignore
        keys(props).forEach((p) => (record[p] = props[p]))
      })
      return record
    },
  }
}
const dbService = initDbService()
export const getDbService = () => dbService
