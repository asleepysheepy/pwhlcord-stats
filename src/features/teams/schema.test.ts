import { describe, expect, it } from 'vitest'
import { teamSchema } from './schema'

describe('Team Schema', () => {
  describe('location', () => {
    it('should fail validation if location is empty', () => {
      const team = { name: 'Columbus Busses', shortName: 'BUS' }
      const result = teamSchema.safeParse(team)

      expect(result.success).toEqual(false)
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['location'],
          message: 'Location is required',
        }),
      )
      expect(result.data).toBeNullable()
    })

    it('should fail validation if location is not a string', () => {
      const team = { name: 'Columbus Busses', location: 12345, shortName: 'BUS' }
      const result = teamSchema.safeParse(team)

      expect(result.success).toEqual(false)
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['location'],
          message: 'Location must be a string',
        }),
      )
      expect(result.data).toBeNullable()
    })

    it('should pass validation if location is a string', () => {
      const team = { name: 'Columbus Busses', location: 'Columbus', shortName: 'BUS' }
      const result = teamSchema.safeParse(team)

      expect(result.success).toEqual(true)
      expect(result.error?.issues).toBeNullable()
      expect(result.data).toEqual(team)
    })
  })

  describe('name', () => {
    it('should fail validation if name is empty', () => {
      const team = { location: 'Columbus', shortName: 'BUS' }
      const result = teamSchema.safeParse(team)

      expect(result.success).toEqual(false)
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['name'],
          message: 'Team Name is required',
        }),
      )
      expect(result.data).toBeNullable()
    })

    it('should fail validation if name is not a string', () => {
      const team = { location: 'Columbus', name: 1234, shortName: 'BUS' }
      const result = teamSchema.safeParse(team)

      expect(result.success).toEqual(false)
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['name'],
          message: 'Team Name must be a string',
        }),
      )
      expect(result.data).toBeNullable()
    })

    it('should pass validation if name is a string', () => {
      const team = { name: 'Columbus Busses', location: 'Columbus', shortName: 'BUS' }
      const result = teamSchema.safeParse(team)

      expect(result.success).toEqual(true)
      expect(result.error?.issues).toBeNullable()
      expect(result.data).toEqual(team)
    })
  })

  describe('shortName', () => {
    it('should fail validation if shortName is empty', () => {
      const team = { location: 'Columbus', name: 'Columbus Busses' }
      const result = teamSchema.safeParse(team)

      expect(result.success).toEqual(false)
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['shortName'],
          message: 'Short Name is required',
        }),
      )
      expect(result.data).toBeNullable()
    })

    it('should fail validation if shortName is not a string', () => {
      const team = { location: 'Columbus', name: 'Columbus Busses', shortName: 1234 }
      const result = teamSchema.safeParse(team)

      expect(result.success).toEqual(false)
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['shortName'],
          message: 'Short Name must be a string',
        }),
      )
      expect(result.data).toBeNullable()
    })

    it('should fail validation if shortName is less than 3 characters', () => {
      const team = { location: 'Columbus', name: 'Columbus Busses', shortName: 'BU' }
      const result = teamSchema.safeParse(team)

      expect(result.success).toEqual(false)
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['shortName'],
          message: 'Short Name must be three letters',
        }),
      )
      expect(result.data).toBeNullable()
    })

    it('should fail validation if shortName is more than 3 characters', () => {
      const team = { location: 'Columbus', name: 'Columbus Busses', shortName: 'CBUS' }
      const result = teamSchema.safeParse(team)

      expect(result.success).toEqual(false)
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['shortName'],
          message: 'Short Name must be three letters',
        }),
      )
      expect(result.data).toBeNullable()
    })

    it('convert the shortName to uppercase if not already', () => {
      const team = { location: 'Columbus', name: 'Columbus Busses', shortName: 'bus' }
      const result = teamSchema.safeParse(team)

      expect(result.success).toEqual(true)
      expect(result.error?.issues).toBeNullable()
      expect(result.data).toEqual({
        ...team,
        shortName: 'BUS',
      })
    })

    it('should pass validation if shortName is a string', () => {
      const team = { location: 'Columbus', name: 'Columbus Busses', shortName: 'BUS' }
      const result = teamSchema.safeParse(team)

      expect(result.success).toEqual(true)
      expect(result.error?.issues).toBeNullable()
      expect(result.data).toEqual(team)
    })
  })
})
