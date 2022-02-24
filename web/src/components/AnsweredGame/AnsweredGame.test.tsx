import { render } from '@redwoodjs/testing/web'

import AnsweredGame from './AnsweredGame'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AnsweredGame', () => {
  it('renders successfully without a play', () => {
    expect(() => {
      render(<AnsweredGame play={null} />)
    }).not.toThrow()
  })
})
