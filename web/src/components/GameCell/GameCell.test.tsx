import { render } from '@redwoodjs/testing/web'
import { Loading, Empty, Failure, Success } from './GameCell'
import { standard } from './GameCell.mock'
import { GameContextProvider } from 'src/contexts/GameContext'
import { PlayerContextProvider } from 'src/contexts/PlayerContext'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('GameCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  // it('renders Success successfully', async () => {
  //   expect(() => {
  //     render(
  //       <GameContextProvider>
  //         <PlayerContextProvider>
  //           <Success {...standard()} />
  //         </PlayerContextProvider>
  //       </GameContextProvider>
  //     )
  //   }).not.toThrow()
  // })
})
