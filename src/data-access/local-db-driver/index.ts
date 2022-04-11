import Realm from 'realm'
import { keys } from 'utils/manipulation'
import { Schemas } from './Schemas'
import type { Models } from './Schemas'

const initDbClient = async () => Realm.open({ path: 'mirage-state', schema: Schemas })

const initDbService = async () => {
  const client = await initDbClient()
  const createOne = (model: keyof Models, props: Models[typeof model]) => {
    let record
    client.write(() => {
      record = client.create<Models[typeof model]>(model, props)
    })
    return record
  }
  const findMany = (model: keyof Models, props: Partial<Models[typeof model]>) => {
    let query = ''
    const propertyKeys = keys(props)
    propertyKeys.forEach((key, idx) => {
      if (idx === 0) return (query = `${key} == ${props[key]}`)
      query += ` AND ${key} == ${props[key]}`
    })
    const allRecords = client.objects(model)
    return query.length ? allRecords.filtered(query) : allRecords
  }
  const findOneById = (model: keyof Models, id: string) =>
    client.objectForPrimaryKey<Models[typeof model]>(model, id)

  const updateOneById = (model: keyof Models, id: string, props: Partial<Models[typeof model]>) => {
    const record = findOneById(model, id)
    if (!record) throw new Error('Tried to update non existant record')
    client.write(() => {
      // @ts-ignore
      keys(props).forEach((p) => (record[p] = props[p]))
    })
    return record
  }
  return {
    createOne,
    findMany,
    findOneById,
    updateOneById,
  }
}
export const dbService = initDbService()
