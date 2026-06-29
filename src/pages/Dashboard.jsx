import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
// import FilterModal from "../components/FilterModal";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../api/userService";

import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import FilterModal from "../components/FilterModal";
import AddUser from "../components/AddUser";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showAddUser, setShowAddUser] =
  useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();

      const transformed = res.data.map((u) => ({
        id: u.id,
        firstName: u.name.split(" ")[0],
        lastName: u.name.split(" ")[1] || "",
        email: u.email,
        department: "IT"
      }));

      setUsers(transformed);
    } catch {
      alert("Failed to fetch users");
    }
  };

  const saveUser = async (user) => {
  try {
    const response =
      await createUser(user);

    setUsers([
      ...users,
      {
        ...user,
        id:
          response.data?.id ||
          Date.now()
      }
    ]);

    setShowAddUser(false);

  } catch (error) {
    console.log(error);
    alert("Save failed");
  }
};

  const removeUser = async (id) => {
    try {
      await deleteUser(id);

      setUsers(
        users.filter((u) => u.id !== id)
      );
    } catch {
      alert("Delete failed");
    }
  };

  const sortUsers = (field) => {
    setUsers(
      [...users].sort((a, b) =>
        a[field].localeCompare(b[field])
      )
    );
  };

  const filtered = users
    .filter((u) =>
      Object.values(u)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter(
      (u) =>
        u.firstName
          .toLowerCase()
          .includes(filters.firstName.toLowerCase()) &&
        u.lastName
          .toLowerCase()
          .includes(filters.lastName.toLowerCase()) &&
        u.email
          .toLowerCase()
          .includes(filters.email.toLowerCase()) &&
        u.department
          .toLowerCase()
          .includes(filters.department.toLowerCase())
    );

   return (
  <>
    <Navbar />

    <div className="container">

      {showAddUser ? (
        <AddUser
          onSave={saveUser}
          onCancel={() =>
            setShowAddUser(false)
          }
        />
      ) : (
        <>
          <h1>User Dashboard</h1>

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <button
            onClick={() =>
              setShowModal(true)
            }
          >
            Filters
          </button>

          <button
            onClick={() =>
              setShowAddUser(true)
            }
          >
            Add User
          </button>

          <Pagination
            pageSize={pageSize}
            setPageSize={setPageSize}
          />

          <UserTable
            users={filtered.slice(
              0,
              pageSize
            )}
            editUser={setSelectedUser}
            deleteUser={removeUser}
            sortUsers={sortUsers}
          />
        </>
      )}

      {showModal && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          close={() =>
            setShowModal(false)
          }
        />
      )}

    </div>
  </>
);
}

export default Dashboard;