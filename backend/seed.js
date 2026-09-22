require("dotenv").config()

const mongoose = require("mongoose")

const categoryModel = require("./models/Category")
const productModel = require("./models/Product")

const seedProducts = require("./seedProducts.json")

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/snepdeal"


const run = async () => {

    try {

        await mongoose.connect(MONGO_URI)

        console.log("MongoDB connected for seeding")


        const categoryNames = [...new Set(seedProducts.map(p => p.categoryName))]

        const categoryMap = {}

        for (const name of categoryNames) {

            let category = await categoryModel.findOne({ name })

            if (!category) {

                category = await categoryModel.create({ name })

                console.log("Category created:", name)

            }

            categoryMap[name] = category._id

        }


        let created = 0
        let skipped = 0

        for (const p of seedProducts) {

            const exists = await productModel.findOne({ name: p.name })

            if (exists) {

                skipped++
                continue

            }

            await productModel.create({

                name: p.name,
                description: p.description,
                price: p.price,
                discountPrice: p.discountPrice,
                image: p.image,
                category: categoryMap[p.categoryName],
                stock: p.stock,
                brand: p.brand,
                rating: p.rating,
                reviews: p.reviews

            })

            created++

        }

        console.log(`Seeding done. Products created: ${created}, skipped (already existed): ${skipped}`)

        process.exit(0)

    } catch (error) {

        console.error("Seeding failed:", error.message)

        process.exit(1)

    }

}

run()
