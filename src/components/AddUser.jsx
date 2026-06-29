import UserForm from "./UserForm";

function AddUser({ onSave, onCancel }) {
  return (
    <div className="container">
      <h2>Add User</h2>

      <UserForm
        selectedUser={null}
        onSave={onSave}
        onCancel={onCancel}
      />
    </div>
  );
}

export default AddUser;