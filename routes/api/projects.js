// const express=require('express');
// const router=express.Router();
// const multer=require('multer')
// const documentTypeController = require('../../controllers/ProjectControllers/documentType.js')
// const documentController=require('../../controllers/ProjectControllers/document.js')
// const projectController=require('../../controllers/ProjectControllers/projectController.js');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       console.log('calling destination...')
//       cb(null, './public/documents/')
//     },
//     filename: function (req, file, cb) {
//       console.log(file.originalname)
//       cb(null, (new Date()).getTime()+file.originalname)
//     }
//   })
// var upload = multer({ storage: storage })
// //  document type routes
// router.route('/documentType/add') 
//    .post(documentTypeController.handleNewDocumentType) 
// router.route('/documentType/getAll')
//     .get(documentTypeController.handleGetAllDocumentTypes)
// router.route('/documentType/get/:id')
//     .get(documentTypeController.handleGetDocumentTypeById)
// router.route('/documentType/update/:id')
//     .put(documentTypeController.handleUpdateDocumentType)
// router.route('/documentType/delete/:id')
//     .delete(documentTypeController.handleDeleteDocumentType)

// router.route('/project/add')
//     .post(upload.array("document",5),projectController.handleNewProject)
// router.route('/getAll')
//     .get(projectController.handleGetAllProjects)
// router.route('/get/:id')
//     .get(projectController.handleGetProjectById)
// module.exports=router;