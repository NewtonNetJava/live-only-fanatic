import SignUp from "./SignUp";
import {useState} from "react";

function SignUpPage() {
  const [isSignUpOpen, setIsModalOpen] = useState(true); // Method to toggle modal

  return <>{isSignUpOpen && <SignUp setIsModalOpen={setIsModalOpen} />}</>;
}
export default SignUpPage;