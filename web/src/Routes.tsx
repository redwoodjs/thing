import { Router, Route, Set } from '@redwoodjs/router'
import PageLayout from 'src/layouts/PageLayout/PageLayout'
import { GameContextProvider } from './contexts/GameContext'

const Routes = () => {
  return (
    <Router>
      <Set wrap={PageLayout}>
        <Route path="/" page={HomePage} name="home" prerender />
        <Set wrap={GameContextProvider}>
          <Route path="/play" page={PlayPage} name="play" />
        </Set>
        <Route path="/leaderboard" page={LeaderboardPage} name="leaderboard" />
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/rules" page={RulesPage} name="rules" prerender />
        <Route path="/about" page={AboutPage} name="about" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
