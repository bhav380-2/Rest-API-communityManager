import Community from '../features/v1/community/community.schema.js';

const authorized = async (req,res,next)=>{

    const {community} = req.body;

    const isFound = await Community.findOne({_id:community,owner:req.userId});

    if(!isFound){
        return res.status({
            "status": false,
            "errors": [
              {
                "message": "You are not authorized to perform this action.",
                "code": "NOT_ALLOWED_ACCESS"
              }
            ]
        })
    }

    next();
}

export default authorized;