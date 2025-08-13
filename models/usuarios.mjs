import fs from "fs/promises"

export class Usuario {

    static file = "usuarios.csv"
    static columns = ["id", "nombre", "apellido", "dni", "email"]
    constructor (nombre, apellido, dni, email, id = null) {
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.email = email
    }
    async #leerArchivo () {
        const contenido = await fs.readFile(this.constructor.file, {
            encoding: "utf-8"
        })

        const datos = contenido.split("\n")
        const datosFiltrados = datos.filter(
            (valor, indice) => {
                if (indice !== 0) return valor
            }
        )

        const datosInstancia = datosFiltrados.map(
            (valor) => {

                const linea = valor.trim().split(";")
                const [id, nombre, apellido, dni, email] = linea

                const usuario = new Usuario(nombre, apellido, dni, email, id)

                return usuario
            }
        )
        return datosInstancia
        // await input()

    }
    async validar () {


        if (!this.email.includes("@")) {
            return "El email debe ser válido"
        }

        if (this.dni.length !== 8) {
            return "el dni debe ser mayor igual a 8 caracteres"
        }

        if (!Number(this.dni)) {
            return "el dni debe ser un número"
        }

        const usuarios = await this.#leerArchivo()

        const existe = usuarios.filter(usuario => {
            if (usuario.email === this.email) {
                return usuario
            }
            if (usuario.dni === this.dni) {
                return usuario
            }
        })

        return existe.length > 0 ? "El usuario ya existe" : false
    }
    async guardar () {
        const usuarios = await this.#leerArchivo()

        if (usuarios.length === 0) {
            this.id = 0
        }
        else {
            const ultimoUsuario = usuarios.pop()
            this.id = (Number(ultimoUsuario.id) + 1).toString()
        }
        const lineaNueva = `${this.id};${this.nombre};${this.apellido};${this.dni};${this.email}\n`

        await fs.appendFile(this.constructor.file, lineaNueva)

    }
}