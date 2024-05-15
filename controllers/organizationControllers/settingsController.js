const db = require("../../config/db");
const { v4: uuidv4, validate: isValidUUID } = require('uuid');
const user_role = require("../../models/user_role");
const User=db.User
const UserRole=db.user_role
require('dotenv').config()
const Organization=db.Organization
const OrganizationMedia=db.OrganizationMedia
const Media=db.SocialMedia

const handleNewOrganization = async (req, res) => {
  console.log("organization body ...",req.body)
    var { name,acronym,header_color,footer_color,background_color,copyright_text,media} = req.body;
    // media=media.split(',')
    console.log("organization body ...",req.body)
    if (!name ) {
      return res.status(400).json({ "message": "Please provide required organization information" });
    }
    const uuid=uuidv4()
    try {
      const existingOrganization = await Organization.findAll();
      if (existingOrganization.length>0) {
        // return res.status(409).json({ "message": "organization already exists" });
      }
      //This creates organization
      const organization = await Organization.create({
        organization_id: uuid,
        name,
        logo:req.files.logo[0].filename,
        // acronym,
        // background:req.files.background[0].filename,
        // header_color,
        // footer_color,
        // background_color,
        // copyright_text
      })
      //This creates organizationMedias
      // for(let i=0; i<media.length; i++){
      //   console.log("media===",media[i])
      //   const organizationMedia=await OrganizationMedia.create({
      //     organization_media_id:uuidv4(),
      //     organization_id:uuid,
      //     media_id:media[i][0],
      //     URL:media[i][1]
      //   })
      // }
      return res.status(201).json({ "message": "New organization created", "project": "organization" });
    } catch (error) {
        try{
          await OrganizationMedia.destroy({where:{organization_id:uuid}})
          await Organization.destroy({where:{organization_id:uuid}})
        }catch(error){
          console.log("organization info deleted")
          return res.status(501).json({ "message": "error creating organization occurred" });
        }
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  };
  const handleNewSocialMedia=async (req,res)=>{
    const {name}=req.body
    console.log(req.body)
    try{
      if (!name) {
        return res.status(400).json({ "message": "Please provide required media name" });
      }
      const existingMedia = await Media.findOne({ where: { name } });
      if (existingMedia) {
        return res.status(409).json({ "message": "social media already exists" });
      }
      console.log(existingMedia)
      const media=await Media.create({
        media_id: uuidv4(),
        name
      });
      return res.status(201).json({"message":"new media added"})
    }catch(error){
      return res.status(500).json({"message":"server error"})
    }
  }
  const handleUpdateOrganization = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    // const name=req.body.organization_name
    const leader_id=req.body.leader_id
  
    console.log(req.body)
  
    try {
      // const organization = await Organization.findOne({where:{organization_id:id}});
      // if (!organization) {
      //   return res.status(404).json({ message: "Organization not found" });
      // }
      
      // await organization.update({leader_id });
      const supervisor=await UserRole.findOne({where:{role_id:process.env.ORGANIZATION_ADMIN}})
      if(supervisor){
        await supervisor.update({user_id:leader_id})
      }else{
        await UserRole.create({
          user_role_id:uuidv4(),
          role_id:process.env.ORGANIZATION_ADMIN,
          user_id:leader_id
        })
      }
      return res.status(200).json({supervisor, message: "Organization updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  const handleGetAllSocialMedia=async(req,res)=>{
    try {
      const medias = await Media.findAll();
      return res.status(200).json(medias);
    }catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  }
  const handleGetOrganization=async(req,res)=>{
    try {
      const organization = await Organization.findAll();
      const leader=await UserRole.findOne({where:{role_id:process.env.ORGANIZATION_ADMIN},include:[{model:User,as:"UserRoleToUser"}]})
      return res.status(200).json({organization,leader});
    }catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  }
  module.exports={handleNewOrganization,handleNewSocialMedia,handleGetAllSocialMedia,handleGetOrganization,handleUpdateOrganization}