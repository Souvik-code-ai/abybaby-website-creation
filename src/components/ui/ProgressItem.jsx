import { motion } from "motion/react";
export default function ProgressItem({ title, value }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5 text-[14px]">
        <span className="text-gray-700 font-medium">{title}</span>
        <span className="text-lime-600 font-extrabold">{value}%</span>
      </div>
      <div className="rounded-full overflow-hidden h-1.5 bg-white">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#65A30D] to-[#ECFCCB]"
        />
      </div>
    </div>
  );
}
