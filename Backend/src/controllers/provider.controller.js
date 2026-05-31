import Provider from "../models/provider.model.js";

export const createProfile = async(req,res) => {
    try {
        let {businessName,city,description} = req.body
        if(!businessName || !city || !description){
            return res.status(400).json({message:"Fields cannot be empty"})
        }

        city = city.trim().toLowerCase()
        description = description.trim()


        const existingProvider = await Provider.findOne({user:req.user._id})
        if(existingProvider){
            return res.status(400).json({message:"Provider Profile already exists"})
        }

        const provider = await Provider.create({
            businessName,
            city,
            description,
            user: req.user._id
        })

        return res.status(201).json({
            message:"Provider profile created",
            provider
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error while creating provider profile"})
    }
}

export const getProviders = async(req,res) => {
    try {
        let {city} = req.query
        const filter = {}
        if(city){
            filter.city = city
        }

        const providers = await Provider.find(filter)

        return res.status(200).json({
            message: "List of providers",
            providers
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error while fetching provider(s)"})
    }
}

export const getProviderById = async(req,res) => {
    try {
        const {id} = req.params

        const provider = await Provider.findById(id)
        if(!provider){
            return res.status(404).json({message:"Provider doesn't exists"})
        }

        return res.status(200).json({
            message: "Provider profile",
            provider
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error while fetching provider"})
    }
}

export const getMyProviderProfile = async(req,res) => {
    try {
       return res.status(200).json({
        message: "Fetched Provider Profile",
        provider: req.provider
       })     
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error while Fetching my profile"})
    }
}