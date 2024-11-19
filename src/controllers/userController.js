
export const signUp = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(`User controller error:`, error);
        if(error.statusCode){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
            })
        }
    }
}