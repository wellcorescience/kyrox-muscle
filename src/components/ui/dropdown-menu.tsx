'use client';

import React, { useState, useRef, useEffect, ReactNode, cloneElement, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DropdownContext = createContext<{ isOpen: boolean; setIsOpen: (v: boolean) => void }>({ isOpen: false, setIsOpen: () => {} });

export function DropdownMenu({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left" ref={ref}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
  const { isOpen, setIsOpen } = useContext(DropdownContext);
  
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return cloneElement(child, {
      onClick: (e: any) => {
        if (child.props.onClick) child.props.onClick(e);
        e.stopPropagation();
        setIsOpen(!isOpen);
      }
    });
  }
  return <div onClick={() => setIsOpen(!isOpen)}>{children}</div>;
}

export function DropdownMenuContent({ children }: { children: ReactNode }) {
  const { isOpen } = useContext(DropdownContext);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          className="absolute right-0 mt-2 w-48 rounded-xl bg-zinc-900 border border-white/10 shadow-2xl z-50 overflow-hidden"
        >
          <div className="p-1">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DropdownMenuItem({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  const { setIsOpen } = useContext(DropdownContext);
  return (
    <button
      className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick();
        setIsOpen(false);
      }}
    >
      {children}
    </button>
  );
}
