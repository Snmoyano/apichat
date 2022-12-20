const router = require('express').Router()

const conversationServices = require('./conversations.services')
const passportJWT= require('../middlewares/auth.middleware')


router.route('/')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getMyConversations)
    .post(passportJWT.authenticate('jwt', {session: false}), conversationServices.postConversation)

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt', {session: false}), conversationServices.getMyConversationById)
    .patch(passportJWT.authenticate('jwt', {session: false}), conversationServices.patchMyConversation)
    .delete(passportJWT.authenticate('jwt', {session: false}), conversationServices.deleteMyConversation)

module.exports = router