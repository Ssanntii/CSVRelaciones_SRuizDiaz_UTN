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
    }
}

async function crear () {
    console.clear()
    console.log("\tCrear Usuario")
    console.log("===========================")
    const nombre = await input("Nombre: ")
    const apellido = await input("Apellido: ")
    const dni = await input("DNI: ")
    const email = await input("Email: ")

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