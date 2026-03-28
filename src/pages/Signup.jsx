import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!name.trim()) {
        throw new Error('Name is required');
      }
      if (!email.trim()) {
        throw new Error('Email is required');
      }
      if (!password.trim()) {
        throw new Error('Password is required');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await signup(email, password, name);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-2xl"
        >
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Sign Up</h1>
          <p className="text-center text-gray-600 mb-6">Create your Task Manager account</p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/" className="text-green-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
