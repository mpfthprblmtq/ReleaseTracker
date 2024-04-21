# ReleaseTracker

This project is a way to keep track of releases from music artists, since sometimes I miss them.  The main data would be sourced from the following:
1. Spotify
2. SoundCloud
3. YouTube

Spotify and SoundCloud are obvious picks, since music is usually posted to those platforms.  YouTube might be better for other updates, still working on how that fits in.

The idea is that a user can login to see a dashboard of all the artists they follow and all of the releases they've put out in the past week or so (time period would be modifiable).  
They would be able to add/remove artists to follow, and even be able to categorize those artists into folders/genres to sort out their different music tastes.
When a user wants to add an artist, they would go to a "Tracking" page, where they can search for an artist by name.  This would kick off a search to 
Spotify, SoundCloud, and YouTube where the user can pinpoint the accounts associated to that artist.  Once they have those accounts linked to an artist, then searches can be performed
on the dashboard to get those artists' new tracks.

Just some random ideas to throw around:
- Embedded players to play the track in the app
- Could have social media connections (hard maybe)

## Feature Roadmap

### Phase I
* [Main project set up](https://github.com/mpfthprblmtq/ReleaseTracker/issues/1)
  * Import all necessary libraries (Axios, MUI, Redux, etc.)
* Create hooks for [Spotify](https://github.com/mpfthprblmtq/ReleaseTracker/issues/2), [SoundCloud](https://github.com/mpfthprblmtq/ReleaseTracker/issues/3) and [YouTube](https://github.com/mpfthprblmtq/ReleaseTracker/issues/4)
* [Create dashboard page with hardcoded artist ids](https://github.com/mpfthprblmtq/ReleaseTracker/issues/7)
* Determine if any of these APIs are behind CORS
  * Might be a good argument for a backend?

### Phase II
* [Decide on a data storage solution](https://github.com/mpfthprblmtq/ReleaseTracker/issues/5)
  * AWS DynamoDB?  PostgreSQL?
* [Decide on an authentication solution](https://github.com/mpfthprblmtq/ReleaseTracker/issues/6)
  * Auth0?
* [Tracking page](https://github.com/mpfthprblmtq/ReleaseTracker/issues/8)
  * Users can input artists to follow
  * Can modify and delete those artists
* [Categories](https://github.com/mpfthprblmtq/ReleaseTracker/issues/9)
  * Can set artists to folders/genres and filter on those artists in the dashboard

### Phase III
* Authentication
* Hosting?
* Embedded players?
* MVP complete

### Phase IV
* Any other ideas/features
