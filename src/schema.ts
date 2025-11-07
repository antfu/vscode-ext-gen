import type { Manifest, Property } from './types'

export function typeFromSchema(schema: Property, isSubType = false): string {
  if (!schema)
    return 'unknown'

  const schemaTypes = Array.isArray(schema.type) ? schema.type : [schema.type]
  const types: string[] = []

  for (const schemaType of schemaTypes) {
    switch (schemaType) {
      case 'boolean':
        types.push('boolean')
        break
      case 'string':
        if (schema.enum) {
          types.push(...schema.enum.map((v: string) => JSON.stringify(v)))
          break
        }
        types.push('string')
        break
      case 'number':
        types.push('number')
        break
      case 'array':
        if (schema.items) {
          types.push(`${typeFromSchema(schema.items, true)}[]`)
          break
        }
        types.push('unknown[]')
        break
      case 'object':
        if (schema.properties) {
          const propertyKeyValues = Object.entries(schema.properties).map(([key, value]) => {
            const isRequired = schema.required?.includes(key)
            const optionalChar = isRequired ? '' : '?'
            return `'${key}'${optionalChar}: ${typeFromSchema(value, true)}`
          })

          types.push(`{ ${propertyKeyValues.join('; ')} }`)

          break
        }
        types.push('Record<string, unknown>')
        break
      default:
        types.push('unknown')
    }
  }

  if (!isSubType && schema.type !== 'object') {
    if (!('default' in schema) || schema.default === undefined)
      types.push('undefined')
    else if (schema.default === null)
      types.push('null')
  }

  if (types.length === 1)
    return types[0]
  else
    return `(${types.join(' | ')})`
}

export function defaultValFromSchema(schema: Property): string | undefined {
  if (schema.type !== 'object')
    return JSON.stringify(schema.default)

  if ('default' in schema)
    return JSON.stringify(schema.default)

  if ('properties' in schema) {
    const keyValues = Object.entries(schema.properties || {}).map(([key, value]): string => {
      return `${JSON.stringify(key)}: ${defaultValFromSchema(value)}`
    })

    return `{ ${keyValues.join(', ')} }`
  }

  return '{}'
}

export function getConfigObject(packageJson: Manifest): Record<string, Property> {
  return (Array.isArray(packageJson.contributes?.configuration)
    ? packageJson.contributes?.configuration?.[0]?.properties
    : packageJson.contributes?.configuration?.properties
  ) || {}
}
