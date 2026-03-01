import React, { useCallback, useEffect, useState } from "react";
import BtnGredient from "../../../layout/components/BtnGredient";
import {
  Search,
  MoreVertical,
  UserPlus,
  X,
  Save,
  UserCog,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import Modal from "../../../layout/components/Modal";
import toast, { Toaster } from "react-hot-toast";
import useCRUDUser from "../Hook/useCRUDUser";

function TableUser() {
  const { users, loading, registerUser, changeUserRole } = useCRUDUser();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [isAgreeToCreate, setIsAgreeToCreate] = useState(false);
  // Registration state
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const roles = ["SUPER_ADMIN", "ADMIN", "USER"];
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    const passwordLength = 12;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    setRegistrationData((prev) => ({ ...prev, password }));
    setShowPassword(true);
    toast.success("លេខសម្ងាត់ត្រូវបានបង្កើតដោយស្វ័យប្រវត្តិ");
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

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

  const handleOpenRoleModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsRoleModalVisible(true);
  };

  const handleCloseRoleModal = () => {
    setIsRoleModalVisible(false);
    setSelectedUser(null);
    setNewRole("");
  };

  const handleOpenAddModal = () => {
    setRegistrationData({
      username: "",
      email: "",
      password: "",
    });
    setShowPassword(false);
    setIsAddModalVisible(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalVisible(false);
    setIsAgreeToCreate(false);
  };

  const handleChangeRoleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const response = await changeUserRole(selectedUser.email, newRole);

      const isSuccess =
        [200, 201, 202].includes(response.status) ||
        response.data === "Update successful";

      if (isSuccess) {
        toast.success(
          `ប្តូរតួនាទីអ្នកប្រើប្រាស់ ${selectedUser.username} ជោគជ័យ`,
        );
        handleCloseRoleModal();
      } else {
        toast.error("បរាជ័យក្នុងការប្តូរតួនាទី");
      }
    } catch (error) {
      toast.error("មានបញ្ហាក្នុងការប្តូរតួនាទី");
    }
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(registrationData);
      const isSuccess =
        [200, 201, 202].includes(response.status) ||
        response.data === "Register successful" ||
        typeof response.data === "object"; // Handle direct object return if any

      if (isSuccess) {
        toast.success(
          `ចុះឈ្មោះអ្នកប្រើប្រាស់ ${registrationData.username} ជោគជ័យ`,
        );
        handleCloseAddModal();
      } else {
        toast.error("បរាជ័យក្នុងការចុះឈ្មោះ");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "មានបញ្ហាក្នុងការចុះឈ្មោះ");
    }
  };

  const handleRegistrationInputChange = (e) => {
    const { id, value } = e.target;
    setRegistrationData((prev) => ({ ...prev, [id]: value }));
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
      <div className="w-full h-full flex flex-col text-accent bg-secondary rounded-[20px] p-5 font-noto space-y-5 ">
        <div className="header flex justify-start gap-5 md:justify-between items-center ">
          <p className="text-accent font-semibold">
            គ្រប់គ្រងអ្នកប្រើប្រាស់ក្នុងប្រព័ន្ធ
          </p>

          <div className="button-container flex items-center gap-2">
            {/* Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <BtnGredient onClick={handleOpenAddModal}>
                <UserPlus size={20} />
                <p>បន្ថែមអ្នកប្រើប្រាស់</p>
              </BtnGredient>

              <label className="input input-bordered w-[260px] flex items-center gap-2">
                <Search size={18} className="opacity-70" />
                <input
                  type="text"
                  className="w-full"
                  placeholder="ស្វែងរកឈ្មោះ ឬ អ៊ីមែល"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </label>
            </div>

            {/* Mobile Dropdown */}
            <div className="dropdown md:hidden relative">
              <label
                tabIndex={0}
                className="btn btn-sm text-accent border-none"
              >
                <MoreVertical size={18} />
              </label>

              <div
                tabIndex={0}
                className="
      dropdown-content
      absolute left-1/2 -translate-x-1/2
      mt-2
      z-[+1]
      p-2
      shadow
      bg-base-100
      rounded-box
      w-64
      space-y-2
    "
              >
                <button
                  className="btn btn-sm w-full justify-start text-accent"
                  onClick={handleOpenAddModal}
                >
                  <UserPlus size={18} />
                  បន្ថែមអ្នកប្រើប្រាស់
                </button>

                <label className="input input-bordered input-sm w-full flex items-center gap-2">
                  <Search size={16} className="opacity-70" />
                  <input
                    type="text"
                    className="w-full"
                    placeholder="ស្វែងរក..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="table-container w-full h-full overflow-auto scrollbar-hide">
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
                          ? "bg-red-500/10 text-blue-500"
                          : user.role === "ADMIN"
                            ? "bg-blue-500/10 text-yellow-500"
                            : "bg-green-500/10 text-green-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="text-blue-500 hover:scale-110 transition-transform p-2"
                      onClick={() => handleOpenRoleModal(user)}
                    >
                      <UserCog size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-10 opacity-50">
                    ការស្វែងរកមិនមានលទ្ធផល
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Toaster position="bottom-center" />
      </div>

      {/* Register User Modal */}
      <Modal isVisible={isAddModalVisible} onClose={handleCloseAddModal}>
        <form
          onSubmit={handleAddUserSubmit}
          className="container text-accent w-full h-full space-y-5 font-noto"
        >
          <div className="header-modal flex justify-between">
            <div className="radio-container flex items-center space-x-3">
              <UserPlus className="text-accent" />
              <p className="text-lg font-semibold">
                ចុះឈ្មោះអ្នកប្រើប្រាស់ថ្មី
              </p>
            </div>
            <button
              type="button"
              onClick={handleCloseAddModal}
              className="btnClose w-[40px] h-[40px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
            >
              <X />
            </button>
          </div>

          <div className="modal-form space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">ឈ្មោះអ្នកប្រើ*</label>
              <label className="input input-bordered flex items-center gap-2 bg-secondary">
                <User size={18} className="opacity-50" />
                <input
                  id="username"
                  type="text"
                  className="grow"
                  placeholder="Username"
                  required
                  value={registrationData.username}
                  onChange={handleRegistrationInputChange}
                  minLength={3}
                />
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">អ៊ីមែល*</label>
              <label className="input input-bordered flex items-center gap-2 bg-secondary">
                <Mail size={18} className="opacity-50" />
                <input
                  id="email"
                  type="email"
                  className="grow"
                  placeholder="name@example.com"
                  required
                  value={registrationData.email}
                  onChange={handleRegistrationInputChange}
                />
              </label>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">លេខសម្ងាត់*</label>
                <button
                  type="button"
                  onClick={generatePassword}
                  className="text-xs flex items-center gap-1 text-blue-500 hover:underline"
                >
                  <RefreshCw size={12} />
                  បង្កើតលេខសម្ងាត់
                </button>
              </div>
              <label className="input input-bordered flex items-center gap-2 bg-secondary relative">
                <Lock size={18} className="opacity-50" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="grow pr-10"
                  placeholder="••••••••"
                  required
                  value={registrationData.password}
                  onChange={handleRegistrationInputChange}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 opacity-50 hover:opacity-100 transition-opacity"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={(e) => setIsAgreeToCreate(e.target.checked)}
                  className="checkbox checkbox-xs checkbox-warning"
                />
                <span className="text-xs text-yellow-500">
                  សូមចំណាំ សូមរក្សាពាក្យសម្ងាត់ទុក មុនពេលបង្កើត គណនីថ្មី
                  បន្ទាប់ពីបង្កើតគណនីថ្មី លេខសម្ងាត់និងមិនបង្ហាញពេលក្រោយទៀតទេ
                </span>
              </div>
            </div>
          </div>
          {isAgreeToCreate && (
            <button
              type="submit"
              disabled={loading}
              className="btn w-full rounded-[10px] border-none shadow-lg bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] text-secondary font-bold hover:shadow-xl transition-all ease-in-out duration-300 disabled:opacity-50"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <Save size={18} />
              )}
              ចុះឈ្មោះ
            </button>
          )}
        </form>
      </Modal>

      {/* Role Change Modal */}
      <Modal isVisible={isRoleModalVisible} onClose={handleCloseRoleModal}>
        <form
          onSubmit={handleChangeRoleSubmit}
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
              onClick={handleCloseRoleModal}
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
            disabled={loading}
            className="btn w-full rounded-[10px] border-none shadow-lg bg-gradient-to-r from-[#00D1FF] to-[#E7FBFF] text-secondary font-bold hover:shadow-xl transition-all ease-in-out duration-300"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <Save size={18} />
            )}
            រក្សាទុក
          </button>
        </form>
      </Modal>
    </>
  );
}

export default TableUser;
