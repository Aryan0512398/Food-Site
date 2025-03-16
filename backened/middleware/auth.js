import jwt from "jsonwebtoken"

const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({
            success:false,
            message:"Not authorized login again"
        })
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);

        req.body.userId=token_decode.id;
        next()
    } catch (error) {
        console.log(error)
        console.log("Bhai ji auth  error aa gya")
        res.json({
            success:false,message:"Bhai ji error aa gya"
        })
    }
}
export default authMiddleware