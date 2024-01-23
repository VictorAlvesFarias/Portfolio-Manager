import { uri } from "@/env";
import axios, { AxiosHeaders } from "axios";
import Cookies from "js-cookie";

class LanguageService {

    private headers: AxiosHeaders
    private cookie: any

    constructor() {
        this.headers = new AxiosHeaders()
        this.cookie = Cookies.get("auth")
        this.headers.set("auth", this.cookie)
    }

    public async getAll() {
        
        const result = await axios.get(uri + '/api/language',)
            .then(i => {
                console.log(i)
                return i.data
            })
            .catch(e => { throw e })

        return result;
    }

    public async delete(id: Number) {

        const result = await axios.delete(uri + "/api/language?id=" + id,
            {
                headers: this.headers
            })
            .then(i => i.data)
            .catch(e => { throw e })

        return result;
    }

    public async saveOrUpdate(data: any) {

        const result = await axios.post(uri + "/api/language", {
            name: data.name,
            order: data.order,
            src: data.src
        },
            {
                headers: this.headers
            })
            .then(i => i.data)
            .catch(e => { throw e })

        return result;
    }
}

export default LanguageService