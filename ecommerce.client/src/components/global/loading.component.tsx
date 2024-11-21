import { motion } from "motion/react"

interface BouncingLoaderProps {
    text?: string;
    size?: 'small' | 'medium' | 'large';
}

const LoadingComponent = ({
    text = "E-Shop",
    size = 'medium'
}: BouncingLoaderProps = {}) => {

    const letterVariants = {
        initial: { y: 0 },
        animate: { y: -6 }
    }

    const colorTransition = {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 2,
    }

    const bounceTransition = {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 0.4
    }

    const fontSize = {
        small: 'text-xl',
        medium: 'text-3xl',
        large: 'text-5xl'
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
            <div className={`flex items-center justify-center space-x-1 ${fontSize[size]} font-extrabold`}
                >
                {(text + "...").split('').map((letter, index) => (
                    <motion.span
                        key={index}
                        variants={letterVariants}
                        initial="initial"
                        animate="animate"
                        transition={{
                            ...bounceTransition,
                            delay: index * 0.1
                        }}
                        style={{
                            display: 'inline-block',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}
                    >
                        <motion.span
                            animate={{
                                color: ['#808080', '#404040']
                            }}
                            transition={colorTransition}
                        >
                            {letter}
                        </motion.span>
                    </motion.span>
                ))}
            </div>
        </div>

    )
}

export default LoadingComponent;