export const groupArrayByKey = (objectArray: any, property: string) =>
  objectArray.reduce((acc: any, obj: any) => {
    const key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
