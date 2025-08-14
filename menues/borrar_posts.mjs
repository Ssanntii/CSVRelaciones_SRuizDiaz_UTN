import { Posts } from "../models/posts.mjs"
import { listarPost } from "./listar_posts.mjs"

export async function borrarPost (usuarioId) {
    console.clear()
    console.log("\tBorrar Post")
    console.log("===========================")
    await listarPost(usuarioId)
    await Posts.borrarPost()
}