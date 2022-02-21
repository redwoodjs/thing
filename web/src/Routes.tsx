// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import PageLayout from 'src/layouts/PageLayout/PageLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={PageLayout}>
        <Route path="/play" page={PlayPage} name="play" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/rules" page={RulesPage} name="rules" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
