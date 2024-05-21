export function get_blog(req,res){

}

export function create_blog(req,res){

    try{
        const {title,content,image} = req.body
        if(!title){
            throw new Error('Title not found');
        }
        if(!content){
            throw new Error('Content not found');
        }
        return res.status(ApiResponseCode.CREATED)
            .json(new api_response(true, ApiResponseCode.CREATED, 'User login Successfully', token))
    }catch(error){
        return res.status(ApiResponseCode.BAD_REQUEST)
        .json(new api_response(false, ApiResponseCode.BAD_REQUEST, error.message))
    }
}

export function update_blog(req,res){
    //console.log("update_blog");
}