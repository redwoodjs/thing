const Gravatar = ({ leader }) => {
  return (
    <img
      className="inline-block h-9 w-9 rounded-full"
      src={`https://www.gravatar.com/avatar/${leader.player.gravatarHash}?s=200`}
      alt={leader.player.name}
    />
  )
}

export default Gravatar
