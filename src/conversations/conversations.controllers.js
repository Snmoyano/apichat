const uuid = require('uuid')
const User = require('../models/users.models')
const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')

const findMyConversations = async(id) => {
    const data = await Conversations.findAll({
        attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt']
        },

        include: [
            {
                model: User,
                attributes: {
                    exclude: ['email', 'password','createdAt', 'updatedAt']
                }
            },
            
            {
                model: Participants,
                attributes: {
                    exclude: ['conversationId', 'userId', 'createdAt', 'updatedAt']
                },
                
                    where: {
                        userId:id //? en participantes porque quiero que me traiga las conversaciones donde esta incluido el que la creo, no solamente las que creo.
                    },

                include: [
                    {
                        model: User,
                        attributes: {
                        exclude: ['email', 'password','createdAt', 'updatedAt']
                }
                    }
                ]
            }

        ],
    })
    return data
}

const findConversationById = async(id) => {
    const data = await Conversations.findOne({
        attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt']
        },
        where: {
            id: id
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['email', 'password','createdAt', 'updatedAt']
                }
            },

            {
                model: Participants,
                attributes: {
                    exclude: ['conversationId', 'userId', 'createdAt', 'updatedAt']
                },

                include: [
                    {
                        model: User,
                        attributes: {
                        exclude: ['email', 'password','createdAt', 'updatedAt']
                }
                    }
                ]
            }
        ]
    })
    return data
}

const createConversation = async(obj) => {

    const data = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imageUrl: obj.imageUrl,
        userId: obj.userId
    })
    if (data) {
    const conversationParticipants = await Participants.create({
            id: uuid.v4(),
            conversationId: data.id,
            userId: obj.participantId
        })
        const admin = await Participants.create({
            id: uuid.v4(),
            conversationId: data.id,
            userId: obj.userId
        })
    }
    return data
}

const updateConversation = async(id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
}

const deleteConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })
    return data
}

module.exports = {
    findMyConversations,
    findConversationById,
    createConversation,
    updateConversation,
    deleteConversation
}