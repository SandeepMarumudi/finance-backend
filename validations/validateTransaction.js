const validateTransaction=(data)=>{
    const {amount,title,date,category}=data
 if (amount === undefined || amount === null) {
    throw new Error("Amount is required");
  } else if (typeof amount !== "number") {
    throw new Error("Amount must be a number");
  }

  if (!title || title.trim().length === 0) {
    throw new Error("Title is required");
  }

  if (!category || category.trim().length === 0) {
    throw new Error("Category is required");
  }

}
module.exports=validateTransaction