const Company = require("../models/post");
const jwt = require("jsonwebtoken");

module.exports.getPosts = async (req,res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getPost = async (req,res) => {
    try {
        const comp = await Company.findOne({cid:req.params.id});
        res.status(200).json(comp);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports.addPost = async (req,res) => {

    const compfind = await Company.findOne({cid: req.body.cid});
    try {
        if(compfind){
          res.status(404).json("Esta Compañia ya existe");
          
        } else{
  
          const comp = new Company({
            name: req.body.name,
            connection_string: req.body.connection_string,
            picture: req.body.picture,
            created_at: req.body.created_at,
            cid: req.body.cid
          });
  
          const insertedcomp = await comp.save();
          res.status(201).json(insertedcomp);
          
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }

}
module.exports.deletePost = async (req,res) => {

    try {
        const deletedcomp = await Company.deleteOne({cid: req.params.id});
        res.status(200).json(deletedcomp);
    } catch (error) {
        res.status(400).json({message: error.message});
    }

}

module.exports.updatePost = async (req, res) => {
    try {
        const updatedcomp = await Company.updateOne({cid:req.params.id}, {$set: req.body});
        res.status(200).json(updatedcomp);
    } catch (error) {
        res.status(400).json({message: error.message});
    }

}