# Backend for FireForceDefense

## Purpose
This backend is meant to store the users's scores per level,
so that the actual FireForceDefense game has access to a persistent storage
for the users progress.

Furthermore, this backend can be used to serve the FireForceDefense game
in a production environment.

## Usage

### Score Storage
#### Retrieving scores for a user
The scores of a player can be retrieved by sending a `GET` request to
`/api/<nickname>`. The server will respond with a JSON file
of the following structure:
```JSON
{
    "nickname": "<nickname>",
    "scores": {
        "lvl001": 3,
        "lvl002": 1
    }
}
```
If the user doesn't yet exist, the scores field of the response will be an
empty object and no user will be created in the database.
To create a new user, refer to the section below.

#### Setting scores for a user
To set a new scores for a player, send a `POST` request to
`/api/<nickname>`.

The score data must be inside the request body, where the level ID is the
key, and the achieved score is the value.

If there is already a score for this level for this user, the old value will
be overwritten.

If the user does not yet exist, a new user is created and the scores from the
request body are set as their scores.

### Serving the Game
This server serves anything inside the `/static` directory.
This is especially useful when the contents of the `/dist` directory
of the actual game are symlinked into said `/static` directory.
The file `/static/index.html` is used as a 404 fallback.
