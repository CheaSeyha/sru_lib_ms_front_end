import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
const Modal = ({ isVisible, onClose, children }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div className="fixed inset-0 overflow-auto z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div className="relative bg-primary rounded-[20px] shadow-lg w-11/12 max-w-lg"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <div className="p-5">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
