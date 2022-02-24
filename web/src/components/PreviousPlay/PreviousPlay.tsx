import { getYear } from 'src/utils/date'

interface Props {
  play: any | undefined
}

const PreviousPlay = ({ play }: Props) => {
  if (!play) {
    return null
  }

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
  )
}

export default PreviousPlay
