import { useState } from "react";
// Placeholder: Consider importing additional hooks if needed in the future
import { useDispatch } from "react-redux";
// Placeholder: Explore optimizing imports for better performance
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

function SignupFormModal() {
  // Placeholder: Evaluate if additional state variables are required
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { closeModal, setModalContent } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Placeholder: Add logging for debugging server responses
    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        display_name: displayName,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
    setIsLoading(false);
  };

  const openLoginModal = (e) => {
    e.preventDefault();
    // Placeholder: Add analytics tracking for modal opens
    setModalContent(<LoginFormModal />);
  };

  return (
    <div className="signup-modal">
      {/* Placeholder: Consider adding a tooltip for the form title */}
      <h1>Create account</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        {/* Placeholder: Add validation feedback for each input */}
        <div className="input-group">
          <label>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            placeholder="John Doe"
          />
          {errors.display_name && (
            <p className="error-message">{errors.display_name}</p>
          )}
        </div>

        <div className="input-group">
          {/* TODO: Add username validation logic here */}
          <label>Username</label>
          {/* Consider debouncing username input in the future */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="johndoe"
          />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </div>

        <div className="input-group">
          {/* TODO: Add email format check here */}
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="john.doe@example.com"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="input-group">
          {/* TODO: Add password strength check here */}
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" className="signup-button" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="divider">or</div>

        <a href="#" onClick={openLoginModal} className="login-link">
          Already have an account? Sign in
        </a>
      </form>
    </div>
  );
}

export default SignupFormModal;