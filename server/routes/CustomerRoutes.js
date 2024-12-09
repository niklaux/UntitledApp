const express = require("express");
const router = express.Router();
const { Company, Users_Companies, User } = require("../models");

// Create a customer transaction
router.post("/", async (req, res) => {
  try {
    const { name, website, about, country, users, licensesUsed } = req.body;

    // Create the company
    const company = await Company.create({ name, website, about, country });

    // Associate users with the company if provided
    if (users && users.length > 0) {
      const userAssociations = users.map((userId) => ({
        company_id: company.id,
        user_id: userId,  // Use the correct user ID from the payload
        licenses_used: licensesUsed || 0,
      }));
      await Users_Companies.bulkCreate(userAssociations);
    }

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all customers
// router.get("/", async (req, res) => {
//   try {
//     const companies = await Company.findAll({ include: "users" }); // Adjust the "include" based on your associations
//     res.status(200).json(companies);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Get all companies
router.get("/", async (req, res) => {
  try {
    // Fetch companies and include the associated users
    const companies = await Company.findAll({
      include: {
        model: User,  // Include the associated User model
        attributes: ["name"],  // Only include the "name" field of the user
        through: {
          attributes: []  // Exclude the join table attributes (Users_Companies)
        }
      }
    });

    // Format the response to include user names as a list
    const formattedCompanies = companies.map(company => {
      const userNames = company.Users.map(user => user.name); // Extract user names
      return {
        ...company.toJSON(),
        userNames  // Add the user names as a new field in the response
      };
    });

    res.status(200).json(formattedCompanies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update a customer transaction
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, website, about, country } = req.body;

    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    await company.update({ name, website, about, country });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a customer transaction
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    await company.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
