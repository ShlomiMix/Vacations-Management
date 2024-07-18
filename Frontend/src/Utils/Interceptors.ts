import axios from "axios";

class Interceptors {
    // start listening with interceptors
    public listen(): void {
        // create interceptor for request
        axios.interceptors.request.use(request =>{
            // add token Authorization header
            request.headers.Authorization = "Bearer " + sessionStorage.getItem("token") // don't forget space of the word Bearer
            // return new request
            return request
        });
    }

}

export const interceptors = new Interceptors();