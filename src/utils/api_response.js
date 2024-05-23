
export default class api_response{
    constructor(success,status_code,message = "Opps! Something went wrong",data = [] ){
        this.success = success,
        this.status_code = status_code,
        this.message = message,
        this.data = data == null ? [] : data  
    }
}