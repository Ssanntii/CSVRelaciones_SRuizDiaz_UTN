import { input } from "../utils.mjs"
import { Usuario } from "../models/usuarios.mjs"
import { Posts } from "../models/posts.mjs"

export async function crearPost (usuario) {
    while (true) {
        console.clear()
        console.log("Crear un nuevo Post")
        const contenido = await input("Contenido del Post: ")
        if (!contenido) {
            console.log("El contenido no puede estar vacío.")
            await input("")
            continue
        }
    }
}