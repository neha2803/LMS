'use client'
import { useFormState } from "react-dom";

import Password from "../components/ui/password";
import { register } from "../lib/actions";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import Email from "../components/ui/email";
import { useRouter } from "next/navigation";



const Register: React.FC = () => {
    const router = useRouter();
    const [errorMessage, dispatch] = useFormState(register, undefined);

    const pop = (formData: FormData) => {
        dispatch(formData);

        // console.log(errorMessage);
        // console.log('success');

        // if (!errorMessage?.email && !errorMessage?.name && !errorMessage?.password) {
        //     //router.push('/login')
        // }
    }

    return (
        <div className="flex justify-center content-center">
            <div className="border border-blue-950/90 dark:border-teal-300 rounded my-1 px-2 py-1 dark:bg-slate-300 dark:text-slate-700">
                <div className="flex flex-col">
                    <h2>Register to Arena</h2>
                    <form action={pop}>
                        <div className="mb-2">
                            <label className="block text-xs">Name</label>
                            <Input id="name" name="name"></Input>
                            <p className="text-xs text-red-600">{errorMessage?.name}</p>
                        </div>
                        <div className="mb-2">
                            <label className="block text-xs">Email</label>
                            <Email id="email" name="email"></Email>
                            <p className="text-xs text-red-600">{errorMessage?.email}</p>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="block text-xs">Password</label>
                            <Password></Password>
                            <p className="text-xs text-red-600">{errorMessage?.password}</p>
                        </div>
                        <div className="w-56">
                            <article className="text-xs text-wrap text-green-900">You will be redirected to login if the user is created successfully</article>
                        </div>
                        <div className="flex flex-row-reverse">
                            <Button >
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // <main className="h-screen flex justify-center items-center">
        // </main>
    )

}

export default Register;