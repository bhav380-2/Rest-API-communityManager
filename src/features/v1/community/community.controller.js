import CommunityRepository from "./community.repository.js";

export default class CommunityController {
    constructor() {

        this.communityRepository = new CommunityRepository();

    }

    updateKeys(data, keys) {

        data = data.map((d) => {
            d = d.toObject();
            d = { id: d._id, ...d };
            delete d._id;

            for (let i = 0; i < keys.length; i++) {
                d[keys[i]] = { id: d[keys[i]]._id, ...d[keys[i]] };
                delete d[keys[i]]._id;
            }

            // d.owner = { id: d.owner._id, ...d.owner };
            // delete d.owner._id;
            return d;
        })

        return data;

    }

    async addCommunity(req, res) {

        try {

            const { name } = req.body;
            const slug = name.toLowerCase();

            if (name.length < 2) {

                return res.status(400).send({
                    "status": false,
                    "errors": [
                        {
                            "param": "name",
                            "message": "Name should be at least 2 characters.",
                            "code": "INVALID_INPUT"
                        }
                    ]
                })
            }

            console.log(req.userId);

            let community = (await this.communityRepository.addCommunity(name, slug, req.userId)).toObject();

            community = { id: community._id, ...community };

            delete community._id;
            delete community.__v;

            return res.status(200).send({
                "status": true,
                "content": {
                    "data": community
                }
            })


        } catch (err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    async getCommunities(req, res) {

        try {

            let data = await this.communityRepository.getCommunities();
            data = this.updateKeys(data, ['owner']);
            // console.log(data);

            const total = data.length;
            const pages = parseInt(total / 10) + (total % 10 != 0 ? 1 : 0);
            const currPage = 1;

            return res.status(200).send({
                "status": true,
                "content": {
                    "meta": {
                        "total": total,
                        "pages": pages,
                        "page": currPage
                    },
                    "data": data
                }
            })

        } catch (err) {
            console.log(err);
            return res.status(500).send("Something went wrong");
        }
    }

    async getCommunityMembers(req, res) {

        try{

            const c_id = req.params.id;

            let members = await this.communityRepository.getCommunityMembers(c_id);
    
            members = this.updateKeys(members, ['user', 'role']);
    
            const total = parseInt(members.length);
            const pages = parseInt(total / 10) + (total % 10 != 0 ? 1 : 0);
            const currPage = 1;
            // console.log(members);
    
            return res.status(200).send({
    
                "status": true,
                "content": {
                    "meta": {
                        "total": total,
                        "pages": pages,
                        "page": currPage
                    },
                    "data": members
                }
            })

        }catch(err){
            console.log(err);
            return res.status(500).send("something went wrong");
        }
    }

    async getMyOwnedCommunities(req, res) {

        try {
            const ownerId = req.userId;
            const currPage = 1;
            // console.log(req.userId);

            let result = await this.communityRepository.getMyOwnedCommunities(ownerId, currPage);

            let total = result['totalCount'];
            let ownedCommunities = result['ownedCommunities'];
            ownedCommunities = this.updateKeys(ownedCommunities, []);

            const pages = parseInt(total / 10) + (total % 10 != 0 ? 1 : 0);

            return res.status(200).send({

                "status": true,
                "content": {
                    "meta": {
                        "total": total,
                        "pages": pages,
                        "page": currPage
                    },
                    "data": ownedCommunities
                }
            })

        } catch (err) {
            console.log(err);
            return res.status(500).send("something went wrong");
        }
    }


    async getMemberCommunities(req, res) {

        try {

            const userId = req.userId;

            const currPage = 1;
            const result = await this.communityRepository.getMemberCommunities(userId, currPage);
            // console.log(result['memberList'])

            const total = result['totalCount'];
            const pages = parseInt(total / 10) + (total % 10 != 0 ? 1 : 0);

            let communities = result['memberList'].map((c) => {
                return c.community;
            })

            communities = this.updateKeys(communities, ['owner']);
            // console.log(communities);

            return res.status(200).send({
                "status": true,
                "content": {
                    "meta": {
                        "total": total,
                        "pages": pages,
                        "page": currPage
                    },
                    "data": communities
                }
            })

        } catch (err) {
            console.log(err);
            return res.status(500).send("something went wrong");
        }

    }
}