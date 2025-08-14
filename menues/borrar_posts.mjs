import { input } from "../utils.mjs"
import { listarPost } from "./listar_posts.mjs"

export async function borrarPost (usuarioId) {
    console.clear()
    console.log("\tBorrar Post")
    console.log("===========================")
    const posts = await Posts.listarPost(usuarioId)
    if (posts.length === 0) {
        console.log("No tienes posts para borrar.")
        await input("")
        return
    }
    console.log("===========================")
    const opcion = await input("Elige un post para borrar(ID): ")
    //const res = await
}