import React, { useState } from "react";
import Modal from "../../../layout/components/Modal";
import BtnGredient from "../../Book/BtnGredient";
import { X } from "lucide-react";
import axios from "../../../api/axios";
import toast from "react-hot-toast";

const ModalDeleteCollege = ({
  isModalVisible,
  handleCloseModal,
  fetchcollege,
  entry,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!entry) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDeleting) return;

    setIsDeleting(true);

    try {
      await axios.delete(`/college/${entry.collegeId}`);

      toast.success(`បានលុបមហាវិទ្យាល័យ ${entry.collegeName} ដោយជោគជ័យ!!!`, {
        style: { fontFamily: "NotoSansKhmer-Regular, sans-serif" },
      });

      try {
        await fetchcollege?.();
      } catch (refreshErr) {
        console.log("fetchcollege failed:", refreshErr);
      }

      handleCloseModal();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "មិនអាចលុបបានទេ!!!";

      toast.error(message, {
        style: { fontFamily: "NotoSansKhmer-Regular, sans-serif" },
      });

      console.log(error.response || error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
      <div className="container w-full h-full space-y-5">
        <div className="header-modal flex items-center justify-between">
          <label className="font-noto font-semibold text-lg">
            លុបមហាវិទ្យាល័យ
          </label>

          <button
            type="button"
            onClick={handleCloseModal}
            className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
          >
            <X />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container w-full h-full space-y-5">
          <div className="flex">
            <div className="w-full mr-1">
              <div className="w-full font-noto text-xl">
                តើអ្នកពិតជាចង់លុបមហាវិទ្យាល័យ​ {entry.collegeName} មែនដែរឬទេ?
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 content-center pt-5 pb-5">
          <BtnGredient
            type="submit"
            disabled={isDeleting}
            className="rounded-"
            color={"from-[#ff0000] to-[#fe8383]"}
            hover={"from-[#fe8383] to-[#ff0000]"}
          >
            <label className="text-xl font-noto">
              {isDeleting ? "កំពុងលុប..." : "បាទ/ចា៎ស"}
            </label>
          </BtnGredient>
        </div>
      </form>
    </Modal>
  );
};

export default ModalDeleteCollege;
