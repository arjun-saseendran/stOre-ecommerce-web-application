
export const catchErrorHandler = () =>{
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
}