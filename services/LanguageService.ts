import axios from "axios";

class LanguageService {

    public async getAll() {

        console.log("call")
        const result = await axios.get('/api/language')
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }

    public async delete(id:Number) {

        console.log("call")
        const result = await axios.delete("/api/language?id=" + id)
        .then(i=>i.data)
        .catch(e=> {throw e})
        
        return result;
    }

    public async saveOrUpdate(data:any) {
        
        console.log("call")
        const result = await axios.post("/api/language" ,{
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