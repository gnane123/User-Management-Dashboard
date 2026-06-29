import { useState, useEffect } from "react";

function UserForm({
  selectedUser,
  onSave,
  onCancel
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setForm(selectedUser);
    }
  }, [selectedUser]);

  const validate = () => {
    let err = {};

    if (!form.firstName.trim())
      err.firstName = "Required";

    if (!form.lastName.trim())
      err.lastName = "Required";

    if (!form.department.trim())
      err.department = "Required";

    if (
      !/\S+@\S+\.\S+/.test(form.email)
    )
      err.email = "Invalid Email";

    setErrors(err);

    return Object.keys(err).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSave(form);
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="First Name"
        value={form.firstName}
        onChange={(e) =>
          setForm({
            ...form,
            firstName: e.target.value
          })
        }
      />

      <span>{errors.firstName}</span>

      <input
        placeholder="Last Name"
        value={form.lastName}
        onChange={(e) =>
          setForm({
            ...form,
            lastName: e.target.value
          })
        }
      />

      <span>{errors.lastName}</span>

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value
          })
        }
      />

      <span>{errors.email}</span>

      <input
        placeholder="Department"
        value={form.department}
        onChange={(e) =>
          setForm({
            ...form,
            department: e.target.value
          })
        }
      />

      <span>{errors.department}</span>

      <button type="submit">
        Save
      </button>

      <button
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}

export default UserForm;