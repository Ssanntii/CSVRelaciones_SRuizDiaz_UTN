import { input } from "../utils.mjs"
import { Posts } from "../models/posts.mjs"

export async function listarPost (usuarioId) {
    console.clear()
    console.log("\tTus Posts")
    console.log("===========================")
    const posts = await Posts.listarPosts(usuarioId)
    if (posts.length === 0) {
        console.log("Aún no tienes posts. Crea uno!!")
        await input("")
        return
    }
    posts.forEach((post) => {
        console.log(`${post.id} | ${post.titulo}`)
        console.log("+-------------------------+")
        console.log(`${post.contenido}`)
        console.log("+-------------------------+\n")
    })
}