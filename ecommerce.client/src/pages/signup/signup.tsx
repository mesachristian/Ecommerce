import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServices } from "@/context/service.context";
import { User } from "@/models";
import { CheckCircle2, Eye, EyeOff, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}


const SignUpPage = () => {

    const { authService } = useServices();
    const [userData, setUserData] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState<FormErrors>({})

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // Name validation
        if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long'
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Password validation
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and include a number, uppercase and lowercase letter, and a symbol'
        }

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
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
            setIsLoading(true)
            console.log("event handle", formData);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))
            await authService.register(formData.email, formData.password);
            // Simulated successful sign-up
            setIsLoading(false)
            //router.push('/') // Redirect to home page
        } else {
        }
    }

    useEffect(() => {
        if (Object.keys(formData).some(key => formData[key as keyof FormData] !== '')) {
            validateForm()
        }
    }, [formData])

    useEffect(() => {
        const fetchUserData = async() => {
            setUserData(await authService.getUserInfo());
        }

        fetchUserData().catch(console.log)
    },[]);

    if(userData == null)
        return <Navigate to={{ pathname: "/profile"}}/>

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
                <CardDescription>Sign up to start shopping with YourTech</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            autoComplete="off"
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            autoComplete="off"
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
                                autoComplete="off"
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
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            autoComplete="off"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className={errors.confirmPassword ? 'border-red-500' : ''}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                    <div className="space-y-2 text-sm">
                        <p className={`flex items-center ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-500'}`}>
                            {formData.password.length >= 8 ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
                            At least 8 characters
                        </p>
                        <p className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-500'}`}>
                            {/[A-Z]/.test(formData.password) ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
                            Contains uppercase letter
                        </p>
                        <p className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-500' : 'text-gray-500'}`}>
                            {/[a-z]/.test(formData.password) ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
                            Contains lowercase letter
                        </p>
                        <p className={`flex items-center ${/\d/.test(formData.password) ? 'text-green-500' : 'text-gray-500'}`}>
                            {/\d/.test(formData.password) ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
                            Contains number
                        </p>
                        <p className={`flex items-center ${/[!@#$%^&*]/.test(formData.password) ? 'text-green-500' : 'text-gray-500'}`}>
                            {/[!@#$%^&*.]/.test(formData.password) ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
                            Contains symbol
                        </p>
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
                            'Sign Up'
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-gray-500">
                    Already have an account? <Link to={{ pathname: '/signin' }} className="text-emerald-600 hover:underline">Log in</Link>
                </p>
            </CardFooter>
        </Card>
    );
}

export default SignUpPage;