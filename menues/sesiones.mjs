import { input } from "../utils.mjs"
import { Usuario } from "../models/usuarios.mjs"

export async function iniciarSesion () {
    while (true) {
        console.clear()
        console.log("\tIniciar sesión")
        console.log("===========================\n")
        const email = await input("Email: ")
        const password = await input("Contraseña (DNI): ")
        if (!email || !password) {
            console.log("Email y contraseña son obligatorios.")
            await input("")
            continue
        }

        const usuarios = await Usuario.listar()
        const usuario = usuarios.find(u => u.email === email && u.dni === password)
        
        if (usuario) {
            return usuario
        }
        console.log("Email o contraseña incorrectos.")
        await input("")
    }    
}