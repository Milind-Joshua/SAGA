import '@testing-library/jest-dom'

// Mock IntersectionObserver for Framer Motion whileInView and next/image
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
