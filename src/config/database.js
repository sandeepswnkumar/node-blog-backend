import mongoose from 'mongoose';

const connect_db = async () =>{
    try{
        const connction = await mongoose.connect(process.env.DB_HOST+process.env.DB_NAME);
        console.log("DB Connected")
    }catch(error){
        console.log("DB error",error)
    }
}

export default connect_db;
