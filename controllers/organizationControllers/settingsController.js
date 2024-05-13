const db = require("../../config/db");
const { v4: uuidv4, validate: isValidUUID } = require('uuid');
require('dotenv').config()
const Organization=db.Organization
const OrganizationMedia=db.OrganizationMedia
const Media=db.SocialMedia

const handleNewOrganization = async (req, res) => {
    var { name,acronym,header_color,footer_color,background_color,copyright_text,media} = req.body;
    // media=media.split(',')
    console.log(req.body)
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
      return res.status(200).json(organization);
    }catch (error) {
      console.error(error);
      return res.status(500).json({ "message": "Server error" });
    }
  }
  module.exports={handleNewOrganization,handleNewSocialMedia,handleGetAllSocialMedia,handleGetOrganization}