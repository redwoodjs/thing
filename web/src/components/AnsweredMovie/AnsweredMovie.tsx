import MovieDetail from 'src/components/MovieDetail/MovieDetail'

const AnsweredMovie = ({ movie, showIcon = true }) => {
  return (
    <div className="grid grid-cols-4 mt-4 p-4 bg-red-100 rounded-lg border-solid border-4 border-red-500">
      <div className="place-self-center col-span-1 drop-shadow-md">
        <div className="relative block bg-white rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <img
            className="rounded-md shadow-md h-60 border-4 border-solid border-red-500"
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/w154/${movie.photoPath}`}
          />
          {showIcon && (
            <div
              className="absolute inset-0 flex items-center justify-center animate-pulse text-red-500"
              aria-hidden="true"
            >
              <svg
                className="w-20 h-20"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                stroke="2"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-3">
        <MovieDetail movie={movie} />
      </div>
    </div>
  )
}

export default AnsweredMovie
