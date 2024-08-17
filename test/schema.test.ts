import { describe, expect, it } from 'vitest'
import { defaultValFromSchema } from '../src'

describe('schema -> default value', () => {
  it('object empty', () => {
    expect(defaultValFromSchema({ type: 'object' })).toEqual('{}')
  })

  it('object only have default', () => {
    expect(defaultValFromSchema({
      type: 'object',
      default: {
        foo: 'bar',
        bar: true,
        qux: {
          spam: 'eggs',
        },
        arr: [1, 2, 3],
      },
    }))
      .toEqual('{"foo":"bar","bar":true,"qux":{"spam":"eggs"},"arr":[1,2,3]}')
  })

  it('object only have properties', () => {
    expect(defaultValFromSchema({
      type: 'object',
      properties: {
        foo: {
          type: 'boolean',
          default: false,
        },
      },
    }))
      .toEqual('{ "foo": false }')
  })

  it('deep object', () => {
    expect(defaultValFromSchema({
      type: 'object',
      properties: {
        foo: {
          type: 'object',
          properties: {
            baz: {
              type: 'string',
              default: 'the baz',
            },
            qux: {
              type: 'number',
              default: 0,
            },
            arr: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        bar: {
          type: 'boolean',
          default: false,
        },
      },
    }))
      .toEqual('{ "foo": { "baz": "the baz", "qux": 0, "arr": undefined }, "bar": false }')
  })
})
