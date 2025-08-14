import { input } from "../utils.mjs"
import { Usuario } from "../models/usuarios.mjs"
import { Posts } from "../models/posts.mjs"

export async function crearPost (usuarioId) {
        console.clear()
        console.log("\tCrear Post")
        console.log("===========================")
        const titulo = await input("Título del Post: ")
        const contenido = await input("Contenido del Post: ")

        const post = new Posts(usuarioId, titulo, contenido)
        const error = await post.validar()

        if (error) {
            console.clear()
            console.log("Crear un nuevo Post")
            console.log("===========================")
            console.log(error)
            console.log("===========================")
            await input("")
        }
        else {
            await post.guardar()
            console.clear()
            console.log("\tCrear Post")
            console.log("===========================")
            console.log("Post creado con éxito!")
            console.log("===========================")
            await input('')
        }
        console.clear()
}