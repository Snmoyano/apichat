const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models')

const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    //? FK = Conversations / userId es la llave foranea
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    //? FK = Messages / userId y conversationId son llaves foraneas
    Users.hasMany(Messages)
    Messages.belongsTo(Users)

    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    //? FK = Participants / conversationsId y usersId son llaves foraneas
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)

    Users.hasMany(Participants)
    Participants.belongsTo(Users)
}

module.exports = initModels