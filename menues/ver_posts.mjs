import { input } from "../utils.mjs"
import { Posts } from "../models/posts.mjs"

export async function listarPosts() {
    console.clear()
    console.log("\tVer Posts")
    console.log("===========================")
    const posts = await Posts.listarTodos()
    if (posts.length === 0) {
        console.log("No hay posts disponibles.")
    }

    let maxLong = 0
    posts.forEach(post => {
        const lineaTitulo = ` ${post.titulo} | @${post.username} `
        maxLong = Math.max(maxLong, lineaTitulo.length, post.contenido.length)
    })

    const borde = "+" + "-".repeat(maxLong + 2) + "+"

    posts.forEach(post => {
        const lineaTitulo = ` ${post.titulo} | @${post.username} `
        console.log("\n")
        console.log(borde)
        console.log(`| ${lineaTitulo.padEnd(maxLong)} |`)
        console.log(borde)
        console.log(`| ${post.contenido.padEnd(maxLong)} |`)
        console.log(borde)
    })
    await input("")
}