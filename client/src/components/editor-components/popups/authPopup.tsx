import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { PasswordInput } from "../inputs/passwordInput";
import { motion as m } from "framer-motion";
import { loginUser, registerUser, setCookie } from "@/api/auth";
import { useRouter } from "next/navigation";
import { LucideLoader } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { ReqInput } from "../inputs/reqInput";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IconBrandGoogleFilled } from "@tabler/icons-react";

export const AuthPopup = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useUserStore();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //eslint-disable-next-line
  const [type, setType] = useState<"Register" | "Login">("Login"); //temporarily disabling register
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await registerUser(email, username, password);

      if (response?.status === 201 && response.data?.user) {
        setUser(response.data.user);
        setOpen(false);
        router.push("/user");
      }
      //eslint-disable-next-line
    } catch (error: any) {
      if (error.status === 400) {
        toast.error("Username already taken");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Login Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await loginUser(username, password);

      if (response?.status === 200 && response.data?.user) {
        setUser(response.data.user);
        setOpen(false);
        router.push("/user");
      }
      //eslint-disable-next-line
    } catch (error: any) {
      if (error.status === 401) {
        toast.error("Invalid username or password");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Login Error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`;

    setCookie("token", "");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <DialogContent className="overflow-hidden font-Poppins">
            <DialogHeader>
              <m.div layoutId="dialog-title">
                <DialogTitle className="text-2xl font-semibold font-Montserrat">
                  {/* {type === "Register" */}
                  {/*   ? "Create An Account" */}
                  {/*   : "Login to Reachoout"} */}
                  {type === "Register" ? (
                    <span className="text-red-400">Register</span>
                  ) : (
                    <div className="text-left">
                      Login to{" "}
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                        Reachoout
                      </span>
                    </div>
                  )}
                </DialogTitle>
              </m.div>
            </DialogHeader>

            <m.div
              layout
              className="flex flex-col gap-4"
              animate={{ height: "auto" }}
              transition={{ duration: 0.15 }}
            >
              {type === "Register" && (
                <m.div
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={{ duration: 0.15 }}
                  layoutId="email-input"
                >
                  <ReqInput
                    placeholder="Enter your email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </m.div>
              )}

              <m.div
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.15,
                  delay: type === "Register" ? 0.05 : 0,
                }}
                layoutId="username-input"
              >
                <ReqInput
                  isRequired
                  required
                  placeholder="Enter your username"
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  inputClassName="lowercase"
                />
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.15,
                  delay: type === "Register" ? 0.1 : 0.05,
                }}
                layoutId="password-input"
              >
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </m.div>

              {/* <m.div */}
              {/*     initial={{ opacity: 0, filter: "blur(4px)" }} */}
              {/*     animate={{ opacity: 1, filter: "blur(0px)" }} */}
              {/*     transition={{ duration: 0.15, delay: 0.15 }} */}
              {/*     layoutId="toggle-text" */}
              {/* > */}
              {/*     <p className="text-sm text-gray-500 flex gap-1 items-center"> */}
              {/*         {type === "Register" */}
              {/*             ? "Already have an account? " */}
              {/*             : "New here? "} */}
              {/*         <span className="text-black"> */}
              {/*             <Button */}
              {/*                 variant={"link"} */}
              {/*                 className="p-0" */}
              {/*                 onClick={() => */}
              {/*                     setType(type === "Register" ? "Login" : "Register") */}
              {/*                 } */}
              {/*             > */}
              {/*                 {type === "Register" ? "Login" : "Create an account"} */}
              {/*             </Button> */}
              {/*         </span> */}
              {/*     </p> */}
              {/* </m.div> */}

              <m.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.15, delay: 0.2 }}
                layoutId="submit-button"
              >
                <Button
                  onClick={type === "Register" ? handleRegister : handleLogin}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? (
                    <LucideLoader className="animate-spin" />
                  ) : type === "Register" ? (
                    <span>Register</span>
                  ) : (
                    <span>Login</span>
                  )}
                </Button>
              </m.div>

              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <div className="h-px bg-gray-300 flex-1" />
                <span>Or</span>
                <div className="h-px bg-gray-300 flex-1" />
              </div>

              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2"
              >
                <IconBrandGoogleFilled
                  className="text-neutral-900 dark:text-white/60"
                  size={16}
                  aria-hidden="true"
                />
                Login with Google
              </Button>
            </m.div>
          </DialogContent>
        </m.div>
      </Dialog>
    </>
  );
};
