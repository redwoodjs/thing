import type { FindPreviousPlayQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { getYear } from 'src/utils/date'

export const QUERY = gql`
  query FindPreviousPlayQuery($id: String!) {
    play(id: $id) {
      correctMovie {
        id
        photoPath
        title
        releasedOn
      }
      possibleMovies {
        movie {
          id
          photoPath
          title
          releasedOn
        }
      }
      answeredMovie {
        id
        photoPath
        title
        releasedOn
      }
    }
  }
`

export const Loading = () => <div></div>

export const Empty = () => <div></div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ play }: CellSuccessProps<FindPreviousPlayQuery>) => {
  return (
    <div>
      <h2 className="text-center">
        Which movie was released in{' '}
        <span className="font-bold text-xl px-1">
          {getYear(play.correctMovie.releasedOn)}
        </span>
        ?
      </h2>
      <div className="flex items-center flex-1 justify-between w-full w-auto">
        {play.possibleMovies.map(({ movie }) => {
          return (
            <div key={movie.id} className="w-40">
              <div className="flex flex-col">
                <h3
                  className={
                    'py-4' +
                    (movie.id === play.correctMovie.id
                      ? ' text-green-700'
                      : movie.id === play.answeredMovie.id
                      ? ' text-red-700'
                      : '')
                  }
                >
                  {movie.title}
                </h3>
                <p>{getYear(movie.releasedOn)}</p>
                <img
                  className="drop-shadow-md"
                  alt={movie.title}
                  // Available poster sizes ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
                  src={`https://image.tmdb.org/t/p/w185/${movie.photoPath}`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
