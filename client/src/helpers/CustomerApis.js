// Base URL for the API
const API_URL = "http://localhost:8000/api/customers";  // Adjust based on your API URL

// Function to fetch all customers
export const fetchCustomers = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

// Function to create a new customer
export const createCustomer = async (customerData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) {
      throw new Error("Failed to create customer");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

// Function to update an existing customer
export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await fetch(`${API_URL}/${customerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) {
      throw new Error("Failed to update customer");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

// Function to delete a customer
export const deleteCustomer = async (customerId) => {
  try {
    const response = await fetch(`${API_URL}/${customerId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete customer");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
