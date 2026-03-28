import axios from 'axios';

const MATCH_URL = 'http://localhost:9595/lostfound/match';

// Save Match Item
export const saveMatchItem = (matchItem) => {
    return axios.post(MATCH_URL, matchItem, {
        withCredentials: true
    });
}

// Get All Match Items
export const getAllMatchItems = () => {
    return axios.get(MATCH_URL, {
        withCredentials: true
    });
}