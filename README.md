# movies-express-mongodb
Example of Express and MongoDB to make a simple API

## Challenges

### Add extra fields to movie model

- Add `yearReleased` (Number), `description`, `rating`

### Add CRUD APIs to movies

- Refactor to place all movie routes into `routes/movies.js` using `express.Router()`
- You can create using [`new Movie(doc).save()` or `Movie.create(doc)`](http://mongoosejs.com/docs/api.html#model_Model.create)
- You can update using [`Movie.findByIdAndUpdate(id, newDoc)`](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate)
- Create movie: `POST /movies`
- Update movie: `PUT /movies/:id`
- Delete movie: `DELETE /movies/:id`
- Make sure you use the correct status code (e.g. `201` for create)

### *Advanced*: Add relations to movie
- Create another schema + model called `Person`
- Add `actors`, `crew`, `writers`, `directors` using references: https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/

### Create a React front-end

- Lists movies
- Create a movie using a form
- Update a movie
- Delete a movie
- Filter movies by year
