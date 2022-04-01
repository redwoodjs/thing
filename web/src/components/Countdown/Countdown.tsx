export const COUNTDOWN_STARTED = 13
export const COUNTDOWN_COUNTING = 7
export const COUNTDOWN_CLOSER = 4
export const COUNTDOWN_ALMOST = 2
export const COUNTDOWN_OVER = 1

const Countdown = ({ countdown }) => {
  return (
    <>
      {countdown > COUNTDOWN_STARTED && (
        <div className="text-center">{countdown}</div>
      )}
      {countdown > COUNTDOWN_COUNTING && countdown <= COUNTDOWN_STARTED && (
        <div className="text-center font-semibold text-md">{countdown}</div>
      )}
      {countdown > COUNTDOWN_CLOSER && countdown <= COUNTDOWN_COUNTING && (
        <div className="text-center font-bold text-lg text-indigo-700">
          {countdown}
        </div>
      )}
      {countdown > COUNTDOWN_ALMOST && countdown <= COUNTDOWN_CLOSER && (
        <div className="text-center font-extrabold text-xl text-purple-600">
          {countdown}
        </div>
      )}
      {countdown > COUNTDOWN_OVER && countdown <= COUNTDOWN_ALMOST && (
        <div className="text-center font-extrabold text-xl text-red-600">
          {countdown}
        </div>
      )}
      {countdown > 0 && countdown <= COUNTDOWN_OVER && (
        <div className="text-center font-extrabold text-2xl text-red-500">
          {countdown}
        </div>
      )}
    </>
  )
}

export default Countdown
