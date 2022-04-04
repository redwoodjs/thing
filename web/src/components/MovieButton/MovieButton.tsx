const MovieButton = ({ movie, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-center group py-2 lg:w-40 md:w-20 w-16 mx-auto"
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-blue-200 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500 group-hover:duration-100 animate-tilt"></div>

        <img
          className="lg:w-40 md:w-32 w-20 relative rounded-lg"
          alt={movie.title}
          // Available poster sizes ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
          src={`https://image.tmdb.org/t/p/w185/${movie.photoPath}`}
        />
      </div>

      <h3 className="py-4 text-indigo-400 font-semibold lg:text-xl md:text-md text-md group-hover:text-gray-100 transition duration-100 overflow-hidden text-ellipsis">
        {movie.title}
      </h3>
    </button>
  )
}

export default MovieButton
