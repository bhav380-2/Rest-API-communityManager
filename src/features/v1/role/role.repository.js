import { Snowflake } from "@theinternetfolks/snowflake"
// import lodash from "lodash-contrib"
import _ from 'lodash';
import Role from "./role.schema.js"

export default class RoleRepository{

    async addRole(roleName){

        try{

            const newRole = await Role.create({
                _id : Snowflake.generate(Date.now()),
                name:roleName
            })
    
            return newRole;

        }catch(err){
            throw err;
        }
    }

    async getRoles(){

        try{

            let roles = await Role.find({}).select("-__v");
            return roles;

        }catch(err){
            throw err;
        }
    }
}