import Countdown, {
  COUNTDOWN_STARTED,
  COUNTDOWN_COUNTING,
  COUNTDOWN_CLOSER,
  COUNTDOWN_ALMOST,
  COUNTDOWN_OVER,
} from './Countdown'

export const generated = () => {
  return <Countdown countdown={20} />
}

export const started = () => {
  return <Countdown countdown={COUNTDOWN_STARTED} />
}

export const counting = () => {
  return <Countdown countdown={COUNTDOWN_COUNTING} />
}

export const closer = () => {
  return <Countdown countdown={COUNTDOWN_CLOSER} />
}

export const almost = () => {
  return <Countdown countdown={COUNTDOWN_ALMOST} />
}

export const ended = () => {
  return <Countdown countdown={COUNTDOWN_OVER} />
}

export default { title: 'Components/Countdown' }
