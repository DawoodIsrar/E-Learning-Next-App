const ForgotPassword = ({ email, token }) => {
  const router = useRouter();

  const [tempEmail, setTempEmail] = useState("");
  const [passMatched, setPassMatched] = useState("");

  useEffect(() => {
    setTempEmail(email);
  }, [email]);

  const onForgetPassword = async (e) => {
    e.preventDefault();
    const response = await sendVerificationCode(tempEmail, token);

    if (response?.result === "error") {
      setPassMatched(response?.error?.message);
      setTimeout(() => setPassMatched(""), 3000);
    } else {
      router.push(`/forgot-password?email=${tempEmail}`);
    }
  };

  return (
    <form className={`userSettingsModal`} onSubmit={onForgetPassword}>
      <h4>Forgot password</h4>
      <p>We'll send a verification code to your registered email</p>

      <input
        type="email"
        placeholder="Your email "
        value={tempEmail}
        onChange={(e) => setTempEmail(e.target.value)}
      />
      <div
        className="errorMessage"
        style={{ border: "none", padding: 0, minHeight: "20px" }}
      >
        {passMatched || ""}
      </div>
      <div className="userSettingsModal_btnRightAlign">
        <button className="userSettingsModal_submitBtn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

const ChangePassword = ({
  setIsOpen,
  username,
  token,
  role,
  setUserSettingModal,
}) => {
  const isLightTheme = "light";

  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newConfPass, setNewConfPass] = useState("");
  const [passMatched, setPassMatched] = useState("");

  const comparePassword = (tempNewPass, tempConfPass) => {
    if (tempNewPass?.length > 0 && tempConfPass?.length > 0) {
      if (tempNewPass === tempConfPass) {
        setPassMatched("");
        if (newPass?.length < 8) {
          setPassMatched(
            "A password must have at least 8 characters in length"
          );
          return;
        }
        if (newPass?.length > 20) {
          setPassMatched("A password must not exceed 20 characters in length");
          return;
        }
      } else {
        setPassMatched("New password and confirm password do not match");
      }
    } else {
      setPassMatched("New password and confirm password do not match");
    }
  };

  const passwordChange = async (e) => {
    e.preventDefault();
    if (!passMatched) {
      const response = await updatePassword(
        {
          role,
          old_password: curPass,
          password: newPass,
        },
        token
      );

      if (response?.result === "error") {
        setPassMatched(response?.error?.message);
        setTimeout(() => setPassMatched(""), 3000);
      } else {
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <form className={`userSettingsModal`} onSubmit={passwordChange}>
        <h4>Change password</h4>

        <div className="userSettingsModal_inputsContainer">
          <input
            type="text"
            autocomplete="username"
            value={username}
            style={{ visibility: "hidden", height: "0px" }}
          />
          <input
            type="password"
            placeholder="Current password"
            onChange={(e) => setCurPass(e.target.value)}
            value={curPass}
            autocomplete="current-password"
            required
          />
          <input
            type="password"
            placeholder="New password"
            autocomplete="new-password"
            onChange={(e) => {
              setNewPass(e.target.value);
              comparePassword(e.target.value, newConfPass);
            }}
            value={newPass}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) => {
              setNewConfPass(e.target.value);
              comparePassword(newPass, e.target.value);
            }}
            value={newConfPass}
            autocomplete="new-password"
            required
          />
          <div
            className="errorMessage"
            style={{ border: "none", padding: 0, minHeight: "20px" }}
          >
            {passMatched || ""}
          </div>
        </div>
        <div className="userSettingsModal_btnBetweenAlign">
          <span
            onClick={() =>
              setUserSettingModal(UserSettingsModalsTypes.forgotPassword)
            }
            className="userSettingsModal_forgetPassword"
          >
            Forgot password?
          </span>
          <button className="userSettingsModal_submitBtn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
