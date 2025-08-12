import { input } from "./utils.mjs"
import { crearUsuario } from "./menues/crear_usuario.mjs"

while (true) {
    console.clear()
    console.log("Consola Social")
    console.log(`
        1. Iniciar Sesión
        2. Crear Cuenta
        3. Salir
        `)

    const opcion = await input(": ")

    if (opcion === "1") {

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