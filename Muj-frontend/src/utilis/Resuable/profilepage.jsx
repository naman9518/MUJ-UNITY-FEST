import { useState } from "react";
import Styles from "./profilepage.module.css";
import { CgProfile } from "react-icons/cg";

const ProfilePage = () => {
  const initialState = {
    fullname: { oldname: "khushi", newname: "gorang" },
    phoneNumber: { oldPhoneNumber: "7014582455", newPhoneNumber: "7014582455" },
    alternateNumber: { oldAlternateNumber: "966661111", newAlternateNumber: "966661111" },
    UniversityMail: { oldUniversityMail: "gorangsoni@gmail.com", newUniversityMail: "gorangsoni@gmail.com" },
    Course: { oldCourse: "bca", newCourse: "bca" },
    Batch: { oldBatch: "6", newBatch: "6" },
    image: { oldImage: "", newImage: "" },
  };

  const [value, setValue] = useState(initialState);
  const [tempValue, setTempValue] = useState(initialState);
  const [icon, setIcon] = useState(false);
  const [togg, setToggle] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);

  const toggle = () => {
    setToggle(true);
    setIcon(false);
    document.body.style.overflow = 'hidden';
  };

  const closewindow = () => {
    setTempValue(value);
    setToggle(false);
    document.body.style.overflow = 'auto';
  };

  const handleChange = (e) => {
    const { name, value: newValue } = e.target;
    const [mainKey, subKey] = name.split(".");
    setTempValue((prev) => ({
      ...prev,
      [mainKey]: {
        ...prev[mainKey],
        [subKey]: newValue,
      },
    }));
  };

  const photochange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIcon(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempValue((prev) => ({
          ...prev,
          image: {
            ...prev.image,
            newImage: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const checkimage = () => {
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
    setUpdateImage(true);
    setToggle(false);
    document.body.style.overflow = 'auto';
  };

  const ProfileField = ({ label, name, subKey }) => (
    <div className={Styles.whole}>
      <div className={Styles.details}>{label}</div>
      <input
        name={`${name}.${subKey}`}
        onChange={handleChange}
        value={tempValue[name][subKey]}
        className={
          ["phoneNumber", "alternateNumber", "UniversityMail"].includes(name)
            ? `${Styles.inputs} ${Styles.grey}`
            : Styles.inputs
        }
        placeholder={label}
        readOnly={
          ["phoneNumber", "alternateNumber", "UniversityMail"].includes(name)
        }
      />
    </div>
  );

  return (
    <>
      {updateImage ? (
        <img
          src={value.image.oldImage}
          className={Styles.Profileicon2}
          onClick={toggle}
          alt="Profile"
        />
      ) : (
        <CgProfile className={Styles.Profileicon} onClick={toggle} />
      )}

      {togg && (
        <div className={Styles.centre}>
          <div className={Styles.whiteContainer}>
            <div className={Styles.profile}>
              <div className={Styles.closeButton} onClick={closewindow}>×</div>
              <h1 className={Styles.heading}>Profile</h1>

              <div className={Styles.wholesection}>
                <div className={Styles.edit}>
                  <div className={icon ? Styles.editlogo : Styles.editlogo2}>
                    {icon ? (
                      <img
                        src={tempValue.image.newImage}
                        className={Styles.profilephoto}
                        alt="Preview"
                      />
                    ) : updateImage ? (
                      <img
                        src={value.image.oldImage}
                        className={Styles.profilephoto}
                        alt="Profile"
                      />
                    ) : (
                      <CgProfile className={Styles.profilephoto} />
                    )}
                    <label htmlFor="inputfile" className={Styles.editLabel}>
                      Edit photo
                    </label>
                  </div>

                  <input
                    onChange={photochange}
                    type="file"
                    id="inputfile"
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                </div>

                <div className={Styles.othersection}>
                  <ProfileField label="Full Name" name="fullname" subKey="newname" />
                  <ProfileField label="Phone Number" name="phoneNumber" subKey="newPhoneNumber" />
                  <ProfileField label="Alternate Number" name="alternateNumber" subKey="newAlternateNumber" />
                  <ProfileField label="University Mail" name="UniversityMail" subKey="newUniversityMail" />
                  <ProfileField label="Course" name="Course" subKey="newCourse" />
                  <ProfileField label="Batch" name="Batch" subKey="newBatch" />
                </div>
              </div>

              <div className={Styles.footer}>
                <button onClick={closewindow} className={Styles.both}>
                  Cancel
                </button>
                <button onClick={checkimage} className={`${Styles.both} ${Styles.save}`}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;