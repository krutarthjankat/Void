import SignupForm from "../components/SignupForm";

export default function SignupPage({ setUser }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      <SignupForm setUser={setUser} />
    </div>
  );
}
