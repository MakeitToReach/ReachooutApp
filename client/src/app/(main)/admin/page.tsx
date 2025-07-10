"use client";

import { loginAdmin } from "@/api/admin";
import { PasswordInput } from "@/components/editor-components/inputs/passwordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await loginAdmin(username, password);
        if (response?.status === 200) {
            router.push("/admin/dashboard");
        }
    };
    return (
        <div className="dark bg-zinc-950 flex items-center justify-center min-h-screen">
            <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h3 className="text-center text-2xl font-semibold text-foreground dark:text-foreground">
                        Admin Login
                    </h3>
                    <p className="text-center text-sm text-muted-foreground mt-4 dark:text-muted-foreground">
                        Enter your credentials to access admin panel.
                    </p>
                    <form
                        method="post"
                        onSubmit={handleSubmit}
                        className="mt-6 space-y-4"
                    >
                        <div>
                            <Label
                                htmlFor="admin-username"
                                className="text-sm font-medium text-foreground dark:text-foreground"
                            >
                                Admin Username
                            </Label>
                            <Input
                                type="text"
                                id="username"
                                name="admin-username"
                                placeholder="admin"
                                className="mt-2 text-foreground"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <PasswordInput
                                id="password-login-03"
                                name="password-login-03"
                                autoComplete="password"
                                placeholder="**************"
                                className="text-foreground"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="mt-4 w-full py-2 font-medium">
                            Login
                        </Button>
                    </form>
                    {/* <p className="mt-6 text-sm text-muted-foreground dark:text-muted-foreground"> */}
                    {/*     Forgot your password?{" "} */}
                    {/*     <a */}
                    {/*         href="#" */}
                    {/*         className="font-medium text-primary hover:text-primary/90 dark:text-primary dark:hover:text-primary/90" */}
                    {/*     > */}
                    {/*         Reset password */}
                    {/*     </a> */}
                    {/* </p> */}
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
