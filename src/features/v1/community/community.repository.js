import { Snowflake } from "@theinternetfolks/snowflake";
import Community from "./community.schema.js";
import Member from "../member/member.schema.js";
import Role from "../role/role.schema.js";


export default class CommunityRepository {

    async addCommunity(name, slug, userId) {

        try {
            const newCommuntiy = await Community.create({
                _id: Snowflake.generate(Date.now()),
                name: name,
                slug: slug,
                owner: userId
            });

            const adminRole = await Role.findOne({ name: 'Community Admin' });

            await Member.create({
                _id: Snowflake.generate(Date.now()),
                community: newCommuntiy._id,
                user: userId,
                role: adminRole._id
            })

            return newCommuntiy;

        } catch (err) {
            throw err;
        }
    }

    async getCommunities() {

        try {

            let data = await Community.find({}).populate({ path: 'owner', select: '_id name' }).select('-__v');
            return data;

        } catch (err) {
            throw err;
        }
    }

    async getCommunityMembers(c_id) {

        try {
            const members = await Member.find({ community: c_id }).populate({ path: 'user', select: '_id name' }).populate({ path: 'role', select: '_id name' }).select('-__v -updatedAt');
            return members;
        } catch (err) {
            throw err;
        }
    }

    async getMyOwnedCommunities(o_id, curr_page) {

        try {
            const ownedCommunities = await Community.find({ owner: o_id }).skip(curr_page > 0 ? (curr_page - 1) * 10 : 0).limit(10).select('-__v');
            const totalCount = await Community.find({ owner: o_id }).count();
            return { totalCount: totalCount, ownedCommunities: ownedCommunities };
        } catch (err) {
            throw err;
        }
    }

    async getMemberCommunities(userId, curr_page) {

        try {
            const memberRole = await Role.findOne({ name: 'Community Member' });

            const totalCount = await Member.find({ user: userId, role: memberRole._id }).count();
            const memberList = await Member.find({ user: userId, role: memberRole._id }).skip(curr_page > 0 ? (curr_page - 1) * 10 : 0).limit(10).select('community -_id').populate({ path: "community", select: '-__v', populate: { path: "owner", select: '_id name' } });
    
            return {
                totalCount: totalCount,
                memberList: memberList
            }
        } catch (err) {
            throw err;
        }
    }
}