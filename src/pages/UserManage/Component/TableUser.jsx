import React, { useCallback, useEffect, useState } from "react";
import BtnGredient from "../../../layout/components/BtnGredient";
import {
  UserRoundPlus,
  X,
  Save,
  UserCheck,
  UserX,
  Trash2,
  SquarePen,
  EditIcon,
  ArrowDownToLine,
  UserCog,
} from "lucide-react";
import Modal from "../../../layout/components/Modal";
import toast, { Toaster } from "react-hot-toast";
import api from "../../../api/axios";
import { useAuth } from "../../../context/AuthProvider";

function TableUser() {
  const { userInfor } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const roles = ["SUPER_ADMIN", "ADMIN", "USER"];

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/user");
      // Filter out the current user by email
      const allUsers = response.data;
      const otherUsers = allUsers.filter(
        (user) => user.email !== userInfor.email,
      );
      setUsers(otherUsers);
      setFilteredUsers(otherUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("បរាជ័យក្នុងការទាញយកទិន្នន័យអ្នកប្រើប្រាស់");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfor?.email) {
      fetchUsers();
    }
  }, [userInfor?.email]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.username?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query),
    );
    setFilteredUsers(filtered);
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
    setNewRole("");
  };

  const handleChangeRole = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const response = await api.put("/user/change-role", {
        email: selectedUser.email,
        role: newRole,
      });

      // Handle 200, 201, 202 status codes and check for text response
      const isSuccess =
        [200, 201, 202].includes(response.status) ||
        response.data === "Update successful";

      if (isSuccess) {
        toast.success(
          `ប្តូរតួនាទីអ្នកប្រើប្រាស់ ${selectedUser.username} ជោគជ័យ`,
        );
        handleCloseModal();
        fetchUsers();
      } else {
        toast.error("បរាជ័យក្នុងការប្តូរតួនាទី");
      }
    } catch (error) {
      console.error("Error changing role:", error);
      toast.error("មានបញ្ហាក្នុងការប្តូរតួនាទី");
    }
  };

  if (loading && users.length === 0)
    return (
      <main className="flex justify-center items-center w-full h-full space-y-5">
        <span className="loading loading-dots text-accent loading-lg"></span>
        <Toaster position="bottom-center" />
      </main>
    );

  return (
    <>
      <div className="w-full h-full text-accent bg-secondary rounded-[20px] p-5 font-noto space-y-5 ">
        <div className="header flex justify-between items-center">
          <p className="text-accent font-semibold">
            គ្រប់គ្រងអ្នកប្រើប្រាស់ក្នុងប្រព័ន្ធ
          </p>
          <div className="button-container flex flex-col md:flex-row gap-2">
            <label className="input input-bordered w-[250px] md:w-full flex items-center gap-2">
              <input
                type="text"
                className="w-full"
                placeholder="ស្វែងរកឈ្មោះ ឬ អ៊ីមែល"
                value={searchQuery}
                onChange={handleSearch}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-8 w-8 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>

        <div className="table-container w-full h-[90%] overflow-auto scrollbar-hide">
          <table className="table">
            <thead>
              <tr className="text-accent text-[15px] sticky top-0 bg-secondary">
                <th>ឈ្មោះអ្នកប្រើ</th>
                <th>អ៊ីមែល</th>
                <th>តួនាទី</th>
                <th className="text-center">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={index}
                  className="text-[15px] hover:bg-primary cursor-pointer active:bg-primary text-accent"
                >
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "SUPER_ADMIN"
                          ? "bg-red-500/10 text-red-500"
                          : user.role === "ADMIN"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-green-500/10 text-green-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="text-blue-500 hover:scale-110 transition-transform p-2"
                      onClick={() => handleOpenEditModal(user)}
                    >
                      <UserCog size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-10 opacity-50">
                    មិនមានអ្នកប្រើប្រាស់ត្រូវនឹងការស្វែងរក
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Toaster position="bottom-center" />
      </div>

      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <form
          onSubmit={handleChangeRole}
          className="container text-accent w-full h-full space-y-5 font-noto"
        >
          <div className="header-modal flex justify-between">
            <div className="radio-container flex items-center space-x-3">
              <UserCog className="text-accent" />
              <p className="text-lg font-semibold">
                កែប្រែតួនាទីអ្នកប្រើប្រាស់
              </p>
            </div>
            <button
              type="button"
              onClick={handleCloseModal}
              className="btnClose w-[40px] h-[40px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
            >
              <X />
            </button>
          </div>

          <div className="modal-form space-y-4">
            <div className="p-4 bg-primary rounded-xl">
              <div className="flex flex-col space-y-1">
                <span className="text-sm opacity-70">អ្នកប្រើប្រាស់</span>
                <span className="font-semibold">{selectedUser?.username}</span>
              </div>
              <div className="flex flex-col space-y-1 mt-2">
                <span className="text-sm opacity-70">អ៊ីមែល</span>
                <span className="text-sm">{selectedUser?.email}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                ជ្រើសរើសតួនាទីថ្មី
              </label>
              <select
                id="role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="select select-bordered bg-secondary w-full"
                required
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-full rounded-[10px] border-none shadow-lg bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] text-secondary font-bold hover:shadow-xl transition-all ease-in-out duration-300"
          >
            <Save size={18} />
            រក្សាទុក
          </button>
        </form>
      </Modal>
    </>
  );
}

export default TableUser;
