import db from '../database/connect.db.js'

export const searchUser = () => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM user'
        db.all(query, [], (err, row) => {
            if (err) {
                console.error(err.message)
            } else {
                console.log(row)
                resolve(row)
            }
        })

    })
};

export const searchUserByCPF = (cpf) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM user where user.cpf = ${cpf}`
        db.all(query, [], (err, row) => { // db.all para fazer consultas
            if (err) {
                console.error(err.message)
            } else {
                console.log(row)
                resolve(row)
            }
        })

    })
};

export const insertNewRegisterUser = (name, cpf, status, created_at, updated_at) => {

    return new Promise((resolve, reject) => {

        let query = `INSERT INTO user (name, cpf, status, created_at, update_at) VALUES (?, ?, ?, ?, ?)`
        let params = [name, cpf, status, created_at, updated_at] // manter a ordem para não inverter os dados

        db.run(query, params, (err) => { // db.run para inserir
            if (err) {
                console.error(err.message)
            } else {
                db.get(`SELECT last_insert_rowid() as code`, (err, row) => { // função no bd para buscar último registro inserido
                    if (err) {
                        console.error(err.message)
                        reject()
                    } else {
                        console.log(`User register success! ${row.code}`)
                        resolve(row)
                    }
                })
            }
        })

    })

}


export const updateUserInfo = (name, cpf, status, updated_at) => {

    return new Promise((resolve, reject) => {

        let query = `UPDATE user SET
                     name = ?,
                     status = ?, 
                     update_at = ?
                     WHERE user.cpf = ${cpf}`
        let params = [name, status, updated_at]

        db.run(query, params, (err, changes) => {
            if (err) {
                reject({ message: err.message })
            } else {
                if (changes === 0) {
                    reject({ message: 'User is not found!' })
                } else {
                    console.log("Updated is sucessfuly!")
                    resolve({
                        name: name,
                        cpf: cpf,
                        status: status,
                        updated_at: updated_at
                    })
                }
            }
        })

    })

}

export const deleteUsers = (cpf) => {

    return new Promise((resolve, reject) => {

        let query = `DELETE FROM user
                     WHERE user.cpf = ?`

        db.run(query, [cpf], (err, changes) => {
            if (err) {
                reject({ message: err.message })
            } else {
                if (changes === 0) {
                    reject({ message: 'User is not found!' })
                } else {
                    console.log("Deleted is sucessfuly!")
                    resolve({
                        cpf: cpf,
                    })
                }
            }
        })

    })

}

deleteUsers('41956891803')

// updateUserInfo('Kauã Almeida', '41956891803', 'Active', '2024-10-04', '2024-10-04')
