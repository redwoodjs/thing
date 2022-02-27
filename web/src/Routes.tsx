import { Router, Route, Set } from '@redwoodjs/router'
import PageLayout from 'src/layouts/PageLayout/PageLayout'
import { GameContextProvider } from './contexts/GameContext'

const Routes = () => {
  return (
    <Router>
      <Set wrap={PageLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Set wrap={GameContextProvider}>
          <Route path="/play" page={PlayPage} name="play" />
        </Set>
        <Route path="/leaderboard" page={LeaderboardPage} name="leaderboard" />
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/rules" page={RulesPage} name="rules" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
