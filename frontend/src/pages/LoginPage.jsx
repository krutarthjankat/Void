import LoginForm from "../components/LoginForm";

export default function LoginPage({ setUser }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <LoginForm setUser={setUser} />
    </div>
  );
}
