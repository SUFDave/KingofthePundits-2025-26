import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState({
    login: false,
    register: false
  });

  // Form data states
  const [loginData, setLoginData] = useState({ email: '', password: '', rememberMe: false });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    division: '',
    agreeToTerms: false
  });
  const [resetData, setResetData] = useState({ email: '' });

  // Tab switching
  const switchTab = (tab) => {
    setActiveTab(tab);
    setMessage({ text: '', type: '' });
  };

  // Password visibility toggle
  const togglePassword = (form) => {
    setShowPassword(prev => ({
      ...prev,
      [form]: !prev[form]
    }));
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength('');
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;

    const strengthLevels = {
      1: { text: '⚠️ Weak password', class: 'strength-weak' },
      2: { text: '🔶 Fair password', class: 'strength-fair' },
      3: { text: '✓ Good password', class: 'strength-good' },
      4: { text: '✓✓ Strong password', class: 'strength-strong' },
      5: { text: '✓✓ Very strong password', class: 'strength-strong' }
    };

    const level = strengthLevels[strength] || strengthLevels[1];
    setPasswordStrength(level);
  };

  // Show message
  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // API call would go here
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        showMessage('Invalid email or password', 'error');
      }
    } catch (error) {
      console.log('Login:', loginData);
      showMessage('Login successful! Redirecting...', 'success');
      // Remove this in production - just for demo
      setTimeout(() => console.log('Would redirect to dashboard'), 2000);
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      showMessage('Passwords do not match!', 'error');
      return;
    }

    if (!registerData.agreeToTerms) {
      showMessage('Please agree to the terms and conditions', 'error');
      return;
    }

    try {
      // API call would go here
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });

      if (response.ok) {
        showMessage('Registration successful! Please check your email.', 'success');
        setTimeout(() => switchTab('login'), 3000);
      } else {
        showMessage('Registration failed. Please try again.', 'error');
      }
    } catch (error) {
      console.log('Register:', registerData);
      showMessage('Registration successful! Please check your email.', 'success');
      // Remove this in production - just for demo
      setTimeout(() => switchTab('login'), 3000);
    }
  };

  // Handle password reset
  const handleReset = async (e) => {
    e.preventDefault();
    
    try {
      // API call would go here
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetData)
      });

      if (response.ok) {
        showMessage('Password reset link sent! Check your email.', 'success');
        setTimeout(() => switchTab('login'), 3000);
      } else {
        showMessage('Email not found', 'error');
      }
    } catch (error) {
      console.log('Reset:', resetData);
      showMessage('Password reset link sent! Check your email.', 'success');
      // Remove this in production - just for demo
      setTimeout(() => switchTab('login'), 3000);
    }
  };

  return (
    <>
      <Head>
        <title>King of the Pundits - Sign In</title>
        <meta name="description" content="Sign in to King of the Pundits - The ultimate football prediction battleground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="auth-page">
        {/* Header */}
        <header className="site-header">
          <div className="container">
            <div className="header-inner">
              <h1 className="brand-title">
                👑 King of the Pundits <span className="season">2025/26</span>
              </h1>
              <nav>
                <ul className="nav-list">
                  <li><a href="/">Home</a></li>
                  <li><a href="/league-tables">League Tables</a></li>
                  <li><a href="/weekly-picks">Weekly Picks</a></li>
                  <li><a href="/results">Results</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="container">
          <div className="hero-banner">
            <div className="hero-content">
              <h1>👑 KING OF THE PUNDITS</h1>
              <p>The Ultimate Football Prediction Battleground</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="main-content">
          <div className="container">
            <div className="auth-container">
              <div className="card">
                {/* Tab Navigation */}
                <div className="tab-nav">
                  <button 
                    className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
                    onClick={() => switchTab('login')}
                  >
                    Sign In
                  </button>
                  <button 
                    className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => switchTab('register')}
                  >
                    Register
                  </button>
                  <button 
                    className={`tab-button ${activeTab === 'reset' ? 'active' : ''}`}
                    onClick={() => switchTab('reset')}
                  >
                    Reset Password
                  </button>
                </div>

                {/* Login Form */}
                {activeTab === 'login' && (
                  <form className="auth-form active" onSubmit={handleLogin}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="loginEmail">Email Address</label>
                      <input 
                        type="email" 
                        id="loginEmail" 
                        className="form-input" 
                        placeholder="your@email.com" 
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="loginPassword">Password</label>
                      <div className="password-field">
                        <input 
                          type={showPassword.login ? 'text' : 'password'}
                          id="loginPassword" 
                          className="form-input" 
                          placeholder="Enter your password" 
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          required 
                        />
                        <button 
                          type="button" 
                          className="password-toggle" 
                          onClick={() => togglePassword('login')}
                        >
                          👁️
                        </button>
                      </div>
                    </div>

                    <div className="checkbox-group">
                      <input 
                        type="checkbox" 
                        id="rememberMe"
                        checked={loginData.rememberMe}
                        onChange={(e) => setLoginData({...loginData, rememberMe: e.target.checked})}
                      />
                      <label htmlFor="rememberMe">Remember me</label>
                    </div>

                    <button type="submit" className="btn btn-primary">Sign In</button>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
                      <a 
                        href="#" 
                        className="form-link" 
                        onClick={(e) => { e.preventDefault(); switchTab('reset'); }}
                      >
                        Forgot password?
                      </a>
                    </div>

                    <div className="divider">
                      <span className="divider-text">Or continue with</span>
                    </div>

                    <button type="button" className="btn btn-google">
                      Sign in with Google
                    </button>
                  </form>
                )}

                {/* Register Form */}
                {activeTab === 'register' && (
                  <form className="auth-form active" onSubmit={handleRegister}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="registerUsername">Username</label>
                      <input 
                        type="text" 
                        id="registerUsername" 
                        className="form-input" 
                        placeholder="Choose a username" 
                        value={registerData.username}
                        onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="registerEmail">Email Address</label>
                      <input 
                        type="email" 
                        id="registerEmail" 
                        className="form-input" 
                        placeholder="your@email.com" 
                        value={registerData.email}
                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="registerPassword">Password</label>
                      <div className="password-field">
                        <input 
                          type={showPassword.register ? 'text' : 'password'}
                          id="registerPassword" 
                          className="form-input" 
                          placeholder="Minimum 8 characters" 
                          minLength="8" 
                          value={registerData.password}
                          onChange={(e) => {
                            setRegisterData({...registerData, password: e.target.value});
                            checkPasswordStrength(e.target.value);
                          }}
                          required 
                        />
                        <button 
                          type="button" 
                          className="password-toggle" 
                          onClick={() => togglePassword('register')}
                        >
                          👁️
                        </button>
                      </div>
                      {passwordStrength && (
                        <div className={`password-strength ${passwordStrength.class}`}>
                          {passwordStrength.text}
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="registerConfirmPassword">Confirm Password</label>
                      <input 
                        type="password" 
                        id="registerConfirmPassword" 
                        className="form-input" 
                        placeholder="Confirm your password" 
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="division">Select Division</label>
                      <select 
                        id="division" 
                        className="form-input" 
                        value={registerData.division}
                        onChange={(e) => setRegisterData({...registerData, division: e.target.value})}
                        required
                      >
                        <option value="">Choose your division</option>
                        <option value="1">Division One</option>
                        <option value="2">Division Two</option>
                      </select>
                    </div>

                    <div className="checkbox-group">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        checked={registerData.agreeToTerms}
                        onChange={(e) => setRegisterData({...registerData, agreeToTerms: e.target.checked})}
                        required 
                      />
                      <label htmlFor="terms">
                        I agree to the <a href="#" className="form-link">Terms and Conditions</a> and{' '}
                        <a href="#" className="form-link">Privacy Policy</a>
                      </label>
                    </div>

                    <button type="submit" className="btn btn-primary">Create Account</button>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
                      <span style={{ color: 'var(--color-muted)' }}>Already have an account?</span>{' '}
                      <a 
                        href="#" 
                        className="form-link" 
                        onClick={(e) => { e.preventDefault(); switchTab('login'); }}
                      >
                        Sign In
                      </a>
                    </div>
                  </form>
                )}

                {/* Reset Password Form */}
                {activeTab === 'reset' && (
                  <form className="auth-form active" onSubmit={handleReset}>
                    <p style={{ color: 'var(--color-text)', marginBottom: 'var(--space-5)' }}>
                      Enter your email address and we'll send you a link to reset your password.
                    </p>

                    <div className="form-group">
                      <label className="form-label" htmlFor="resetEmail">Email Address</label>
                      <input 
                        type="email" 
                        id="resetEmail" 
                        className="form-input" 
                        placeholder="your@email.com" 
                        value={resetData.email}
                        onChange={(e) => setResetData({ email: e.target.value })}
                        required 
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">Send Reset Link</button>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
                      <a 
                        href="#" 
                        className="form-link" 
                        onClick={(e) => { e.preventDefault(); switchTab('login'); }}
                      >
                        Back to Sign In
                      </a>
                    </div>
                  </form>
                )}

                {/* Message Container */}
                {message.text && (
                  <div className={`message show message-${message.type}`}>
                    {message.text}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="site-footer">
          <p className="footer-text">© 2025 King of the Pundits. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
