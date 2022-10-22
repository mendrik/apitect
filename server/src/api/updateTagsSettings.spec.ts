import { Tag } from '~shared/types/domain/tag'

import { renameMap } from './updateTagsSettings'

describe('updateTagsSettings', () => {
  it('renameMap works', async () => {
    const a: Tag[] = [{ name: 'german' }, { name: 'latin' }]
    const b: Tag[] = [{ name: 'english' }, { name: 'latin' }]

    expect(renameMap(a, b)).toStrictEqual({ german: 'english' })
  })
})
