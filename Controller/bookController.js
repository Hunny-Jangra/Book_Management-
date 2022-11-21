const { default: mongoose } = require('mongoose');
const { update } = require('../Models/bookModels');
const Book_Model = require('../Models/bookModels');
const UserModel = require('../Models/userModels');
const AppError = require('../utils/appError');

function handleDuplicate(msg){
    const value = msg.match(/(["'])(\\?.)*\1/);
    const message = `Duplicate field value ${value}. ! Please use another value`;
    console.log(message);
    return new AppError(message, 400);
}

var createBooks;
exports.createBook = async(req, res) => {
    try{
        let data = req.body;
        let {title, excerpt, userId, ISBN, category, subcategory, releasedAt} = data;

        
        if(Object.keys(data).length == 0) {
            return res.status(400).send({
                status:false,
                message: "Data is Required to add a User"
            })
        }

        if(!title) {
           return res.status(400).send({status: false,message: "Book title is Required"});
        }

        if(!excerpt) {
           return res.status(400).send({status: false,message: "Book excerpt is Required"});
        }

        if(!userId) {
           return res.status(400).send({status: false,message: "inBookModel userID is Required"});
        }

        if(!ISBN) {
           return res.status(400).send({status: false,message: "Book ISBN number is Required"});
        }

        if(!title) {
           return res.status(400).send({status: false,message: "Book titie is Required"});
        }
        
        if(!category) {
           return  res.status(400).send({status: false,message: "Book category is Required"});
        }

        if(!subcategory) {
           return  res.status(400).send({status: false,message: "Book subcategory is Required"});
        }

        

        if(!releasedAt) {
           return  res.status(400).send({status: false,message: "releaedAt is Required"});
        }

        const checkBookInDB = await Book_Model.findOne({ISBN});
        if(checkBookInDB) {
           return res.status(400).send({
                status: true,
                message: "This Book is Alredy Exists"
            })
        }
        const checkUserID = await UserModel.findOne({userId})
        if(!checkUserID){
           return res.status(400).send({
                status: true,
                message: "This user of this Book is not Exists"
            })
        }
         createBooks = await Book_Model.create(data)

        console.log(createBooks.title);

        return res.status(201).send({
            status: true,
            message: 'Success',
            data: {
                createBooks
            }
            
        })

        
    }catch(error) {
        if(error.code == 11000){
            const value = error.keyValue.title;
             const message = `Duplicate field value >> ${value} << .! Please use another value`;
             return res.status(400).send({
                status: false,
                message
             })
        }
        return res.status(400).send({
            status: false,
            message
         })
    }
}

exports.getbookData = async(req, res) => {
    try{

        let data1 = req.query;
    
        let userId = data1.userId;
        let category = data1.category;
        let subcategory = data1.subcategory;

        if(userId == "") {
            return res.status(400).send({
                status: false,
                message: "UserId cannot be empty ! Please enter some value or Data"
            })
        }else if(category == "") {
            return res.status(400).send({
                status: false,
                message: "Category cannot be empty ! Please enter some value or Data"
            })
        }else if(subcategory == ""){
            return res.status(400).send({
                status: false,
                message: "Subcategory cannot be empty ! Please enter some value or Data"
            })
        }
       
    
        if(userId || category || subcategory){
    
            if(userId) {
                    var data = await Book_Model.find({userId: req.query.userId}).select({title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1});
                    /////////// Calling function ////////////
                    data = data.sort(compareTitle);
            }else if(category) {
                var data = await Book_Model.find({category: req.query.category}).select({title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1});
                ///////////// calling function /////////////
                data = data.sort(compareTitle);
            }else if(subcategory){
                var data = await Book_Model.find({subcategory: req.query.subcategory}).select({title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1});
                ///////////// calling function /////////////
                data = data.sort(compareTitle);

            }
        }
        else{
            let data = await Book_Model.find(data1).select({title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1})
            
            
           data = data.sort(compareTitle);

            return res.status(200).send({
                status: true,
                message: "Books List",
                data
            })
        }
        
        ///// This function sort the document according to the Title ///////////

        function compareTitle(a, b) {
            var titleA = a.title.toUpperCase();
            var titleB = b.title.toUpperCase();

            var comparison = 0;
            if(titleA > titleB) {
                comparison  = 1;
            }else{
                comparison = -1;
            }

            return comparison;
       }
       /////////////////////////////////////////////////////////////////////////

        
    
       if(data) {
        return res.status(200).send({
            status: true,
            message: "Books list",
            data
        })
       }
    }catch(error) {
        return res.status(400).send({
            status: false,
            message: error.message
        })
    }

}

exports.getBookById = async(req, res) => {
    const getbookId = req.params.bookId;
    if(!getbookId) {
        return res.status(400).send({
            status: false,
            message: "Plese provide path parameter as a BookID"
        })
    }
    const data = await Book_Model.find({_id: getbookId});

    if(!data) {
        return res.status(400).send({
            status: false,
            message: "please provide a valid BookId"
        })
    }else{
        return res.status(200).send({
            status: true,
            message: "Books list",
            data
        })
    }



}



exports.updateBookData = async(req, res) => {
    try{

        let bookId = req.params.bookId;
        let data_body = req.body;
        let {title, excerpt, release_date, ISBN} = data_body;

        let bookDATA = {};
        bookDATA.id = bookId;
        bookDATA.isDeleted = false;

        const data_of_Books = await Book_Model.findOne(bookDATA);
            console.log(data_of_Books); 

       
    
        if(!title){
            return res
                .status(400)
                .send({status: false, message: "for Updation Title is must! Please Provide title"});
        }
    
        if(!excerpt){
            return res
                .status(400)
                .send({status: false, message: "for Updation excerpt is must! Please Provide excerpt"});
        }
    
        if(!release_date){
            return res
                .status(400)
                .send({status: false, message: "for Updation release_date is must! Please Provide release_date"});
        }
    
        if(!ISBN){
            return res
                .status(400)
                .send({status: false, message: "for Updation ISBN is must! Please Provide ISBN"});
        }
    
        const fortitle_and_forISBN = await Book_Model.find({_id: bookId});
        // console.log(fortitle_and_forISBN.ISBN !== data_body.ISBN);
        let fortitle = fortitle_and_forISBN.title === data_body.title;
        if(fortitle){
            return res.status(400).send({
                status: false,
                message: "title is unique Entity ! Please provide {UNIQUE_Value} as title"
            })
        }
        let forISBN = fortitle_and_forISBN.ISBN === data_body.ISBN;
        if(forISBN){
            return res.status(400).send({
                status: false,
                message: "ISBN is unique Entity ! Please provide {UNIQUE_Value} as ISBN"
            })
        }
    
        //update values
      
        let updateFiledsdata = await Book_Model.findByIdAndUpdate({_id: bookId}, {$set: {title: title, excerpt: excerpt, releasedAt: release_date, ISBN: ISBN}}, {new: true});
 
 
        if(!updateFiledsdata){
            return res
                .status(404)
                .send({
                    status: false,
                    message: "Book_Id is not Defiend ! Please Provide a valid {BOOK_Id}"
                })
        }
    
        return res.status(200).send({
            status: true,
            message: "Blog list",
            data: {
                updateFiledsdata
            }
        })
    }catch(error) {
        return res.status(400).send({
            status: false,
            message: error.message
        })
    }



}

exports.deleteBookData = async(req, res) => {
    try{

        let bookId = req.params.bookId;
        let bookdata = {};
        bookdata.id = bookId;
        bookdata.isDeleted = false;
    
        const checkValidBookID = await Book_Model.findOne({bookdata})
        if(!mongoose.Types.ObjectId.isValid(checkValidBookID)){
            return res.status(404).send({
                status: false,
                mmessge: "Bookid is not valid"
            })
        }
        if(checkValidBookID.id !== bookId) {
            return res.status(404).send({
                status: false,
                mmessge: "Bookid is not Exists"
            })
        }else{
            await Book_Model.deleteOne(checkValidBookID);
            res.status(200).send({
                status: true,
                message: "Succesfully Deleted Data...."
            })
        }

    }catch(error) {
        return res.status(400).send({
            status: false,
            message: error.message
        })
    }

}

