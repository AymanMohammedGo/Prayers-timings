import { useEffect, useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [count, setCount] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // You can submit the form data to your backend or perform other actions here.
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setCount(5);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  useEffect(() => {
    if (count > 0) {
      const timerId = setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  }, [count]);

  return (
    <>
      <div className="contact-us">
        <h2>Contact Us</h2>
        {isSubmitted ? (
          <div className="success-message">
            Thank you for your submission! {count}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="form-control">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="form-control">
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <div className="error">{errors.message}</div>}
            </div>
            <button className="ContactSubmit" type="submit">
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ContactUs;
