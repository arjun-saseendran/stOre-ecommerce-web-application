import {Review} from '../models/review.model.js'
import {Product} from '../models/product.model.js'


const reviewIncrement = async() => {
    try {

        const reviewProduct = await Product.findById(req.param.id)
            



        
    } catch (error) {
        
    }
}