import dotenv from 'dotenv'
dotenv.config()

const development = {
    name: 'development',
    db: "community_engine",
    jwt_secret : 'community_engine',
    mongo_url : 'mongodb://127.0.0.1:27017/community_engine'
}


console.log("**********************");
console.log(process.env.JWT_SECRET);

const production = {
    name: 'production',
    db: process.env.DB,
    jwt_secret : process.env.JWT_SECRET,
    mongo_url : process.env.MONGO_URL
}

console.log(process.env.NODE_ENV);

export default eval(process.env.NODE_ENV)== undefined ? development : eval(process.env.NODE_ENV);