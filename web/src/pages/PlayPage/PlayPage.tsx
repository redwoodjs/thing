import { MetaTags } from '@redwoodjs/web'

const PlayPage = () => {
  return (
    <>
      <MetaTags title="Play" description="Play page" />

      <h1>PlayPage</h1>
      <h2 className="text-center">
        Which of the following movies was released in 2011?
      </h2>
      <div className="flex items-center flex-1 justify-between w-full w-auto">
        <button className="w-40">The Dark Knight</button>
        <button className="w-40">The Thing</button>
        <button className="w-40">Star Wars - The Force Awakens</button>
        <button className="w-40">Steve Jobs</button>
        <button className="w-40">American Pie</button>
      </div>
    </>
  )
}

export default PlayPage
