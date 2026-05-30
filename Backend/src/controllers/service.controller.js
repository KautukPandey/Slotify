import Service from "../models/service.model.js";

export const createService = async(req,res)=>{
    try {
        let {name,description,price,duration} = req.body

        if(!name || !description || !price || !duration){
            return res.status(400).json({message:"Fields cannot be empty"})
        }

        name = name.trim().toLowerCase()
        description = description.trim()

        if (price <= 0 || duration <= 0) {
            return res.status(400).json({
                message: "Price and duration must be greater than 0"
            })
        }

        const existingService = await Service.findOne({
            name,
            provider: req.provider._id
        })

        if (existingService) {
            return res.status(409).json({
                message: "Service already exists"
            })
        }

        const service = await Service.create({
            name,
            description,
            price,
            duration,
            provider: req.provider._id
        })

        return res.status(201).json({message:"Service created",service})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error while creating service"})
    }
}

export const getAllServices = async(req,res)=>{
    try {
         const services = await Service.find({isActive:true})
                    .sort({createdAt:-1})
                    .select("name description price duration")

        return res.status(200).json({
            message:"All services fetched",
            services,
            count: services.length
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error while fetching all services"})
    }
}