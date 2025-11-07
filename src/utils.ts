import type { ConfigTable } from './types'
import { camelCase } from 'scule'

export function convertCase(input: string) {
  if (input.match(/^[a-z0-9$]*$/i) && !input.match(/^\d/)) // Valid JS identifier, keep as-is
    return input
  return camelCase(input)
}

export function formatTable(table: string[][]) {
  if (!table.length)
    return '**No data**'

  const [header, ...body] = table
  const colChars = Array.from<number>({ length: header.length }).fill(0)

  table.forEach((row) => {
    row.forEach((col, idx) => {
      colChars[idx] = Math.max(colChars[idx], col?.length || 0)
    })
  })

  table.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      table[rowIdx][colIdx] = col?.padEnd(colChars[colIdx], ' ') || ''
    })
  })

  return [
    `| ${header.join(' | ')} |`,
    `| ${colChars.map(w => '-'.repeat(w)).join(' | ')} |`,
    ...body.map(row => `| ${row.join(' | ')} |`),
  ].join('\n')
}

export function commentBlock(text?: string, padding = 0): string[] {
  const indent = ' '.repeat(padding)
  if (!text) {
    return []
  }

  // Avoid premature closure of the comment block due to the presence of "*/" in the text
  const _text = text.replace(/\*\//g, '*\\/')

  return [
    `${indent}/**`,
    ..._text.split(/\n/g).map(l => `${indent} * ${l}`.trimEnd()),
    `${indent} */`,
  ]
}

export function markdownEscape(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('|', '&vert;')
}

export function formatList(data: string[][]) {
  if (!data.length || data.length === 1)
    return '**No data**'

  const [header, ...rows] = data

  // The command list should be treated specially
  // as we want the title to be the heading, not the command id
  const isCommandTable = header.length === 2
    && header[0].trim().toLowerCase() === 'command'
    && header[1].trim().toLowerCase() === 'title'

  const headingIndex = isCommandTable ? 1 : 0
  const fieldOrder = isCommandTable ? [1, 0] : header.map((_, i) => i)

  return rows.map((row) => {
    const heading = row[headingIndex].trim() || '(Unnamed)'

    const lines = [`#### ${heading}`]

    for (const idx of fieldOrder) {
      if (idx === headingIndex)
        continue

      const val = (row[idx] || '').trim()
      if (!val || val === '-')
        continue

      lines.push(`${header[idx]}: ${val}  `)
    }

    return lines.join('\n')
  }).join('\n\n')
}

export function formatConfigTable(data: ConfigTable[]) {
  if (!data.length)
    return '**No data**'
  if (data.length === 1)
    return formatTable(data[0].tableData)

  const merged: string[][] = data.flatMap((item, index) => {
    const [header, ...rows] = item.tableData
    const lines: string[][] = []
    if (index === 0)
      lines.push(header)
    lines.push([`▿ <b>${item.title}</b>`])
    lines.push(...rows)
    return lines
  })
  return formatTable(merged)
}

export function formatConfigList(data: ConfigTable[]) {
  if (!data.length)
    return '**No data**'
  if (data.length === 1)
    return formatList(data[0].tableData)

  return data.map(item => `### ${item.title}\n\n${formatList(item.tableData)}`).join('\n\n')
}
