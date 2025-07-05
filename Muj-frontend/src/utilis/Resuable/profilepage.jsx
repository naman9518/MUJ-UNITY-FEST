import { useState, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import Styles from "./profilepage.module.css";
import { CgProfile } from "react-icons/cg";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";

const ProfilePage = ({ onModalChange }) => {
  const { user, editProfile } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    phone2: "",
    email: "",
    universityEmail: "",
    course: "",
    batch: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (onModalChange) onModalChange(showModal);
  }, [showModal, onModalChange]);

  const openModal = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        phone2: user.phone2 || "",
        email: user.email || "",
        universityEmail: user.universityEmail || "",
        course: user.course.toUpperCase() || "",
        batch: user.batch || "",
        image: user.image || "",
      });
    }
    setErrors({});
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid personal email";
    }
    return newErrors;
  };

  const saveProfile = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const res = await editProfile(formData);
    if (res) {
      closeModal();
    }
  };

  return (
    <>
      <div className={Styles.profileIconContainer} onClick={openModal}>
        {user?.image ? (
          <img src={user.image} className={Styles.profileIconImage} alt="Profile" />
        ) : (
          <div className={Styles.profileIconInitials}>
            {user?.name ? user.name[0] : <CgProfile className={Styles.profileIconSvg} />}
          </div>
        )}
      </div>

      {showModal && (
        <div className={Styles.modalOverlay}>
          <div className={Styles.modalContent}>
            <div className={Styles.modalHeader}>
              <h2 className={Styles.modalTitle}>Edit Profile</h2>
              <button className={Styles.closeButton} onClick={closeModal}>
                <FiX size={24} />
              </button>
            </div>

            <div className={Styles.profileImageSection}>
              <div className={Styles.imageContainer}>
                {formData.image ? (
                  <img src={formData.image} className={Styles.profileImage} alt="Profile" />
                ) : (
                  <div className={Styles.defaultImage}>
                    <CgProfile size={60} />
                  </div>
                )}
              </div>
              <div className={Styles.imageActions}>
                <label className={Styles.imageActionButton}>
                  <FiEdit2 size={16} />
                  <span>Change</span>
                  <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                </label>
                {formData.image && (
                  <button className={`${Styles.imageActionButton} ${Styles.deleteButton}`} onClick={removeImage}>
                    <FiTrash2 size={16} />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>

            <div className={Styles.formSection}>
              <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
              <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
              <Input label="Alternate Number" name="phone2" value={formData.phone2} onChange={handleChange} />
              <Input
                label="Personal Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                label="University Mail"
                name="universityEmail"
                value={formData.universityEmail}
                readOnly
              />
              <Input label="Course" name="course" value={formData.course} onChange={handleChange} />
              <Input label="Batch" name="batch" value={formData.batch} onChange={handleChange} />
            </div>

            <div className={Styles.modalFooter}>
              <button className={Styles.cancelButton} onClick={closeModal}>Cancel</button>
              <button className={Styles.saveButton} onClick={saveProfile}>
                <FiCheck size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Input = ({ label, name, value, onChange, readOnly = false, error }) => (
  <div className={Styles.whole}>
    <div className={Styles.details}>{label}</div>
    <input
      className={`${Styles.inputs} ${readOnly ? Styles.grey : ""}`}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={label}
    />
    {error && <div style={{ color: "red", fontSize: "0.8rem", marginTop: "0.25rem" }}>{error}</div>}
  </div>
);

export default ProfilePage;
