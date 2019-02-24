import express from 'express';
import controller from './controller';

const router = express.Router();

router.get('/', controller.index);
router.get('/getToken', controller.getAuthUrl);
router.get('/getToken/callback', controller.getAccessToken);

router.get('/events', controller.listEvents);
router.get('/event/:id(\\d+)', controller.getEvent);
router.post('/event/:id(\\d+)', controller.updateEvent);
router.get('/event/create', controller.getEventForm);
router.post('/event/create', controller.createEvent);

router.get('/people', controller.listPeople);
router.get('/person/:id(\\d+)', controller.getPerson);
router.post('/person/:id(\\d+)', controller.updatePerson);
router.get('/person/create', controller.getPersonForm);
router.post('/person/create', controller.createPerson);
router.get('/person/delete/:id(\\d+)', controller.deletePerson);

export default router;