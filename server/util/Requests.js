import got from 'got';

class Requests {
    static async get(url, responseType = 'json', headers = null) {
        try {
            const response = await got.get(url, {
                ...(headers),
                responseType
            });
            return response && response.body;
        } catch (error) {
            return error.response;
        }
    }

    static async post(url, jsonData, responseType = 'json', headers = null) {
        try {
            const response = await got.post(url, {
                jsonData,
                ...(headers),
                responseType
            });
            return response && response.body;
        } catch (error) {
            return error.response;
        }
    }

    static async put(url, jsonData, responseType = 'json', headers = null) {
        try {
            const response = await got.put(url, {
                jsonData,
                ...(headers),
                responseType
            });
            return response && response.body;
        } catch (error) {
            return error.response;
        }
    }

    static async delete(url, responseType = 'json', headers = null) {
        try {
            const response = await got.delete(url, {
                ...(headers),
                responseType
            });
            return response && response.body;
        } catch (error) {
            return error.response;
        }
    }
}

export default Requests;
