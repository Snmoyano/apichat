const uuid = require('uuid')
const User = require('../models/users.models')
const Conversarions = require('../models/conversations.models')
const Participants = require('../models/participants.models')


const findAllParticipants = async () => {
    const data = await Participants.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }, 
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['email', 'password','createdAt', 'updatedAt']
                }
            },
            {
                model: Conversarions,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
        ]
    })
    return data
}

const findParticipantById = async(id) => {
    const data = await Participants.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        where: {
            id: id
        }
    })
    return data
}

const createParticipant = async(obj) => {
    const data = await Participants.create({
        id: uuid.v4(),
        conversationId: obj.conversationId,
        userId: obj.userId
    })
    return data
}

const deleteParticipant = async (id) => {
    const data = await Participants.destroy({
        where: {
            id: id
        }
    })
    return data
}

module.exports = {
    findAllParticipants,
    findParticipantById,
    createParticipant,
    deleteParticipant
}
