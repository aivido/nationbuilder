import config from './config';
import querystring from 'querystring';
import axios from 'axios';

class Service {

    constructor() {
        this._baseApiUrl = 'https://' + config.nation_slug + '.nationbuilder.com';
        this._headers = {
            'Accept': 'application/json',
            'content-Type': 'application/json'
        }
    }

    /**
     * Return auth URL
     */
    getAuthUrl() {
        const url = this._baseApiUrl + '/oauth/authorize/';
        const params = {
            "response_type": "code",
            "client_id": config.client_id,
            "redirect_uri": config.redirect_uri
        }
        return url + '?' + querystring.stringify(params);
    }

    /**
     * Generates acccess token
     * 
     * @param {string} code 
     * 
     */
    getAccessToken(code) {
        return axios.post(this._baseApiUrl + '/oauth/token', {}, {
            params: {
                "client_id": config.client_id,
                "client_secret": config.client_secret,
                "redirect_uri": config.redirect_uri,
                "grant_type": 'authorization_code',
                "code": code
            }
        });
    }
    
    /**
     * List events
     * 
     * @param {*} params 
     */
    async listEvents(params = {
        limit: 10
    }) {
        const url = this._baseApiUrl + '/api/v1/sites/' + config.site_slug + '/pages/events';
        return await axios.get(url, this.config(params));
    }

    /**
     * Get single event information
     * 
     * @param {*} id 
     */
    async getEvent(id) {
        const url = this._baseApiUrl + '/api/v1/sites/' + config.site_slug + '/pages/events/' + id;
        return await axios.get(url, this.config());
    }

    /**
     * Create event
     * 
     * @param {*} data 
     */
    async createEvent(data){
        const url = this._baseApiUrl + '/api/v1/sites/' + config.site_slug + '/pages/events';
        return await axios.post(url, data, this.config());
    }

    /**
     * Update event
     * 
     * @param {*} id 
     * @param {*} data 
     */
    async updateEvent(id, data) {
        const url = this._baseApiUrl + '/api/v1/sites/' + config.site_slug + '/pages/events/' + id;
        return await axios.put(url, data, this.config());
    }

    /**
     * List perple
     * 
     * @param {json} params 
     */
    async listPeople(params = {
        limit: 10
    }) {
        const url = this._baseApiUrl + '/api/v1/people';
        return await axios.get(url, this.config(params));
    }

    /**
     * Get single person information
     * 
     * @param {integer} id 
     */
    async getPerson(id) {
        const url = this._baseApiUrl + '/api/v1/people/' + id;
        return await axios.get(url, this.config());
    }

    /**
     * Update person
     * 
     * @param {interget} id 
     * @param {json} data 
     */
    async updatePerson(id, data) {
        const url = this._baseApiUrl + '/api/v1/people/' + id;
        return await axios.put(url, data, this.config());
    }

    /**
     * Create person
     * 
     * @param {json} data 
     */
    async createPerson(data) {
        const url = this._baseApiUrl + '/api/v1/people';
        return await axios.post(url, data, this.config());
    }

    /**
     * Delete person
     * 
     * @param {integer} id 
     */
    async deletePerson(id) {
        const url = this._baseApiUrl + '/api/v1/people/' + id;
        return await axios.delete(url, this.config());
    }

    /**
     * Return rqquest config
     * 
     * @param {json} params 
     */
    config(params = {}) {
        return {
            params: this.parameters(params),
            headers: this._headers
        }
    }

    /**
     * Return parameters
     * 
     * @param {json} params 
     */
    parameters(params) {
        params.access_token = config.access_token;
        return params;
    }
}

export default new Service;