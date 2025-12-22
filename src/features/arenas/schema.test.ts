import { describe, expect, it } from 'vitest'
import { arenaSchema } from './schema'

describe('Arena Schema', () => {
  describe('name', () => {
    it('should fail validation if arena name is empty', () => {
      const result = arenaSchema.safeParse({ maxCapacity: 18000, location: 'City, ST' })

      expect(result.success).toEqual(false)
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['name'],
          message: 'Arena Name is required',
        }),
      )
      expect(result.data).toBeNullable()
    })

    it('should fail validation if arena name is not a string', () => {
      const result = arenaSchema.safeParse({ name: 143221, maxCapacity: 18000, location: 'City, ST' })

      expect(result.success).toEqual(false)
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['name'],
          message: 'Arena Name must be a string',
        }),
      )
      expect(result.data).toBeNullable()
    })

    it('should pass validation if arena name is present and a string', () => {
      const result = arenaSchema.safeParse({ name: 'Arena Name', maxCapacity: 18000, location: 'City, ST' })

      expect(result.success).toEqual(true)
      expect(result.error?.issues).toBeNullable()
      expect(result.data).toEqual({ name: 'Arena Name', maxCapacity: 18000, location: 'City, ST' })
    })
  })

  describe('maxCapacity', () => {
    it('should fail validation if maxCapacity is empty', () => {
      const result = arenaSchema.safeParse({ name: 'Arena Name', location: 'City, ST' })

      expect(result.success).toEqual(false)
      expect(result.data).toBeNullable()
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['maxCapacity'],
          message: 'Max Capacity is required',
        }),
      )
    })

    it('should fail validation if maxCapacity is not a number', () => {
      const result = arenaSchema.safeParse({ name: 'Arena Name', maxCapacity: '15', location: 'City, ST' })

      expect(result.success).toEqual(false)
      expect(result.data).toBeNullable()
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['maxCapacity'],
          message: 'Max Capacity must be a whole number',
        }),
      )
    })

    it('should fail validation if maxCapacity is not an integer', () => {
      const result = arenaSchema.safeParse({ name: 'Arena Name', maxCapacity: 1.5, location: 'City, ST' })

      expect(result.success).toEqual(false)
      expect(result.data).toBeNullable()
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['maxCapacity'],
          message: 'Max Capacity must be a whole number',
        }),
      )
    })

    it('should fail validation if maxCapacity is less than 2000', () => {
      const result = arenaSchema.safeParse({ name: 'Arena Name', maxCapacity: 1999, location: 'City, ST' })

      expect(result.success).toEqual(false)
      expect(result.data).toBeNullable()
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['maxCapacity'],
          message: 'Max Capacity must be between 2000 and 25000',
        }),
      )
    })

    it('should fail validation if maxCapacity is greater than 25000', () => {
      const result = arenaSchema.safeParse({ name: 'Arena Name', maxCapacity: 25001, location: 'City, ST' })

      expect(result.success).toEqual(false)
      expect(result.data).toBeNullable()
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['maxCapacity'],
          message: 'Max Capacity must be between 2000 and 25000',
        }),
      )
    })

    it('should pass validation if maxCapacity is an integer between 2000 and 25000', () => {
      const result = arenaSchema.safeParse({ name: 'Arena Name', maxCapacity: 18000, location: 'City, ST' })

      expect(result.success).toEqual(true)
      expect(result.error?.issues).toBeNullable()
      expect(result.data).toEqual({ name: 'Arena Name', maxCapacity: 18000, location: 'City, ST' })
    })
  })

  describe('location', () => {
    it('should fail validation if location is empty', () => {
      const result = arenaSchema.safeParse({ name: 'Arena Name', maxCapacity: 18000 })

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
      const result = arenaSchema.safeParse({ name: 'Arena Name', maxCapacity: 18000, location: 155 })

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

    it('should fail validation if location is a string with the wrong format', () => {
      const result = arenaSchema.safeParse({ name: 'Arena Name', maxCapacity: 18000, location: 'somewhere' })

      expect(result.success).toEqual(false)
      expect(result.error?.issues).toHaveLength(1)
      expect(result.error?.issues).toContainEqual(
        expect.objectContaining({
          path: ['location'],
          message: 'Location must use the format City Name, AA',
        }),
      )
      expect(result.data).toBeNullable()
    })

    it('should pass validation if location is present and a properly formatted string', () => {
      const result = arenaSchema.safeParse({ name: 'Arena Name', maxCapacity: 18000, location: 'City, ST' })

      expect(result.success).toEqual(true)
      expect(result.error?.issues).toBeNullable()
      expect(result.data).toEqual({ name: 'Arena Name', maxCapacity: 18000, location: 'City, ST' })
    })
  })
})
