import { getYear } from 'src/utils/date'

const MovieDetail = ({ movie }) => {
  return (
    <>
      <p className="text-lg font-bold mb-1">{getYear(movie.releasedOn)}</p>
      <h5 className="text-lg font-semibold mb-1">{movie.title}</h5>
      <p>{movie.overview}</p>
    </>
  )
}

export default MovieDetail
