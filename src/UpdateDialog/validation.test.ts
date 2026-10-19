import { describe, expect, it } from 'vitest'
import { DEFAULT_AUTHOR, getAuthorName } from './author.ts'
import { validateFields } from './validation.ts'

const validFields = {
  title: 'Release notes',
  content: 'Version 2 is out.',
  author: '',
  isAuthorEditable: false,
}

describe('validateFields', () => {
  it('has no errors for a complete update with the default author', () => {
    expect(validateFields(validFields)).toEqual({})
  })

  it('requires a title and update text, in form order', () => {
    const errors = validateFields({ ...validFields, title: '', content: ' ' })

    expect(errors).toEqual({
      title: 'Enter a title',
      content: 'Write your update',
    })
    expect(Object.keys(errors)).toEqual(['title', 'content'])
  })

  it('requires a custom author name while Change author is on', () => {
    expect(validateFields({ ...validFields, isAuthorEditable: true })).toEqual({
      author: 'Enter an author name',
    })
    expect(
      validateFields({ ...validFields, isAuthorEditable: true, author: 'Sam' }),
    ).toEqual({})
  })
})

describe('getAuthorName', () => {
  it('uses the default author while Change author is off', () => {
    expect(getAuthorName({ ...validFields, author: 'Sam' })).toBe(DEFAULT_AUTHOR)
  })

  it('uses the custom name while Change author is on', () => {
    expect(
      getAuthorName({ ...validFields, author: 'Sam', isAuthorEditable: true }),
    ).toBe('Sam')
  })
})
