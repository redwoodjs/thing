const MovieButton = ({ movie, onClick }) => {
  return (
    <div key={movie.id} className="text-center">
      <button onClick={onClick}>
        <div className="drop-shadow-lg">
          <img
            className="lg:h-60 md:h-32 h-20 rounded-md"
            alt={movie.title}
            // Available poster sizes ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
            src={`https://image.tmdb.org/t/p/w185/${movie.photoPath}`}
          />
        </div>
        <h3 className="py-4 text-center font-semibold lg:text-xl md:text-lg text-md ">
          {movie.title}
        </h3>
      </button>
    </div>
  )
}

export default MovieButton
