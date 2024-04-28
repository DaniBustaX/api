const express = require('express')
const cors = require('cors')
const peliculas = require('./movies/movies.json')
const uuid = require('uuid')
const { validarPelicula } = require('./schemas/index')


const app = express()
const port = 4321

app.use(cors())
app.use(express.json())


//rutas

//obtener todas las peliculas
app.get("/obtenerPeliculas", (req, res) => {
    if (peliculas.length > 0) {
        res.json(peliculas)
    } else {
        res.status(404).json({ error: 'No hay peliculas' })
    }
})

//obtener una pelicula por Id
app.get("/obtenerPelicula/:id", (req, res) => {
    const id = req.params.id

    const pelicula = peliculas.find((pelicula) => pelicula.id == id)
    if (pelicula) {
        res.json(pelicula)
    } else {
        res.status(404).json({ error: 'Pelicula no encontrada' })
    }
})

//agregar una nueva pelicula
app.post('/agregarPelicula', (req, res) => {
    const data = req.body
    if (validarPelicula(data).success) {
        const id = uuid.v4()
        peliculas.unshift({ id, ...data })
        res.status(200).json(peliculas)
    } else {
        res.status(400).json({ error: 'Datos inválidos' })
    }
})

//Actualiizar pelicula por Id
app.put('/actualizarPelicula/:id', (req, res) => {
    const id = req.params.id
    const data = req.body

    if (validarPelicula(data).success) {
        var actualizado = false

        const peliculasActualizadas = peliculas.map((pelicula) => {
            if (pelicula.id == id) {
                actualizado = true
                return { ...pelicula, ...data }
            }
            return peliculas
        })

        if (actualizado) {
            res.json(peliculasActualizadas)
        } else {
            res.status(404).json({ error: 'Pelicula no encontrada' })
        }
    } else {
        res.status(400).json({ error: 'Datos inválidos' })
    }
})

//Eliminar pelicula por Id
app.delete("/eliminarPelicula/:id", (req, res) => {
    const id = req.params.id

    var eliminado = false
    const peliculasActualizadas = peliculas.filter((pelicula) => {
        if (pelicula.id == id) {
            eliminado = true
        } else {
            return pelicula
        }

    })

    if (eliminado) {
        res.json(peliculasActualizadas)
    } else {
        res.status(404).json({ error: 'Pelicula no encontrada' })
    }
})


app.listen(port, () => console.log(`Listening on port ${port}`))