const z = require('zod')

const productSchema = z.object({
    title: z.string().min(10),
    price: z.number({
        required_error: "El precio es requerido",
        invalid_type_error: "El precio debe ser un número",
    }).positive(),
    description: z.string().min(20),
    category: z.string().nullish(),
    image: z.string().url(),
})

const moviesSchema = z.object({
    title: z.string(),
    year: z.number().positive(),
    director: z.string(),
    duration: z.number(),
    poster: z.string().url(),
    genre: z.array(z.string()),
    rate: z.number()
})

const validarProducto = (producto) => {
    return productSchema.safeParse(producto)
}

const validarPelicula = (pelicula) => {
    return moviesSchema.safeParse(pelicula)
}

module.exports = {
    validarProducto,
    validarPelicula
}