function UserTable({
  users,
  editUser,
  deleteUser,
  sortUsers
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>

          <th
            onClick={() =>
              sortUsers(
                "firstName"
              )
            }
          >
            First Name
          </th>

          <th>Last Name</th>

          <th>Email</th>

          <th>Department</th>

          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.firstName}</td>
            <td>{u.lastName}</td>
            <td>{u.email}</td>
            <td>{u.department}</td>

            <td>
              <button
                onClick={() =>
                  editUser(u)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteUser(u.id)
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;