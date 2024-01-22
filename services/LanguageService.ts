import { uri } from "@/env";
import axios from "axios";

class LanguageService {

    public async getAll() {

        const result = await axios.get(uri+'/api/language')
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }

    public async delete(id:Number) {

        const result = await axios.delete(uri+"/api/language?id=" + id)
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }

    public async saveOrUpdate(data:any) {
        
        const result = await axios.post(uri+"/api/language" ,{
            name: data.name,
            order: data.order,
            src: data.src
        })
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }
}

export default LanguageService