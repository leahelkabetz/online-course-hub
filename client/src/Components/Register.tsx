import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/slices/messageSlice";
import { colors } from "../styles/theme"; // ✅ שימוש בצבעים

type RegisterProps = {
  show: boolean;
  onClose: () => void;
};

const passwordStrongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const Register = ({ show, onClose }: RegisterProps) => {
  const [success, setSuccess] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("שדה חובה"),
      email: Yup.string().email("כתובת אימייל לא תקינה").required("שדה חובה"),
      password: Yup.string()
        .required("שדה חובה")
        .matches(
          passwordStrongRegex,
          "הסיסמה חייבת לכלול לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד"
        ),
      confirmPassword: Yup.string()
        .required("יש לאשר סיסמה")
        .oneOf([Yup.ref("password")], "הסיסמאות אינן תואמות"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // בדוק אם המייל כבר קיים
        const checkRes = await fetch(`http://localhost:4000/users?email=${values.email}`);
        const users = await checkRes.json();
        if (users.length > 0) {
          setToastMsg("המייל כבר קיים במערכת");
          setSuccess(true);
          resetForm();
          setShowConfirm(false);
          setShowPassword(false);
          setTimeout(() => {
            setSuccess(false);
            onClose();
            navigate('/login');
          }, 3500);
          return;
        }

        // אם לא קיים, בצע רישום
        const res = await fetch('http://localhost:4000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, role: 'user' }),
        });
        if (res.ok) {
          setToastMsg("נרשמת בהצלחה! שמחים שהצטרפת אלינו :)");
          setSuccess(true);
          resetForm();
          setShowConfirm(false);
          setShowPassword(false);
          setTimeout(() => {
            setSuccess(false);
            onClose();
            navigate('/login');
          }, 3500);
        } else {
          throw new Error('הרישום נכשל');
        }
      } catch (error) {
        setToastMsg("שגיאה ברישום");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3500);
      }
    },
  });

  // איפוס כל השדות בלחיצה על ביטול
  const handleCancel = () => {
    formik.resetForm();
    setShowConfirm(false);
    setShowPassword(false);
    onClose();
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal-backdrop-blur"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(4px)",
          zIndex: 1040,
        }}
        onClick={handleCancel}
      />
      <div
        className="modal d-block"
        tabIndex={-1}
        style={{
          background: "transparent",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1050,
          display: "flex",
          justifyContent: "center", // מרכז אופקית
          direction: "rtl",
          minHeight: "100vh",
          alignItems: "flex-start",
          marginTop: "80px",// מבטיח גובה מלא
        }}
      >
        <div className="modal-dialog" style={{ minWidth: 350, direction: "rtl" }}>
          <div className="modal-content" dir="rtl">
            <div className="modal-header">
              <h5 className="modal-title w-100 text-center">הרשמה</h5>
              <button type="button" className="btn-close" onClick={handleCancel}></button>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="modal-body">
                <div className="mb-3 text-end">
                  <label className="form-label">שם מלא</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback d-block">{formik.errors.name}</div>
                  )}
                </div>
                <div className="mb-3 text-end">
                  <label className="form-label">אימייל</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback d-block">{formik.errors.email}</div>
                  )}
                </div>
                <div className="mb-3 text-end">
                  <label className="form-label">סיסמה</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#888"
                      }}
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback d-block">{formik.errors.password}</div>
                  )}
                  <div className="form-text text-end" style={{ fontSize: "0.85rem" }}>
                    הסיסמה חייבת לכלול לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד
                  </div>
                </div>
                <div className="mb-3 text-end">
                  <label className="form-label">אימות סיסמה</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""}`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      onPaste={e => e.preventDefault()} // מונע הדבקה
                    />
                    <span
                      style={{
                        position: "absolute",
                        left: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#888"
                      }}
                      onClick={() => setShowConfirm((v) => !v)}
                    >
                      {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="invalid-feedback d-block">{formik.errors.confirmPassword}</div>
                  )}
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  ביטול
                </button>
                <button type="submit" className="btn" style={{ background: colors.Primary, color: colors.White }}>
                  הרשמה
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* טוסט הצלחה/שגיאה */}
      {success && (
        <div
          className="toast show position-fixed top-50 start-50 translate-middle"
          style={{ zIndex: 2000, minWidth: 300, direction: "rtl" }}
        >
          {/* <div className="toast-header bg-success text-white w-100 justify-content-center">
            <strong className="w-100 text-center">{toastMsg}</strong>
          </div> */}
          <div
            className={
              "toast-header text-white w-100 justify-content-center " +
              (toastMsg.includes("כבר קיים") ? "bg-danger" : "bg-success")
            }
          >
            <strong className="w-100 text-center">{toastMsg}</strong>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;