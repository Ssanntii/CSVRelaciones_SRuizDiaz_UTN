import { input } from "./utils.mjs"
import { crearUsuario } from "./menues/crear_usuario.mjs"
import { iniciarSesion } from "./menues/sesiones.mjs"
import { crearPost } from "./menues/crear_posts.mjs"

while (true) {
    console.clear()
    console.log("\tHeitter")
    console.log("===========================")
    console.log("1. Iniciar Sesión")
    console.log("2. Crear Usuario")
    console.log("3. Salir")
    console.log("===========================")

    const opcion = await input("Seleccione una opción: ")

    if (opcion === "1") {
        const usuario = await iniciarSesion()
        console.clear()
        console.log("\tHeitter")
        console.log("===========================")
        console.log(`Bienvenido ${usuario.nombre}!!`, "Que quieres hacer hoy?\n\n1. Crear un Post\n2. Borrar un Post\n3. Ver mis Posts\n4. Ver todos los Posts\n5. Cerrar Sesión")
        console.log("===========================")
        const sOpcion = await input("Selecciona una opción: ")

        if (sOpcion === "1") {

        }
        else if (sOpcion === "5") {
            console.clear()
            console.log("Cerrando sesión...")
            await input("")
            continue
        }
    }
    else if (opcion === "2") {

        await crearUsuario()

    }
    else if (opcion === "3") {
        break
    }
    else {
        console.log("La opción seleccionada no es válida")
        await input("....")
    }
}

console.clear()
console.log("Bye")