import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 120,
      damping: 12
    }
  })
};

export default function FloatingContact() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="fixed right-4 bottom-6 z-50 flex flex-col gap-4"
    >
      {/* WhatsApp */}
      <motion.a
        custom={0}
        variants={itemVariants}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        href="https://wa.me/8801327694078"
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
      >
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-xl ring-2 ring-green-400/30 animate-pulse">
          <FaWhatsapp className="text-white text-xl" />
        </div>

        <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all backdrop-blur bg-black/70 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
          WhatsApp Me
        </span>
      </motion.a>

      {/* Email */}
      <motion.a
        custom={1}
        variants={itemVariants}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        href="https://mail.google.com/mail/?view=cm&fs=1&to=aminur.programme@gmail.com"
        className="relative group"
      >
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-xl ring-2 ring-blue-400/30">
          <FaEnvelope className="text-white text-lg" />
        </div>

        <span className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all backdrop-blur bg-black/70 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap shadow-lg">
          Email Me
        </span>
      </motion.a>
    </motion.div>
  );
}
