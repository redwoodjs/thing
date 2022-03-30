import { render } from '@redwoodjs/testing/web'

import MoviePlaceholder from './MoviePlaceholder'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MoviePlaceholder', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MoviePlaceholder />)
    }).not.toThrow()
  })
})
