import { input } from "../utils.mjs"
import { Usuario } from "../models/usuarios.mjs"

export async function crearUsuario () {
    while (true) {
        console.clear()
        console.log("\tCrear Usuario")
        console.log("===========================")
        const opcion = await input("Desea crear un usuario nuevo? (y/n): ")
        if (opcion.toLowerCase() === "y") {
            await crear()
            break
        } else if (opcion.toLowerCase() === "n") {
            break
        }
        console.log("Esta opción no es válida.")
        await input("")
    }
}

async function crear () {
    console.clear()
    console.log("\tCrear Usuario")
    console.log("===========================")
    let pNombre = await input("Nombre: ")
    const nombre = pNombre.charAt(0).toUpperCase() + pNombre.slice(1).toLowerCase().trim()
    let papellido = await input("Apellido: ")
    const apellido = papellido.charAt(0).toUpperCase() + papellido.slice(1).toLowerCase().trim()
    const dni = await input("DNI: ")
    let pemail = await input("Email: ")
    const email = pemail.toLowerCase().trim()

    const usuario = new Usuario(nombre, apellido, dni, email)
    const error = await usuario.validar()

    if (error) {
        console.clear()
        console.log("\tCrear Usuario")
        console.log("===========================")
        console.log(error)
        console.log("===========================")
        await input("")
    } else {
        await usuario.guardar()
        console.clear()
        console.log("\tCrear Usuario")
        console.log("===========================")
        console.log("Usuario creado con éxito!")
        console.log("===========================")
        await input('')
    }
    console.clear()
}