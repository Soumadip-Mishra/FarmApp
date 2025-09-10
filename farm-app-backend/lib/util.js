import jwt from "jsonwebtoken";

export const generateToken = (id)=>{
    const token =  jwt.sign({id},process.env.JWT_SECRET,{expiresIn : "60D"});
    return token;
}

export const getPublicID = (folder , URL)=>{
    const splittedURL = URL.split('/');
    let resURL = folder;
    const idx = splittedURL.length-1;
    for (let i = 0 ;splittedURL[idx][i]!='.';i++){
        resURL+=splittedURL[idx][i];
    }
    
    return resURL;
}