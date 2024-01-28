import MemberRepository from "./member.repository.js";


const error = (message) => {

    let err = [];

    if (message == "Role not found.") {
        err.push([
            {
                "param": "role",
                "message": "Role not found.",
                "code": "RESOURCE_NOT_FOUND"
            }
        ])


    } else if (message == "User is already added in the community.") {
        err.push({
            "message": "User is already added in the community.",
            "code": "RESOURCE_EXISTS"
        })

    } else if (message == "Community not found.") {
        err.push({
            "param": "community",
            "message": "Community not found.",
            "code": "RESOURCE_NOT_FOUND"
        })

    } else if (message == "User not found.") {

        err.push({
            "param": "user",
            "message": "User not found.",
            "code": "RESOURCE_NOT_FOUND"
        })

    }else if(message=="Member not found."){
        err.push({
            "param":"member",
            "message":"Member not found",
            "code":"RESOURCE_NOT_FOUND"
        })

    }else if (message == "You are not authorized to perform this action.") {

        err.push({
            "message": "You are not authorized to perform this action.",
            "code": "NOT_ALLOWED_ACCESS"
        })
    }

    return err;
}

export default class MemberController {
    constructor() {
        this.memberRepository = new MemberRepository();
    }

    async addMember(req, res) {

        try {
            const { community, user, role } = req.body;
            const result = await this.memberRepository.addMember(community, user, role, req.userId);
            console.log(result);

            if (result["status"]) {

                return res.status(200).send({
                    "status": true,
                    "content": {
                        "data": result["member"]
                    }
                })

            }else{

                return res.status(400).send({
                    "status": false,
                    "errors": error(result["message"])
                })
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send("something went wrong");
        }
    }

    async deleteMember(req,res){

        try{
            const memberId = req.params.id;
            console.log(memberId);

            const result = await this.memberRepository.deleteMember(memberId,req.userId);

            if(result['status']){

                return res.status(200).send({
                    "status":true
                })

            }else{

                return res.status(400).send({
                    "status":false,
                    "errors":error(result['message'])
                })
            }

        }catch(err){
            return res.status(500).send("something went wrong");
        }
    }
}