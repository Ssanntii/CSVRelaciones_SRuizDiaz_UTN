import { input } from "../utils.mjs"
import { Posts } from "../models/posts.mjs"

export async function listarPost(usuarioId) {
    console.clear()
    console.log("\tTus Posts")
    console.log("===========================")

    const posts = await Posts.listarPosts(usuarioId)
    if (posts.length === 0) {
        console.log("Aún no tienes posts. Crea uno!!")
        console.log("===========================")
        await input("")
        return
    }

    let maxLong = 0
    posts.forEach(post => {
        const lineaTitulo = `${post.id} | ${post.titulo}`
        maxLong = Math.max(maxLong, lineaTitulo.length, post.contenido.length)
    })

    const borde = "+" + "-".repeat(maxLong + 2) + "+"

    posts.forEach(post => {
        const lineaTitulo = `${post.id} | ${post.titulo}`
        console.log("\n")
        console.log(borde)
        console.log(`| ${lineaTitulo.padEnd(maxLong)} |`)
        console.log(borde)
        console.log(`| ${post.contenido.padEnd(maxLong)} |`)
        console.log(borde)
    })
}
