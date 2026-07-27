import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'

expect.extend(matchers)

afterEach(() => {
  cleanup()
  // Theme and brand live on <html>, which testing-library does not reset.
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.removeAttribute('data-brand')
})
