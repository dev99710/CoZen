import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BillingToggleProps {
  annual: boolean;
  onToggle: (value: boolean) => void;
}

export function BillingToggle({ annual, onToggle }: BillingToggleProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative flex h-12 w-64 cursor-pointer items-center rounded-full bg-secondary p-1" onClick={() => onToggle(!annual)}>
        {/* Sliding background */}
        <motion.div
          className="absolute h-10 w-[49%] rounded-full bg-gradient-to-r from-primary to-primary/80"
          animate={{ x: annual ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
        />

        {/* Text labels */}
        <span className={`relative z-10 flex-1 text-center text-sm font-medium transition-colors duration-200 ${!annual ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
          Monthly
        </span>
        <span className={`relative z-10 flex-1 text-center text-sm font-medium transition-colors duration-200 ${annual ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
          Annual
        </span>
      </div>

      {/* Discount tag */}
      {annual && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="flex items-center gap-1"
        >
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Save 20%
          </span>
        </motion.div>
      )}
    </div>
  );
}
