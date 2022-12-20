const conversationControllers = require('./conversations.controllers')

const getMyConversations = (req, res) => {
    const id = req.user.id
    conversationControllers.findMyConversations(id)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const getMyConversationById = (req, res) => {
    const id = req.params.conversation_id
    conversationControllers.findConversationById(id)
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

const postConversation = (req, res) => {
    const {title, imageUrl, participantId} = req.body
    const userId = req.user.id
    conversationControllers.createConversation({title, imageUrl, participantId, userId})
        .then((data) => {
            res.status(201).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message, fields: {
                title: 'String',
                imageUrl: 'https://imgur.com/asd.png',
                participantId: 'uuid'
            } })
        })
}

const patchMyConversation = (req, res) => {
    const id = req.params.conversation_id
    const {title, imageUrl} = req.body
    
    conversationControllers.updateConversation(id, {title, imageUrl})
        .then((data) => {
            if (data) {
                res.status(200).json({message: `User edited succesfully with id: ${id}`})
            } else {
                res.status(404).json({message: `User with id: ${id}, not found`})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const deleteMyConversation = (req, res) => {
    const id = req.params.conversation_id
    conversationControllers.deleteConversation(id)
        .then(() => {
            res.status(204).json()
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

module.exports= {
    getMyConversations,
    getMyConversationById,
    postConversation,
    patchMyConversation,
    deleteMyConversation
}