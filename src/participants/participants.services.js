const participantControllers = require('./participants.controllers')

const getParticipants = (req, res) => {
    participantControllers.findAllParticipants()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const getParticipantById = (req, res) => {
    const id = req.params.id
    participantControllers.findParticipantById(id)
        .then((data) => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const postParticipant = (req, res) => {
    const {conversationId, userId} = req.body
    participantControllers.createParticipant({conversationId, userId})
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message, fields: {
                conversationId: 'uuid',
                userId: 'uuid'
            }})
        })
}

const deleteParticipant = (req, res) => {
    const id = req.params.id 
    participantControllers.deleteParticipant(id)
        .then((data) => {
            if(data){
                res.status(204).json()
            } else {
                res.status(404).json({message: `User with id:${id}, Not Found`})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

module.exports = {
    getParticipants,
    getParticipantById,
    postParticipant,
    deleteParticipant
}