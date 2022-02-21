# The (thing) RW Example App

A Movie Quiz to pick the right movie.
## Data Model


* `Movie` - Information about a Movie from [The Movie Database](https://www.themoviedb.org). Includes title, released date, poster image path, and more.
* `Player` - maps to a User and stores their profiles. Gets associated with `Play`s.
* `Play` - A Player will update the Play with a guess for which movie is correct. A Play is created when a player decides to play and gets created with a known correct Movie and a list of 5 PossibleMovies (of which the correct one is one).
* `PossibleMovies` - Belongs to a Play. These are the choices from which a Player will guess.

All ids are uuids.
All have createdAt and updatedAt timestamps.

### Other Models

* `Leader` - Calculated by counting correct Plays per Player with top leaders having more correct plays

## Rules

* Player decides to play (must be logged in Note: may change to be a session and then claim plays.
* System will create a Play and associate it with the Player (ie, currently logged in user) and also pick a random Movie (the CorrectMovie) and four other possible movies (random but not the same year/correct cirteria as the picked movie) for a total of five choices. a Play without a correctness (ie, null) is considered "unplayed".
* When the Player guesses, the Play is updated with their answered movie and checks against the CorrectMovie and if they match, the Play correctness is set to true. Otherwise false.
* A Leaderboard count correct plays per Player. The Player with the most correct plays is winning.

Current idea is to pick the move for the year. This mean the possible movies cannot be released in the same year as the correct randomly picked movie.

## Data

All movie data will be seeded from [The Movie Database](https://www.themoviedb.org).

A script will generate a JSON file of Movies and the seed script will load these into the Movie table.

### Generate Seed Script

This project comes pre-packaged with 8,000 movies from the past 40 years that can be seeded during database migration.

You can find this movie data file in `data/movies.json`.

First, you will need a TMDB API key.

Register at https://www.themoviedb.org to get tokens and api keys

Set in for `.env` file, your API Key.

```
TMDB_API_KEY=your key
```

We'll use the The Movie Database API (see: https://www.themoviedb.org/documentation/api) to fetch movies for a a number of past years.

The `createMovieData` script is found in `scripts/createMovieData.ts`.

To run:

```
// Fetch default set of 20 movies (ie, 1 page) from 5 years ago
yarn rw exec createMovieData

// Fetch 20 movies (ie, 1 page) from year from 5 years ago to current year
yarn rw exec createMovieData --yearsAgo 5

// Fetch 200 movies (ie, 10 pages) from year from 10 years ago to current year
yarn rw exec createMovieData --yearsAgo 10 --numPages 10
```

After running the `createMovieData` script, you can then seed your data via:

```
yarn rw prisma db seed
```

Also, `yarn rw prisma migrate dev` will seed.

> Note: If data exists in the `Movie` it will not re-seed as adding same movies will cause a unique constraint to be violated.

Or reset to reload:

```
// Warning: this will destroy ALL data including Plays and User data
// Are you sure you want to reset your database? All data will be lost.
//
yarn rw prisma migrate reset
```


## Caching

GraphQL caching using a Redis store will cache Leaders (ie, the leadboard). Will be invalidated on play. Note - this may be very aggressive invalidation.

Perhaps Leaderboards will be cached by date so can see over time who is leading?

This means that leaders will be calculated where the play updatedAt < a point in time.
## Getting started

To run this app you need:
* A PostgreSQL database
* A redis database
* An account with Clerk for user auth
* An API key for TMDB
