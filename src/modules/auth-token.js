import axios from 'axios'

export default function(addressUrl) {
    return axios.get(addressUrl)
}