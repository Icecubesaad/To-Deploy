const sellerModel = require("../models/seller");

const getSellerInformation = async (req,res) => {
  try {
    const { id } = req.params;
    console.log('from seller',id)
    const seller = await sellerModel.findOne({ _id: id });
    if (seller) {
      res.status(200).json({ data: seller, success: true });
    }
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
};
const updateSeller = async (req, res) => {
  const {
    name,
    logo,
    address,
    mobileNo,
    experience,
    details,
    banner,
    established,
    numberOfEmployees,
    natureOfBusiness,
    legalStatus,
    annualTurnover,
    workingDays,
    website,
    country,
    googleId
  } = req.body;

  try {
    // Find the seller by their Google ID and update the fields
    console.log('updating seller',req.body)
    const updatedSeller = await sellerModel.findOneAndUpdate(
      { googleId }, // Find by googleId
      {
        $set: {
          name,
          logo,
          address,
          mobileNo,
          experience,
          details,
          banner,
          established,
          numberOfEmployees,
          natureOfBusiness,
          legalStatus,
          annualTurnover,
          workingDays,
          website,
          country
        }
      },
      { new: true } // Return the updated document
    );

    if (updatedSeller) {
      console.log(updatedSeller)
      res.status(200).json({ message: "Seller data updated successfully", updatedSeller,success:true });
    } else {
      res.status(404).json({ message: "Seller not found" ,success:false});
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating seller data", error,success:false });
  }
};
module.exports = {
    getSellerInformation,
    updateSeller
}
