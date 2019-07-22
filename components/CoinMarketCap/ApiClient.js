import { API_KEY, BASE_URI, API_VERSION } from 'react-native-dotenv';
import axios from 'axios';
import { coins } from './coins';

// Handler for the API so components aren't directly interacting with
// CMC API. 
class ApiClient {
    constructor() {
        this.versionedUri = `${BASE_URI}/${API_VERSION}`;
        this.cache = [];
    }

    logVersionedUri = () => {
        console.log(this.versionedUri);
    }

    // Function that makes an api call to CMC to retrieve crypto data
    getCryptoData = async () => {
        const uri = `${this.versionedUri}/cryptocurrency/listings/latest?limit=10&convert=USD`;
        const config = { 'X-CMC_PRO_API_KEY': API_KEY };
        // Disable / enable this line to either fetch local data or make an api call
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