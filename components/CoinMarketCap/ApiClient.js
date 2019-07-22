import { API_KEY, BASE_URI, API_VERSION } from 'react-native-dotenv';
import axios from 'axios';
import { coins } from './coins';

class ApiClient {
    constructor() {
        this.versionedUri = `${BASE_URI}/${API_VERSION}`;
        this.cache = [];
    }

    logVersionedUri = () => {
        console.log(this.versionedUri);
    }

    getCryptoData = async () => {
        const uri = `${this.versionedUri}/cryptocurrency/listings/latest?limit=10&convert=USD`;
        const config = { 'X-CMC_PRO_API_KEY': API_KEY };
        return coins;
        try {
            const response = await axios.get(uri, { headers: config });
            console.log(response.data.data);
            return response.data.data;
            
        }
        catch (err) {
            return console.log(err);
        }
    }
}

export default ApiClient;