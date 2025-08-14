import { input } from "./utils.mjs"
import { crearUsuario } from "./menues/crear_usuario.mjs"
import { iniciarSesion } from "./menues/sesiones.mjs"
import {listarPosts} from "./menues/ver_posts.mjs"
import { crearPost } from "./menues/crear_posts.mjs"
import { listarPost } from "./menues/listar_posts.mjs"
import { borrarPost } from "./menues/borrar_posts.mjs"

while (true) {

    let userId

    console.clear()
    console.log("\tHeitter")
    console.log("===========================")
    console.log("1. Iniciar Sesión")
    console.log("2. Crear Usuario")
    console.log("3. Salir")
    console.log("===========================")

    const opcion = await input("Seleccione una opción: ")

    switch(opcion) {
        case "1":
            const usuario = await iniciarSesion()
            userId = usuario.id
            let signal = true
            while (signal) {
                console.clear()
                console.log("\tHeitter")
                console.log("===========================")
                console.log(`Bienvenido/a ${usuario.nombre}!!`, "Que quieres hacer hoy?\n\n1. Crear un Post\n2. Borrar un Post\n3. Ver mis Posts\n4. Ver todos los Posts\n5. Cerrar Sesión")
                console.log("\n===========================")
                const sOpcion = await input("Selecciona una opción: ")

                switch(sOpcion) {
                    case "1":
                        await crearPost(userId)
                        break
                
                    case "2":
                        await borrarPost(userId)
                        break

                    case"3": 
                        console.clear()
                        await listarPost(userId)
                        await input("")
                        break
                
                    case "4":
                        console.clear()
                        await listarPosts()
                        break
                
                    case "5":
                        console.clear()
                        console.log("Cerrando sesión...")
                        await input("")
                        signal = false
                        break

                    default:
                        console.log("Opción no válida.")
                        await input("")
                }
            }
            break

        case "2":
            await crearUsuario()
            break

        case "3":
            break

        default:
            console.log("La opción seleccionada no es válida")
            await input("")
    }
}


console.clear()
console.log("Bye")