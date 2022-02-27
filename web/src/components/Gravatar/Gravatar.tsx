interface Props {
  player: {
    gravatarHash?: string
    name: string
  }
  size?: string
}

const Gravatar = ({ player, size = '2.25rem' }: Props) => {
  return (
    <img
      className="inline-block rounded-full"
      style={{ width: size, height: size }}
      src={`https://www.gravatar.com/avatar/${player.gravatarHash}?s=200`}
      alt={player.name}
    />
  )
}

export default Gravatar
