import { Snowflake } from '@theinternetfolks/snowflake';
import Community from '../community/community.schema.js';
import Role from '../role/role.schema.js';
import Member from './member.schema.js';
import User from '../user/user.schema.js'

export default class MemberRepository{

    async addMember(c_id,u_id,r_id,o_id){



        const communityFound = await Community.findOne({_id:c_id});

        if(!communityFound){
            return{
                "status":false,
                "message":"Community not found."
            }
        }

        const roleFound = await Role.findById(r_id);
        if(!roleFound){
            return{
                "status":false,
                "message":"Role not found."
            }
        }

        const userFound = await User.findById(u_id);
        if(!userFound){
            return{
                "status":false,
                "message":"User not found."
            }
        }

        const authorized = await Community.findOne({_id:c_id,owner:o_id});

        if(!authorized){
            return{
                "status":false,
                "message":"You are not authorized to perform this action."
            }
        }



        const existingMember = await Member.findOne({community:c_id,user:u_id});

        if(existingMember){
            return {
                "status":false,
                "message":"User is already added in the community."
            }
        }


        let newMember = (await Member.create({
            _id:Snowflake.generate(Date.now()),
            community:c_id,
            user:u_id,
            role:r_id
        })).toObject();

        delete newMember["__v"];
        newMember["id"] = newMember["_id"];
        delete newMember["_id"];

        console.log(newMember);

        return {
            "status":true,
            "member" : newMember
        }
    }

    async deleteMember(m_id,userId){

        const memberFound = await Member.findById(m_id);

        if(!memberFound){

            return{
                "status":false,
                "message":"Member not found."
            }

        }

        const c_id = memberFound.community;

        const userIsMember = await Member.findOne({community:c_id,user:userId}).populate("role");

        if(userIsMember && (userIsMember.role.name=="Community Admin" || userIsMember.role.name=="Community Moderator")){

            await Member.findByIdAndDelete(m_id);
            return {
                "status":true
            }
        }else{

            return {
                "status":false,
                "message":"You are not authorized to perform this action."
            }
        }
    }

}