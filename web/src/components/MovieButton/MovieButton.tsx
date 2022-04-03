const MovieButton = ({ movie, onClick }) => {
  return (
    <button key={movie.id} onClick={onClick} className="md:w-60 w-40 px-4">
      <img
        className="block rounded-md border-2 border-gray-50 hover:border-yellow-200"
        alt={movie.title}
        // Available poster sizes ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
        src={`https://image.tmdb.org/t/p/w185/${movie.photoPath}`}
      />
    </button>
  )
}

export default MovieButton
