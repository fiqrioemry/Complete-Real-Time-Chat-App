import { useForm } from "react-hook-form";
import { signInFormControl } from "../config";
import AuthImage from "../components/auth/AuthImage";
import { useAuthStore } from "../store/useAuthStore";
import AuthFooterForm from "../components/auth/AuthFooterForm";
import AuthHeadingForm from "../components/auth/AuthHeadingForm";
import AuthControlForm from "../components/auth/AuthControlForm";

const SignIn = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, isLoggingIn } = useAuthStore();

  function inputValidatoion() {
    const input = watch();
    return !input.email || !input.password;
  }
  const onSubmit = (formData) => signIn(formData);

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center bg-base-100 items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <AuthHeadingForm
            title="Welcome Back"
            description="Sign in to your account"
          />
          {/* Form */}
          <AuthControlForm
            onSubmit={handleSubmit(onSubmit)}
            buttonTitle="Sign In"
            register={register}
            errors={errors}
            disabled={inputValidatoion()}
            loading={isLoggingIn}
            inputFormControl={signInFormControl}
          />

          <AuthFooterForm
            title="create account"
            path="/signup"
            description="Don't have an account ? "
          />
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImage
        title="Welcome back!"
        subtitle="Start conversations and catch up with your messages."
      />
    </div>
  );
};

export default SignIn;
