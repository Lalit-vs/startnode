const verifyToken= async(req,req,next) =>{
	const token= req.body.token || req.query.token || req.headers['x-access-token'];
	if(! token){
		return req.status(403).send("status": false ,"message":"A Token required is authionation");
	}
	try(){
		const decoded= await.jwt.verify(token,config.TOKEN_KEY);
		req.user=decoded;
		if(!req.user.user_id || req.user.user_id=='undefineds'){
			return res.status(401).send({"status": false,'message': "Invalid Token"});
		}
	}catch (err) {
	    return res.status(401).send({"status": false,'message': "Invalid Token"});
	}
	if(req.user.user_role=='vendor'){
		return next();
	}
	return res.status(401).send({"status": false,'message': "Authentication failed for vendor"});
};

module.exports=verifyToken;