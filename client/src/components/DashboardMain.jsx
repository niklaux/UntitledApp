import React, { useState, useEffect } from "react";
import { Tab, Tabs, Typography } from "@mui/material";
import CommonButton from "./CommonButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CustomerModal from "./CustomerModal";
import {
  createCustomer,
  deleteCustomer,
  fetchCustomers,
  updateCustomer,
} from "../helpers/CustomerApis";
import OverviewContent from "./OverviewContent";
import CustomerTable from "./CustomerTable";

function DashboardMain() {
  const [value, setValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const customersData = await fetchCustomers();
        // Ensure every customer has a 'users' array
        setCustomers(customersData.map(customer => ({
          ...customer,
          users: customer.users || [], // Default to an empty array if 'users' is undefined
          licensesUsed: customer.licensesUsed || 0, // Default licensesUsed to 0
        })));
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    loadCustomers();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleModalOpen = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (customerData) => {
    try {
      if (selectedCustomer) {
        const updatedCustomer = await updateCustomer(
          selectedCustomer.id,
          customerData
        );
        setCustomers(
          customers.map((customer) =>
            customer.id === updatedCustomer.id ? updatedCustomer : customer
          )
        );
      } else {
        const newCustomer = await createCustomer(customerData);
        setCustomers([...customers, newCustomer]);
      }
      handleModalClose();
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      setCustomers(customers.filter((customer) => customer.id !== customerId));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="p-3 pt-4 m-0">
      <div className="d-flex justify-content-between">
        <h4 className="fw-semibold">Customers</h4>
        <CommonButton
          label={
            <>
              <ControlPointIcon /> Add Customer
            </>
          }
          onClick={handleModalOpen}
        />
      </div>

      <Tabs
        className="border-bottom"
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Overview" />
        <Tab label="Table" disabled />
        <Tab label="List view" disabled />
        <Tab label="Segment" disabled />
        <Tab label="Custom" disabled />
      </Tabs>

      <div className="mt-2">{value === 0 && <OverviewContent />}</div>

      <CustomerModal
        open={isModalOpen}
        handleClose={handleModalClose}
        handleSave={handleSave}
        initialData={selectedCustomer}
      />

      {/* Use the CustomerTable component here */}
      <Typography variant="h6">Customer List</Typography>
      <CustomerTable
        customers={customers}
        onEdit={(customer) => {
          setSelectedCustomer(customer);
          handleModalOpen();
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default DashboardMain;
