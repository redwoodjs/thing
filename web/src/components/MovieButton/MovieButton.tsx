const MovieButton = ({ movie, onClick }) => {
  return (
    <div key={movie.id} className="flex-1">
      <button onClick={onClick}>
        <div className="drop-shadow-lg shadow-white rounded-md text-center">
          <img
            className="lg:h-60 md:h-32 h-20 tex "
            alt={movie.title}
            // Available poster sizes ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
            src={`https://image.tmdb.org/t/p/w185/${movie.photoPath}`}
          />
        </div>
        <h3 className="text-white text-center font-semibold lg:text-xl md:text-lg text-md mt-4">
          {movie.title}
        </h3>
      </button>
    </div>
  )
}

export default MovieButton
