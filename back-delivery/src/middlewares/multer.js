import multer from "multer";
import path from "path"

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
    console.log(file.mimetype.includes("spreadsheetml"));
  } else {
    cb("Please upload only excel file.", false);
  }
};
//path.join(__dirname, 'files')

const storageExcel = multer.diskStorage({
  destination: path.join(__dirname, "../files/excel"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, 'public/uploads'),
//     filename: (req, file, cb) => {
//         cb(null, uuid() + path.extname(file.originalname));
//     }
// });
export const uploadExcel = multer({ storage: storageExcel, fileFilter: excelFilter });