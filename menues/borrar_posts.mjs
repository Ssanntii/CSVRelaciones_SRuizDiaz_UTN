import { Posts } from "../models/posts.mjs"
import { input } from "../utils.mjs"

export async function borrarPost (usuarioId) {
    while (true){
        console.clear()
        console.log("\tBorrar Post")
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
        const pId = await input("Seleccione el ID del post a eliminar: ")
        const ids= []
        posts.forEach((p) => {
            ids.push(p)
        })
        if(!ids.includes[pId]) {
            console.log("No existe ningún post con ese ID")
            continue
        }

        const dPost = new Posts(usuarioId, posts.titulo, posts.contenido)

        const error = await dPost.borrarPost(pId, usuarioId)

        if(error){
            console.clear()
            console.log(error)
            console.log("===========================")
            await input("")
            continue
        }
        break
    }    
}