require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const MOVIES = require('./movies.json')

const app = express()
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

app.use(function validateBearerToken(req, res, next) {
	const authToken = req.get('Authorization')
	const apiToken = process.env.API_TOKEN

	if (!authToken || authToken.split(' ')[1] !== apiToken) {
		return res.status(401).json({ error: 'Unauthorized request' })
	}

	next()
})

function handleGetMovies(req, res) {
	const { genre, country, avg_vote } = req.query
	let results = MOVIES

	if (genre) {
		results = results.filter(movie =>
			movie.genre.toLowerCase().includes(genre.toLowerCase())
		)
	}

	if (country) {
		results = results.filter(movie =>
			movie.country.toLowerCase().includes(country.toLowerCase())
		)
	}

	if (avg_vote) {
		results = results.filter(movie => Number(movie.avg_vote) >= avg_vote)
	}

	return res.json(results)
}

app.get('/movies', handleGetMovies)

module.exports = app
