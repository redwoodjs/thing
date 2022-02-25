// import type { Play } from 'types/graphql'

import { getYear } from 'src/utils/date'

// interface Props {
//   play: Play | undefined
// }

const AnsweredGame = ({ play, showMovies = false }) => {
  if (!play) {
    return null
  }

  return (
    <div>
      <h2 className="text-center">
        Which movie was released in{' '}
        <span className="font-bold text-lg px-1">
          {getYear(play.correctMovie.releasedOn)}
        </span>
        ?
      </h2>
      {showMovies && (
        <div>
          <div className="flex items-center flex-1 justify-between w-full w-auto">
            {play.possibleMovies.map(({ movie }) => {
              return (
                <div key={movie.id} className="w-40">
                  <div className="flex flex-col text-center ">
                    <h3
                      className={
                        'py-4' +
                        (movie.id === play.correctMovie.id
                          ? ' font-bold text-green-700'
                          : movie.id === play.answeredMovie.id
                          ? ' font-bold text-red-700'
                          : ' text-gray-500')
                      }
                    >
                      {movie.title}
                    </h3>
                    <p className="font-bold text-center pb-2">
                      {getYear(movie.releasedOn)}
                    </p>
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
      )}
      <div className="mt-4">
        {play.correctness && (
          <div>
            <h4 className="text-xl font-bold text-center">Nice! 🎉 </h4>
            <div className="grid grid-cols-4 mt-4 p-6 bg-green-100 rounded-lg">
              <div className="place-self-center col-span-1 drop-shadow-md">
                <img
                  alt={play.correctMovie.title}
                  // Available poster sizes ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
                  src={`https://image.tmdb.org/t/p/w92/${play.correctMovie.photoPath}`}
                />
              </div>
              <div className="col-span-3">
                <p className="text-lg font-bold mb-1">
                  {getYear(play.correctMovie.releasedOn)}
                </p>
                <h5 className="text-lg font-semibold mb-1">
                  {play.correctMovie.title}
                </h5>
                <p>{play.correctMovie.overview}</p>
              </div>
            </div>
          </div>
        )}
        {!play.correctness && (
          <div>
            <h4 className="text-xl font-bold text-center">Sorry 😢</h4>
            <div className="grid grid-cols-4 mt-4 p-6 bg-red-100 rounded-lg">
              <div className="place-self-center col-span-1 drop-shadow-md">
                <img
                  alt={play.answeredMovie.title}
                  // Available poster sizes ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
                  src={`https://image.tmdb.org/t/p/w92/${play.answeredMovie.photoPath}`}
                />
              </div>
              <div className="col-span-3">
                <p className="text-lg font-bold mb-1">
                  {getYear(play.answeredMovie.releasedOn)}
                </p>
                <h5 className="text-lg font-semibold mb-1">
                  {play.answeredMovie.title}
                </h5>
                <p>{play.answeredMovie.overview}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 mt-4 p-6 bg-green-100 rounded-lg">
              <div className="place-self-center col-span-1 drop-shadow-md">
                <img
                  alt={play.correctMovie.title}
                  // Available poster sizes ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
                  src={`https://image.tmdb.org/t/p/w92/${play.correctMovie.photoPath}`}
                />
              </div>
              <div className="col-span-3">
                <p className="text-lg font-bold mb-1">
                  {getYear(play.correctMovie.releasedOn)}
                </p>
                <h5 className="text-lg font-semibold mb-1">
                  {play.correctMovie.title}
                </h5>
                <p>{play.correctMovie.overview}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnsweredGame
