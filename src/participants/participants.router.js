const router = require('express').Router()

const participantServices = require('./participants.services')
const passportJWT = require('../middlewares/auth.middleware')

router.route('/')
    .get(participantServices.getParticipants)
    .post(participantServices.postParticipant)

router.route('/:id')
    .get(passportJWT.authenticate('jwt', {session: false}), participantServices.getUParticipantById)
    .delete(passportJWT.authenticate('jwt', {session: false}), participantServices.deleteParticipant)

    
module.exports = router