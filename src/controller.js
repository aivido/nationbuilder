import service from './service';

class Controller {
    constructor() {
        this.service = service;
    }

    /**
     * Displays homepage
     * 
     * @param {*} req 
     * @param {*} res 
     */
    index(req, res) {
        res.render('home');
    }

    /**
     * Redirects to auth URL
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getAuthUrl(req, res) {
        res.redirect(service.getAuthUrl());
    }

    /**
     * Retrieve access token form code
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getAccessToken(req, res) {
        let query = req.query;

        if (query.error !== undefined) {
            return res.render('home', {
                data: query.error_description
            });
        }

        if (query.code === undefined) {
            return res.render('home', {
                data: 'Invalid request'
            });
        }

        service.getAccessToken(query.code).then((result) => {
            res.render('home', {
                data: 'Access Token: ' + result.data.access_token
            })
        }).catch((error) => {
            console.log(error);
            res.render('home', {
                data: error
            });
        });
    }

    /**
     * List all events
     * 
     * @param {*} req 
     * @param {*} res 
     */
    listEvents(req, res) {
        service.listEvents().then((response) => {
            res.render('event/list', {
                data: response.data
            });
        }).catch((error) => {
            res.render('event/list', {
                error: error.response
            });
        });
    }
    /**
     * Retrieve single event information
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getEvent(req, res) {
        service.getEvent(req.params.id).then((response) => {
            res.render('event/form', {
                data: response.data.event
            });
        }).catch((error) => {
            console.log(error);
            res.render('event/form', {
                error: error.response
            });
        });
    }

    /**
     * Displays form to create event
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getEventForm(req, res) {
        res.render('event/form');
    }

    /**
     * Creates event
     * 
     * @param {*} req 
     * @param {*} res 
     */
    createEvent(req, res) {
        const event = {
            "event": {
                "name": req.body.name,
                "start_time": req.body.start_time,
                "end_time": req.body.end_time,
                "intro": req.body.intro,
                "status": "published"
            }
        }
        service.createEvent(event).then((response) => {
            res.redirect('/events')
        }).catch((error) => {
            res.render('event/form', {
                error: ['Some error occured, Please try again.'],
                data: event.event
            })
        });
    }

    /**
     * Update event
     * 
     * @param {*} req 
     * @param {*} res 
     */
    updateEvent(req, res) {
        const id = req.params.id;
        const event = {
            "event": {
                "name": req.body.name,
                "start_time": req.body.start_time,
                "end_time": req.body.end_time,
                "intro": req.body.intro,
                "status": "published"
            }
        }

        service.updateEvent(id, event).then((response) => {
            res.render('event/form', {
                data: response.data.event,
                message: 'Event updated successfully.'
            });
        }).catch((error) => {
            res.render('event/form', {
                error: error.response
            });
        });
    }

    /**
     * List all people
     * 
     * @param {*} req 
     * @param {*} res 
     */
    listPeople(req, res) {
        service.listPeople().then((response) => {
            res.render('people/list', {
                data: response.data
            });
        }).catch((error) => {
            res.render('people/list', {
                error: error.response
            });
        });
    }

    /**
     * Retrieve single person information
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getPerson(req, res) {
        const id = req.params.id;
        service.getPerson(id).then((response) => {
            res.render('people/form', {
                data: response.data.person
            });
        }).catch((error) => {
            res.render('people/form', {
                error: error.response
            });
        })
    }

    /**
     * Updates person
     * 
     * @param {*} req 
     * @param {*} res 
     */
    updatePerson(req, res) {
        const id = req.params.id;
        const person = {
            "person": {
                "first_name": req.body.first_name,
                "last_name": req.body.last_name,
                "email": req.body.email,
                "id": id
            }
        }
        service.updatePerson(id, person).then((response) => {
            res.render('people/form', {
                data: response.data.person,
                message: 'Person updated successfully.'
            });
        }).catch((error) => {

            res.render('people/form', {
                error: ['Some error occured, Please try again.'],
                data: person.person
            });
        });
    }

    /**
     * Display form to create person
     * 
     * @param {*} rew 
     * @param {*} res 
     */
    getPersonForm(rew, res) {
        res.render('people/form');
    }

    /**
     * Creates person
     * 
     * @param {*} req 
     * @param {*} res 
     */
    createPerson(req, res) {
        const person = {
            "person": {
                "first_name": req.body.first_name,
                "last_name": req.body.last_name,
                "email": req.body.email
            }
        }

        service.createPerson(person).then((response) => {
            res.redirect('/people');
        }).catch((error) => {
            res.render('person/form', {
                error: ['Some error occured, Please try again.'],
                data: person.person
            });
        });
    }

    /**
     * Delete person
     * 
     * @param {*} req 
     * @param {*} res 
     */
    deletePerson(req, res) {
        const id = req.params.id;
        service.deletePerson(id).then((response) => {
            res.redirect('/people');
        }).catch((error) => {
            console.log(error.response);
        });
    }
}

export default new Controller;