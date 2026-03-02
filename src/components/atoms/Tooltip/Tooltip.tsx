import React, { useState, useRef, useEffect } from "react";
import style from "./Tooltip.module.scss";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    setPosition({
      top: rect.top - 8,
      left: rect.left + rect.width / 2,
    });
  }, [visible]);

  return (
    <div
      ref={triggerRef}
      className={style.wrapper}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={-1}
    >
      {children}

      {visible && (
        <div
          role="tooltip"
          className={style.tooltip}
          style={{ top: position.top, left: position.left }}
        >
          {content}
        </div>
      )}
    </div>
  );
};
