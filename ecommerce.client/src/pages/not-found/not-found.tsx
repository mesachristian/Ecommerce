import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <div className="p-4">
            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
                >
                    <span className="text-4xl">404</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
                    <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>

                    <Button
                        className="bg-emerald-500 hover:bg-emerald-600 flex items-center space-x-2 w-full"
                        onClick={() => navigate('/')}
                    >
                        <Home className="w-4 h-4" />
                        <span>Back to Home</span>
                    </Button>
                </motion.div>
            </main>
        </div>
    );
}

export default NotFoundPage;