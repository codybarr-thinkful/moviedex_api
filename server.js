const app = require('./app')
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
	if (process.env !== process.env.NODE_ENV) {
		console.log(`Server listening at http://localhost:${PORT}`)
	}
})
