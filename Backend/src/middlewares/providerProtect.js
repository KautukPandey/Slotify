import Provider from "../models/provider.model.js"

export const providerProtect = async (req, res, next) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ message: "Providers only" })
    }
    const provider = await Provider.findOne({ user: req.user._id })
    if (!provider) {
      return res.status(403).json({ message: "Complete your provider profile first" })
    }
    req.provider = provider
    next()
    
  } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Couldn't verify provider's ID"})

  }
}