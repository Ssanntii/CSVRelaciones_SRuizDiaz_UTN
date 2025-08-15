import fs from "fs/promises"
import { Usuario } from "./usuarios.mjs"
import { input } from "../utils.mjs"

export class Posts {

    static file = "posts.csv"
    static columns = ["id", "usuario_id", "titulo", "contenido"]

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
                return indice !== 0 && valor.trim() !== ""
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

        if (!this.titulo) this.titulo = "Sin título"
        if (this.titulo.length > 20) return "El título no puede tener más de 20 caracteres." 

        if (!this.contenido) return "El contenido del post no puede estar vacío."
        if (this.contenido.length > 200) return "El contenido del post no puede tener más de 200 caracteres."

        const usuarios = await Usuario.listar()
        const usuarioExiste = usuarios.find(u => u.id == this.usuarioId)
        if (!usuarioExiste) return "El usuario no es válido."

        const posts = await Posts.#leerArchivo()
        const existe = posts.filter(post => {
            if (post.titulo === this.titulo && post.contenido === this.contenido) {
                return post
            }
        })
        if (existe.length > 0) return "Ya existe un post con ese título y contenido."
        return null
    }

    async guardar () {
        const posts = await Posts.#leerArchivo()

        if (posts.length === 0) this.id = 1
        else {
            const ultimoPost = posts.pop()
            this.id = (Number(ultimoPost.id) + 1).toString()
        }

        const nuevoPost = `${this.id};${this.usuarioId};${this.titulo};${this.contenido}\n`

        await fs.appendFile(this.constructor.file, nuevoPost)
    }
    static async listarPosts(usuarioId) {
        const posts = await this.#leerArchivo()
        const postsUsuario = posts.filter(post => post.usuarioId == usuarioId)
        return postsUsuario
    }

    static async listarTodos() {
        const posts = await this.#leerArchivo()
        const usuarios = await import("./usuarios.mjs")
            .then(mod => mod.Usuario.listar())

        return posts.map(post => {
            const autor = usuarios.find(u => u.id == post.usuarioId)

            let autorNombre, autorApellido, username

            if (autor) {
                autorNombre = autor.nombre
                autorApellido = Array.isArray(autor.apellido)
                    ? autor.apellido.map(a => a.trim()).join("")
                    : autor.apellido

                username = `${autorNombre}${autorApellido}`.replace(/\s+/g, "")
            }

            return {
                ...post,
                username
            }
        })
    }

    async borrarPost(delID) {
        const posts = await Posts.#leerArchivo()
        const idBuscado = String(delID).trim()

        const filtroFilas = posts.filter(p => String(p.id).trim() !== idBuscado)

        if (filtroFilas.length === posts.length) return"No se encontró un post con ese ID."

        const header = "ID; usuario_id; titulo; contenido"
        const body = filtroFilas
            .map(p => [
                p.id,
                p.usuarioId,
                p.titulo,
                p.contenido
            ].join("; "))
            .join("\n")

        await fs.writeFile(
            "./posts.csv",
            `${header}\n${body}\n`,{
                encoding: "utf-8"
            }
        )

        console.log("Post eliminado correctamente.")
        await input("")
    }
}

