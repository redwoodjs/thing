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
                <div className="relative block bg-white rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Watch our video to learn more</span>
                  <img
                    className="rounded-md shadow-md"
                    alt={play.correctMovie.title}
                    // Available poster sizes ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
                    src={`https://image.tmdb.org/t/p/w154/${play.correctMovie.photoPath}`}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-20 h-20"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
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
                <div className="relative block bg-white rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Watch our video to learn more</span>
                  <img
                    className="rounded-md shadow-md"
                    alt={play.answeredMovie.title}
                    // Available poster sizes ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
                    src={`https://image.tmdb.org/t/p/w154/${play.answeredMovie.photoPath}`}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-20 h-20"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
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
              <div className="relative mx-auto lg:max-w-md">
                <div className="relative block bg-white rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Watch our video to learn more</span>
                  <img
                    className="rounded-md shadow-md"
                    alt={play.correctMovie.title}
                    // Available poster sizes ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
                    src={`https://image.tmdb.org/t/p/w154/${play.correctMovie.photoPath}`}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-20 h-20"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
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
