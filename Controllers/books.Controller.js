export const addNewBookInDBController = async (req, res)=>{
  const {bookName, bookTitle, publisher, author, description, categories, publicationDate, ISBN, price,       availableCopies, isFree, pages} = res.body;
    try {
        
    } catch (error) {
      console.log("There is some errors in your getAllBooksController controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your getAllBooksController controller plz fix the bug first ", error});
    }
}
export const showOneBookController = async (req, res)=>{
    try {
        
    } catch (error) {
      console.log("There is some errors in your showOneBookController controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your showOneBookController controller plz fix the bug first ", error});
    }
}
export const getAllBooksController = async (req, res)=>{
    try {
        
    } catch (error) {
      console.log("There is some errors in your addNewBookInDBController controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your addNewBookInDBController controller plz fix the bug first ", error});
    }
}
export const bookInfoUpdateController = async (req, res)=>{
    try {
        
    } catch (error) {
      console.log("There is some errors in your bookInfoUpdateController controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your bookInfoUpdateController controller plz fix the bug first ", error});
    }
}
export const bookDeleteController = async (req, res)=>{
    try {
        
    } catch (error) {
      console.log("There is some errors in your bookDeleteController controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your bookDeleteController controller plz fix the bug first ", error});
    }
}