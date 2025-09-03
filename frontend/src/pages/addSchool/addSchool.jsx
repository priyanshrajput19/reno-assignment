import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageHeader from "../../components/pageHeader/PageHeader";
import "./addSchool.css";

export default function AddSchoolPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPreviewUrl("");
      return;
    }

    // Check if file is PNG
    if (file.type !== "image/png") {
      alert("Only PNG images are allowed. Please select a PNG file.");
      event.target.value = "";
      setPreviewUrl("");
      return;
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB. Please select a smaller file.");
      event.target.value = "";
      setPreviewUrl("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result?.toString() || "");
    reader.readAsDataURL(file);
  };

  const submitForm = async (data) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await axios.post(`${import.meta.env.VITE_REACT_BACKEND_BASEURL}/addSchool`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      reset();
      setPreviewUrl("");
      navigate("/schools");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-school-container">
      <PageHeader title="Add School" buttonText="← Back to Schools" onButtonClick={() => navigate("/")} buttonClassName="back-btn" />

      <form className="add-school-form" onSubmit={handleSubmit(submitForm)} noValidate>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">School Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g., Green Valley High"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              })}
            />
            {errors.name && <span className="error">{errors.name.message}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="email_id">Email</label>
            <input
              id="email_id"
              type="email"
              placeholder="school@example.com"
              {...register("email_id", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email_id && <span className="error">{errors.email_id.message}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="contact">Contact Number</label>
            <input
              id="contact"
              type="tel"
              placeholder="10-digit number"
              {...register("contact", {
                required: "Contact is required",
                pattern: { value: /^\d{10}$/, message: "Enter a 10-digit number" },
              })}
            />
            {errors.contact && <span className="error">{errors.contact.message}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="state">State</label>
            <input id="state" type="text" placeholder="e.g., Maharashtra" {...register("state", { required: "State is required" })} />
            {errors.state && <span className="error">{errors.state.message}</span>}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            placeholder="Street, Area"
            {...register("address", {
              required: "Address is required",
              minLength: { value: 5, message: "Address must be at least 5 characters" },
            })}
          />
          {errors.address && <span className="error">{errors.address.message}</span>}
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="city">City</label>
            <input id="city" type="text" placeholder="e.g., Pune" {...register("city", { required: "City is required" })} />
            {errors.city && <span className="error">{errors.city.message}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="image">School Image</label>
            <input id="image" type="file" accept="image/png" {...register("image")} onChange={onImageChange} />
            <small className="file-info">Only PNG images allowed (Max 10MB)</small>
          </div>
        </div>

        {previewUrl && (
          <div className="preview">
            <img src={previewUrl} alt="Preview" />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save School"}
          </button>
          <button
            type="button"
            className="reset-btn"
            onClick={() => {
              reset();
              setPreviewUrl("");
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
