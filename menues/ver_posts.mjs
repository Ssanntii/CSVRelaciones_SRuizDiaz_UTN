import { input } from "../utils.mjs"
import { Posts } from "../models/posts.mjs"

export async function listarPosts() {
    console.clear()
    console.log("\tVer Posts")
    console.log("===========================\n")
    const posts = await Posts.listarTodos()
    if (posts.length === 0) {
        console.log("No hay posts disponibles.")
    } else {
        posts.forEach(post => {
            console.log("+-------------------------+")
            console.log(`${post.titulo} | @${post.username}`)
            console.log("+-------------------------+")
            console.log(`${post.contenido}`)
            console.log("+-------------------------+\n")
        })
    }
}