import 'dotenv/config'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

vi.mock('server-only')

// Testing library will run this automatically if afterEach is available as a global.
// Since we aren't using vitest globals, we need to call it manually
afterEach(() => {
  cleanup()
})
