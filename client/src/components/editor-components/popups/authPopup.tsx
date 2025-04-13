import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { PasswordInput } from "../inputs/passwordInput";
import { motion as m } from "motion/react";
import { loginUser, registerUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import { LucideLoader } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { ReqInput } from "../inputs/reqInput";
import { Button } from "@/components/ui/button";

export const AuthPopup = ({ children }: { children: React.ReactNode }) => {
    const { setUser } = useUserStore();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [type, setType] = useState<"Register" | "Login">("Login");
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleRegister = async () => {
        setLoading(true);
        const response = await registerUser(email, username, password);
        if (response.user) {
            setUser(response.user);
        }
        setLoading(false);
        setOpen(false);
        router.push("/explore");
    };
    const handleLogin = async () => {
        setLoading(true);
        const response = await loginUser(username, password);
        if (response.user) {
            setUser(response.user);
        }
        setLoading(false);
        setOpen(false);
        router.push("/explore");
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>{children}</DialogTrigger>
                <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <DialogContent className="overflow-hidden">
                        <DialogHeader>
                            <m.div layoutId="dialog-title">
                                <DialogTitle className="text-2xl font-semibold font-Montserrat">
                                    {type === "Register"
                                        ? "Create An Account"
                                        : "Login to your account"}
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
                                    placeholder="Enter your username"
                                    label="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
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

                            <m.div
                                initial={{ opacity: 0, filter: "blur(4px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.15, delay: 0.15 }}
                                layoutId="toggle-text"
                            >
                                <p className="text-sm text-gray-500 flex gap-1 items-center">
                                    {type === "Register"
                                        ? "Already have an account? "
                                        : "New here? "}
                                    <span className="text-black">
                                        <Button
                                            variant={"link"}
                                            className="p-0"
                                            onClick={() =>
                                                setType(type === "Register" ? "Login" : "Register")
                                            }
                                        >
                                            {type === "Register" ? "Login" : "Create an account"}
                                        </Button>
                                    </span>
                                </p>
                            </m.div>

                            <m.div
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.15, delay: 0.2 }}
                                layoutId="submit-button"
                            >
                                <Button
                                    onClick={type === "Register" ? handleRegister : handleLogin}
                                >
                                    {loading ? (
                                        <LucideLoader className="animate-spin" />
                                    ) : type === "Register" ? (
                                        "Register"
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </m.div>
                        </m.div>
                    </DialogContent>
                </m.div>
            </Dialog>
        </>
    );
};
