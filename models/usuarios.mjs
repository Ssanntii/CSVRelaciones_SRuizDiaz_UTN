import fs from "fs/promises"

export class Usuario {

    static file = "usuarios.csv"
    static columns = ["ID", "Nombre", "Apellido", "DNI", "Email"]
    constructor (nombre, apellido, dni, email) {
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.email = email
    }

    async guardar () {
        const contenido = await fs.readFile(this.constructor.file, { encoding: "utf-8" })
        console.log(contenido)
        console.log(this)
        console.log("Guardando")
    }
}