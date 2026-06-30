import Provider from "../models/provider.model.js";
import Review from "../models/review.model.js";

export const createProfile = async(req,res) => {
    try {
        let {businessName,city,description} = req.body

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
        let {city,search,page,limit,sort} = req.query

        sort = req.query.sort;

        let sortOption = { createdAt : -1 };
        if(sort==='name'){
            sortOption = {businessName : 1}
        }
        

        page = Number(req.query.page) || 1
        limit = Number(req.query.limit) || 9

        const skip = (page-1)*limit

        const filter = {}
        if(city){
            city = city.toLowerCase()
            filter.city = city
        }
        if(search){
            search = search?.trim()
            filter.businessName = {
                $regex: search,
                $options: "i"
            }
        }

        const totalProviders = await Provider.countDocuments(filter);

        const totalPages = Math.ceil(totalProviders / limit);
        
        const providers = await Provider.find(filter)
                                        .sort(sortOption)
                                        .skip(skip)
                                        .limit(limit)

        return res.status(200).json({
            message: "List of providers",
            page,
            limit,
            totalPages,
            totalProviders,
            providers,

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

        const reviews = await Review.find({
            provider: provider._id
        });

        const reviewCount = reviews.length;

        let totalRating = 0;

        for (const review of reviews) {
            totalRating += review.rating;
        }

        const averageRating =
            reviewCount > 0
                ? Number((totalRating / reviewCount).toFixed(1))
                : 0;

        return res.status(200).json({
            message: "Provider profile",
            provider,
            averageRating,
            reviewCount
        });


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