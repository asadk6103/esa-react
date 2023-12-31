const { Sequelize } = require("sequelize")
const Queries = require("../../models/query")
const Tutor = require("../../models/tutor")
const Students = require("../../models/students")
const Users = require("../../models/users")


class QueryRepository {
    static async getAllQueries() {
        const queries = await Queries.findAll({
            include: [
                { model: Users, attributes: ["name"], paranoid: false }
            ]
        })
        return queries
    }

    static async getAllQueriesByUId(id) {
        const queries = await Queries.findAll({
            include: [
                { model: Users, attributes: ["name"] }
            ],
            where: {
                userId: id
            }
        })
        return queries
    }

    static async postQuery(payload) {
        const queries = await Queries.create(payload)
        return queries
    }

    static async getQueryById(id) {
        const queries = await Queries.findByPk(id)
        return queries
    }

    static async getQueryByStudentId(id) {
        const queries = await Queries.findByPk(id, {
            raw: true,
            include: [
                { model: Users, attributes: ["name"] }
            ]
        })
        return queries
    }

    static async updateEnded(id, payload) {
        const queries = await Queries.update(payload, {
            where: {
                id: id
            }
        })
        return queries
    }

    static async updateMaturity(id, payload) {
        const queries = await Queries.update(payload, {
            where: {
                id: id
            }
        })
        return queries
    }

    static async delete(id) {
        const queries = await Queries.destroy({
            where: {
                id: id
            }
        })
        return queries
    }
}

module.exports = QueryRepository