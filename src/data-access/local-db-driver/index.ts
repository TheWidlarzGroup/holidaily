import Realm from 'realm'
import { keys } from 'utils/manipulation'
import { Schemas } from './Schemas'
import type { Models } from './Schemas'

const initDbService = () => {
  let client: Realm
  const initialize = async () => {
    client = await Realm.open({ path: 'mirage-state', schema: Schemas })
  }

  const checkIfInitialized = () => {
    if (!client) throw new Error('Db client is uninitialized')
  }

  const createOne = (model: keyof Models, props: Models[typeof model]) => {
    checkIfInitialized()
    let record
    client.write(() => {
      record = client.create<Models[typeof model]>(model, props)
    })
    return record
  }
  const findMany = (model: keyof Models, props: Partial<Models[typeof model]>) => {
    checkIfInitialized()
    let query = ''
    const propertyKeys = keys(props)
    propertyKeys.forEach((key, idx) => {
      if (idx === 0) return (query = `${key} == ${props[key]}`)
      query += ` AND ${key} == ${props[key]}`
    })
    const allRecords = client.objects(model)
    return query.length ? allRecords.filtered(query) : allRecords
  }
  const findOneById = (model: keyof Models, id: string) => {
    checkIfInitialized()
    return client.objectForPrimaryKey<Models[typeof model]>(model, id)
  }

  const updateOneById = (model: keyof Models, id: string, props: Partial<Models[typeof model]>) => {
    checkIfInitialized()
    const record: any = findOneById(model, id)
    if (!record) throw new Error('Tried to update non existant record')
    client.write(() => {
      keys(props).forEach((p) => (record[p] = props[p]))
    })
    return record
  }
  return {
    initialize,
    createOne,
    findMany,
    findOneById,
    updateOneById,
  }
}
export const dbService = initDbService()
export type DbService = ReturnType<typeof initDbService>
