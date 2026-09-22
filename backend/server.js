require("dotenv").config()

const express=require('express')
const cors=require('cors')


const app=express()

const db=require('./config/db')

const authRoutes=require('./routes/authRoutes')

const categoryRoutes=require('./routes/categoryRoutes')

const productRoutes=require('./routes/productRoutes')
const cartRoutes=require('./routes/cartRoutes')
const wishlistRoutes=require('./routes/wishlistRoutes')
const orderRoutes=require('./routes/orderRoutes')
const paymentRoutes=require('./routes/paymentRoutes')

app.use(cors())
app.use(express.json())


app.use('/auth',authRoutes)

app.use('/category',categoryRoutes)
app.use('/product',productRoutes)
app.use('/cart',cartRoutes)
app.use('/wishlist',wishlistRoutes)
app.use('/order',orderRoutes)
app.use('/payment',paymentRoutes)


const PORT=process.env.PORT || 8095

app.listen(PORT,()=>{

    console.log("server is started on port "+PORT)

})