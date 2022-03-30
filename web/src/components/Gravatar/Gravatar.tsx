interface Props {
  player: {
    gravatarHash?: string
    name: string
  }
  size?: string
}

const Gravatar = ({ player, size = '2.25rem' }: Props) => {
  let src = 'https://www.gravatar.com/avatar?d=mp'

  if (player.gravatarHash) {
    src = `https://www.gravatar.com/avatar/${player.gravatarHash}?s=200`
  }

  return (
    <img
      className="inline-block rounded-full"
      style={{ width: size, height: size }}
      src={src}
      alt={player?.name}
    />
  )
}

export default Gravatar
