import React, { useState, useEffect, useRef } from "react";
import Modal from "../../../layout/components/Modal";
import BtnGredient from "../../Book/BtnGredient";
import { X } from "lucide-react";
import axios from "../../../api/axios";
import toast from "react-hot-toast";

const ModalAddMajor = ({ isModalVisible, handleCloseModal, fetchmajor }) => {
  const [collegedata, setcollegedata] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // optional: prevent setState when component unmounts
  const mountedRef = useRef(true);

  const [formData, setFormData] = useState({
    majorId: "",
    majorName: "",
    collegeId: "",
  });

  useEffect(() => {
    mountedRef.current = true;

    const loadCollege = async () => {
      try {
        const res = await axios.get("/college");
        if (!mountedRef.current) return;
        setcollegedata(res.data);
      } catch (err) {
        console.log(err.response || err);
        toast.error("មិនអាចទាញយកទិន្នន័យមហាវិទ្យាល័យបានទេ!", {
          style: { fontFamily: "NotoSansKhmer-Regular, sans-serif" },
        });
      }
    };

    loadCollege();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const submissionData = { ...formData };

    setIsSubmitting(true);

    try {
      await axios.post("/major", submissionData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("បានបញ្ចូលជំនាញដោយជោគជ័យ!!!", {
        style: { fontFamily: "NotoSansKhmer-Regular, sans-serif" },
      });

      // reset form
      setFormData({
        majorId: "",
        majorName: "",
        collegeId: "",
      });

      try {
        await fetchmajor?.();
      } catch (refreshErr) {
        console.log("fetchmajor failed:", refreshErr);
        // optional toast for refresh only:
        // toast.error("បញ្ចូលបាន តែ refresh list មិនបាន!", { style: { fontFamily: "NotoSansKhmer-Regular, sans-serif" } });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "មិនអាចបញ្ចូលបានទេ!!!";

      toast.error(message, {
        style: { fontFamily: "NotoSansKhmer-Regular, sans-serif" },
      });

      console.log(error.response || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
      <div className="container w-full h-full space-y-5">
        <div className="header-modal flex items-center justify-between">
          <label className="font-noto font-semibold text-lg">
            បន្ថែមជំនាញថ្មី
          </label>

          <button
            onClick={handleCloseModal}
            className="btnClose w-[46px] h-[46px] bg-secondary flex items-center justify-center rounded-xl hover:opacity-50 transition-all duration-300 ease-in-out"
            type="button"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="container w-full h-full space-y-5">
            <div className="flex mt-5">
              <div className="w-full mr-1">
                <div className="w-full font-noto font-semibold">
                  លេខជំនាញ​ :
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full bg-secondary font-noto"
                  name="majorId"
                  value={formData.majorId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mr-1 w-full">
                <div className="font-noto font-semibold">មហាវិទ្យាល័យ :</div>
                <select
                  name="collegeId"
                  value={formData.collegeId}
                  onChange={handleChange}
                  required
                  className="select select-bordered w-full font-noto bg-secondary"
                >
                  <option disabled value="">
                    ជ្រើសរើសមហាវិទ្យាល័យ
                  </option>

                  {collegedata.map((c) => (
                    <option key={c.collegeId} value={c.collegeId}>
                      {c.collegeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex">
              <div className="w-full mr-1">
                <div className="w-full font-noto font-semibold">
                  ឈ្មោះជំនាញ :
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full bg-secondary font-noto"
                  name="majorName"
                  value={formData.majorName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 content-center pt-5 pb-5">
            <BtnGredient
              type="submit"
              disabled={isSubmitting}
              className="rounded-"
              color={"from-[#00d0ffb1] to-[#E7FBFF]"}
              hover={"from-[#00D9FF] to-[#a5cef3]"}
            >
              <label className="text-xl font-noto">
                {isSubmitting ? "កំពុងបញ្ចូល..." : "បញ្ចូល"}
              </label>
            </BtnGredient>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalAddMajor;
