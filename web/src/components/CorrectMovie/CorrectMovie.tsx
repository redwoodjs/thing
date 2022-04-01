import MovieDetail from 'src/components/MovieDetail/MovieDetail'

const CorrectMovie = ({ movie, showIcon = true }) => {
  return (
    <div className="grid grid-cols-4 mt-4 p-6 bg-green-100 rounded-lg">
      <div className="relative mx-auto lg:max-w-md">
        <div className="relative block bg-white rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <img
            className="rounded-md shadow-md h-60"
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/w154/${movie.photoPath}`}
          />
          {showIcon && (
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
          )}
        </div>
      </div>
      <div className="col-span-3">
        <MovieDetail movie={movie} />
      </div>
    </div>
  )
}

export default CorrectMovie
