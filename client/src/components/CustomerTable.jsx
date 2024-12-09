import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
  TableContainer,
  Paper,
  TablePagination, // Import TablePagination
} from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";

const CustomerTable = ({ customers, onEdit, onDelete }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0); // State for current page
  const [rowsPerPage, setRowsPerPage] = useState(7); // State for rows per page

  console.log(customers);

  // Sorting functions
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) =>
    order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  // Handle sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handle select all click
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(customers.map((customer) => customer.id));
    } else {
      setSelected([]);
    }
  };

  // Handle individual selection
  const handleClick = (event, customerId) => {
    const selectedIndex = selected.indexOf(customerId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, customerId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  // Determine if item is selected
  const isSelected = (customerId) => selected.indexOf(customerId) !== -1;

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      className="rounded-4 border shadow-sm"
    >
      <Table aria-labelledby="tableTitle">
        <TableHead style={{ backgroundColor: "#FAFAFA" }}>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                onChange={handleSelectAllClick}
                checked={selected.length === customers.length}
                inputProps={{
                  "aria-label": "select all customers",
                }}
              />
            </TableCell>
            <TableCell
              className="text-muted"
              sortDirection={orderBy === "name" ? order : false}
            >
              <TableSortLabel
                className="text-muted"
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={(event) => handleRequestSort(event, "name")}
              >
                Company
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "about" ? order : false}>
              <TableSortLabel
                className="text-muted"
                active={orderBy === "about"}
                direction={orderBy === "about" ? order : "asc"}
                onClick={(event) => handleRequestSort(event, "about")}
              >
                About
              </TableSortLabel>
            </TableCell>
            <TableCell className="text-muted">Users</TableCell>
            <TableCell className="text-muted">License Use</TableCell>
            <TableCell className="text-muted">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(customers, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((customer) => {
              const isItemSelected = isSelected(customer.id);
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={customer.id}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onClick={(event) => handleClick(event, customer.id)}
                    />
                  </TableCell>
                  {/* Updated Company Cell to show both name and website */}
                  <TableCell>
                    <div>
                      <strong>{customer.name}</strong>
                      <div style={{ fontSize: "0.875rem", color: "#888" }}>
                        {customer.website}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.about}</TableCell>
                  <TableCell>
                    {customer.userNames && customer.userNames.length > 0
                      ? customer.userNames.join(", ") // Join the user names if available
                      : "No users"}
                  </TableCell>
                  <TableCell>{customer.licensesUsed}</TableCell>
                  <TableCell>
                    <button
                      className="btn text-secondary"
                      onClick={() => onDelete(customer.id)}
                    >
                      <Trash2 />
                    </button>
                    <button
                      className="btn text-secondary"
                      onClick={() => onEdit(customer)}
                    >
                      <Pencil />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[7]}
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CustomerTable;
