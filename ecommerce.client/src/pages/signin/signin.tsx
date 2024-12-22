import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useServices } from "@/context/service.context";
import { Link, Navigate, useNavigate } from "react-router";
import { User } from "@/models";

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

const SignInPage = () => {

    const navigate = useNavigate();
    const { authService } = useServices();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<User | null>(null);
    
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Password validation
        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            setIsLoading(true);
            await authService.login(formData.email, formData.password);
            setIsLoading(false);
            navigate("/home");
        } else {
            console.log('error')
        }
    }

    useEffect(() => {
        const fetchUserData = async() => {
            setUserData(await authService.getUserInfo());
        }
        fetchUserData().catch(console.log)
    },[]);

    if(userData != null)
        return <Navigate to={{ pathname: "/profile"}}/>

    return (

        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="w-full flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">YT</span>
                        </div>
                        <h1 className="text-lg font-semibold text-emerald-700">YourTech</h1>
                    </div>
                    <Bell className="text-gray-600" />
                </div>
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription>Log in to your YourTech account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            autoComplete="on"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                autoComplete="on"
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="/forgot-password" className="font-medium text-emerald-600 hover:text-emerald-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <motion.div
                                className="flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.span
                                    className="inline-block h-2 w-2 rounded-full bg-white mr-1"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                />
                                <motion.span
                                    className="inline-block h-2 w-2 rounded-full bg-white mr-1"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                                />
                                <motion.span
                                    className="inline-block h-2 w-2 rounded-full bg-white"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                                />
                            </motion.div>
                        ) : (
                            'Log In'
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-gray-500">
                    Don't have an account? <Link to={{ pathname: "/signup" }} className="text-emerald-600 hover:underline">Sign up</Link>
                </p>
            </CardFooter>
        </Card>

    );
}

export default SignInPage;