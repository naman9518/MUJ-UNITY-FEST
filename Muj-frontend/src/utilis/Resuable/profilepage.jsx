// Update your ProfilePage.jsx with these changes

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext.jsx";
import { CgProfile } from "react-icons/cg";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import Styles from "./profilepage.module.css";

const ProfilePage = ({ onModalChange }) => { // Add onModalChange prop
  const emptyState = {
    fullname: { oldname: "", newname: "" },
    phoneNumber: { oldPhoneNumber: "", newPhoneNumber: "" },
    alternateNumber: { oldAlternateNumber: "", newAlternateNumber: "" },
    UniversityMail: { oldUniversityMail: "", newUniversityMail: "" },
    Course: { oldCourse: "", newCourse: "" },
    Batch: { oldBatch: "", newBatch: "" },
    image: { oldImage: "", newImage: "" },
  };

  const { isLoggedIn, user } = useAuth();
  const [value, setValue] = useState(() => {
    const storedProfile = localStorage.getItem("userProfile");
    return storedProfile ? JSON.parse(storedProfile) : emptyState;
  });
  const [tempValue, setTempValue] = useState(value);
  const [showModal, setShowModal] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [hasImage, setHasImage] = useState(!!value.image.oldImage);

  useEffect(() => {
    if (isLoggedIn && user?.email) {
      setValue((prev) => ({
        ...prev,
        UniversityMail: {
          oldUniversityMail: user.email,
          newUniversityMail: user.email,
        },
      }));
      setTempValue((prev) => ({
        ...prev,
        UniversityMail: {
          oldUniversityMail: user.email,
          newUniversityMail: user.email,
        },
      }));
    }
  }, [isLoggedIn, user]);

  // Notify parent component about modal state changes
  useEffect(() => {
    if (onModalChange) {
      onModalChange(showModal);
    }
  }, [showModal, onModalChange]);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setTempValue(value);
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const handleChange = (e) => {
    const { name, value: newValue } = e.target;
    const [mainKey, subKey] = name.split(".");
    setTempValue((prev) => ({
      ...prev,
      [mainKey]: { ...prev[mainKey], [subKey]: newValue },
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempValue((prev) => ({
          ...prev,
          image: { ...prev.image, newImage: reader.result },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setTempValue((prev) => ({
      ...prev,
      image: { oldImage: "", newImage: "" },
    }));
    setValue((prev) => ({
      ...prev,
      image: { oldImage: "", newImage: "" },
    }));
    setHasImage(false);
    localStorage.setItem(
      "userProfile",
      JSON.stringify({ ...value, image: { oldImage: "", newImage: "" } })
    );
  };

  const saveProfile = () => {
    const updated = {};
    for (let key in value) {
      if (key === "image") {
        updated.image = {
          oldImage: tempValue.image.newImage,
          newImage: tempValue.image.newImage,
        };
      } else {
        updated[key] = {
          old: tempValue[key][`new${Object.keys(tempValue[key])[1].slice(3)}`],
          ...tempValue[key],
        };
      }
    }
    setValue(updated);
    setUpdateSuccess(true);
    setShowModal(false);
    setHasImage(!!tempValue.image.newImage);
    document.body.style.overflow = "auto";
    localStorage.setItem("userProfile", JSON.stringify(updated));
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  const ProfileField = ({ label, name, subKey, readOnly = false }) => (
    <div className={Styles.whole}>
      <div className={Styles.details}>{label}</div>
      <input
        name={`${name}.${subKey}`}
        onChange={handleChange}
        value={tempValue[name][subKey]}
        className={`${Styles.inputs} ${readOnly ? Styles.grey : ""}`}
        placeholder={label}
        readOnly={readOnly}
      />
    </div>
  );

  return (
    <>
      <div className={Styles.profileIconContainer} onClick={openModal}>
        {hasImage ? (
          <img
            src={value.image.oldImage}
            className={Styles.profileIconImage}
            alt="Profile"
          />
        ) : (
          <div className={Styles.profileIconInitials}>
            {value.fullname.oldname ? (
              value.fullname.oldname
                .split(" ")
                .map((n) => n[0])
                .join("")
            ) : (
              <CgProfile className={Styles.profileIconSvg} />
            )}
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
                {tempValue.image.newImage ? (
                  <img
                    src={tempValue.image.newImage}
                    className={Styles.profileImage}
                    alt="Profile"
                  />
                ) : value.image.oldImage ? (
                  <img
                    src={value.image.oldImage}
                    className={Styles.profileImage}
                    alt="Profile"
                  />
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
                  <input
                    onChange={handleImageChange}
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                </label>
                {(tempValue.image.newImage || value.image.oldImage) && (
                  <button
                    className={`${Styles.imageActionButton} ${Styles.deleteButton}`}
                    onClick={removeProfileImage}
                  >
                    <FiTrash2 size={16} />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
            <div className={Styles.formSection}>
              <ProfileField label="Full Name" name="fullname" subKey="newname" />
              <ProfileField
                label="Phone Number"
                name="phoneNumber"
                subKey="newPhoneNumber"
              />
              <ProfileField
                label="Alternate Number"
                name="alternateNumber"
                subKey="newAlternateNumber"
              />
              <ProfileField
                label="University Mail"
                name="UniversityMail"
                subKey="newUniversityMail"
                readOnly={true}
              />
              <ProfileField label="Course" name="Course" subKey="newCourse" />
              <ProfileField label="Batch" name="Batch" subKey="newBatch" />
            </div>
            <div className={Styles.modalFooter}>
              <button className={Styles.cancelButton} onClick={closeModal}>
                Cancel
              </button>
              <button className={Styles.saveButton} onClick={saveProfile}>
                <FiCheck size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {updateSuccess && (
        <div className={Styles.successNotification}>
          <FiCheck size={20} />
          Profile updated successfully!
        </div>
      )}
    </>
  );
};

export default ProfilePage;