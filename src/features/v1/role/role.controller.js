import RoleRepository from "./role.repository.js";

export default class RoleController {

    constructor() {

        this.roleRepositiory = new RoleRepository();
    }

    async addRole(req, res) {

        try{
            const { name } = req.body;

            if (name.length < 2) {
    
                return res.status(200).send({
                    "status": false,
                    "errors": [
                        {
                            "param": "name",
                            "message": "Name should be at least 2 characters.",
                            "code": "INVALID_INPUT"
                        }
                    ]
                });
            } else {
    
                const newRole = await this.roleRepositiory.addRole(name);
    
                return res.status(200).send({
                    "status": true,
                    "content": {
                        "data": {
                            "id": newRole._id,
                            "name": newRole.name,
                            "created_at": newRole.createdAt,
                            "updated_at": newRole.updatedAt
                        }
                    }
                });
            }

        }catch(err){
            console.log(err);
            return res.status(500).send("something went wrong");
        }
    }

    async getRoles(req, res) {

        try {

            let roles = await this.roleRepositiory.getRoles();

            const total = roles.length;
            const pages = parseInt(total / 10) + (total % 10 != 0 ? 1 : 0);
            const currPage = 1;                            //specific page not requested in request (so setting currPage to 1)

            roles = roles.map((r) => {
                let newRole = {};
                newRole.id = r._id;
                newRole.name = r.name;
                newRole.createAt = r.createdAt;
                newRole.updatedAt = r.updatedAt;
                return newRole;

            })

            return res.status(200).send({

                "status": true,
                "content": {
                    "meta": {
                        "total": total,
                        "pages": pages,
                        "page": currPage
                    },
                    "data": roles
                }
            });

        } catch (err) {
            console.log(err);
            return res.status(500).send("something went wrong");
        }
    }
}