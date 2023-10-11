const multer = require("multer")

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "assets/")
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g,"a").replace(".","c") + "-item-" + file.originalname)
    }
})

const types = ["image/png","image/jpeg","image/jpg"]

const FileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else { cb(null, false) }
}

module.exports = multer({storage, FileFilter})