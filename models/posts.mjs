import fs from "fs/promises"

export class Posts {

    static file = "posts.csv"
    static columns = ["id", "usuarioId", "titulo", "contenido"]

    constructor (usuarioId, titulo, contenido, id = null) {
        this.id = id
        this.usuarioId = usuarioId
        this.titulo = titulo
        this.contenido = contenido
    }

    static async #leerArchivo () {
        const contenido = await fs.readFile(this.file, {
            encoding: "utf-8"
        })

        const datos = contenido.split("\n")
        const datosFiltrados = datos.filter(
            (valor, indice) => {
                if (indice !== 0) return valor
            }
        )

        const datosInstancia = datosFiltrados.map(
            (valor) => {
                const linea = valor.trim().split(";")
                const [id, usuarioId, titulo, contenido] = linea
                const post = new Posts(usuarioId, titulo, contenido, id)
                return post
            }
        )
        return datosInstancia
    }

    async validar () {
        if (!this.titulo || this.titulo.length < 5) {
            return "El título debe tener al menos 5 caracteres."
        }
        if (!this.contenido || this.contenido.length < 10) {
            return "El contenido debe tener al menos 10 caracteres."
        }
        const posts = await Posts.#leerArchivo()
        const existe = posts.filter(post => {
            if (post.titulo === this.titulo && post.contenido === this.contenido) {
                return post
            }
        })
        return null
    }
    async guardar () {
        const posts = await Posts.#leerArchivo()
        this.id = posts.length + 1
        const nuevoPost = `${this.id};${this.usuarioId};${this.titulo};${this.contenido}\n`
        await fs.appendFile(this.constructor.file, nuevoPost)
        return this
    }
    static async listar () {
        const posts = await this.#leerArchivo()
        return posts
    }
    
    
}