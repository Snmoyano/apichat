const {DataTypes} = require('sequelize')
const Conversations = require('./conversations.models')
const Users = require('./users.models')

const db = require('../utils/database')

const Participants = db.define('participants', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Conversations
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Users
        }
    }
})

module.exports = Participants