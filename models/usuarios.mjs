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

    static async #leerArchivo () {
        const contenido = await fs.readFile(this.file, {
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
    }

    async validar () {

        if (!this.nombre || /\d/.test(this.nombre)) {
            return "El nombre no puede estar vacío ni contener números."
        }

        if (!this.apellido || /\d/.test(this.apellido)) {
            return "El apellido no puede estar vacío ni contener números."
        }

        if (this.dni.length < 7 || this.dni.length > 8) {
            return "El DNI no es válido."
        }
        if (!/^\d+$/.test(this.dni)) {
            return "El DNI no puede contener letras."
        }

        if (!this.email.includes("@") || !this.email.includes(".c")) {
            return "El email debe ser válido."
        }

        const usuarios = await Usuario.#leerArchivo()
        const existe = usuarios.find(usuario =>
            usuario.email === this.email || usuario.dni === this.dni
        )
        return existe ? "Ya existe un usuario con ese email o DNI." : false
    }

    async guardar () {
        const usuarios = await Usuario.#leerArchivo()

        if (usuarios.length === 0) {
            this.id = 0
        }
        else {
            const ultimoUsuario = usuarios.pop()
            this.id = (Number(ultimoUsuario.id) + 1).toString()
        }
        this.nombre = this.nombre.charAt(0).toUpperCase() + this.nombre.slice(1).toLowerCase().trim()
        this.apellido = this.apellido.charAt(0).toUpperCase() + this.apellido.slice(1).toLowerCase().trim()
        this.email = this.email.toLowerCase().trim()
        const lineaNueva = `${this.id};${this.nombre};${this.apellido};${this.dni};${this.email}\n`

        await fs.appendFile(this.constructor.file, lineaNueva)
    }

    static async listar () {
        const usuarios = await this.#leerArchivo()
        return usuarios
    }
}