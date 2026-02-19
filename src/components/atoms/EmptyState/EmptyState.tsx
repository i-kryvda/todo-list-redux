import { TiLightbulb } from "react-icons/ti";
import clsx from "clsx";
import s from "./EmptyState.module.scss";

export function EmptyState() {
  return (
    <div className={s.emptyState}>
      <div className={s.emptyStateHeader}>
        <TiLightbulb size={20} aria-hidden="true" />
        <p className={s.emptyStateText}>The first step is always small.</p>
      </div>

      <div className={clsx(s.emptyStateBar, s.emptyStateBarLong)} />
      <div className={clsx(s.emptyStateBar, s.emptyStateBarLong)} />
      <div className={clsx(s.emptyStateBar, s.emptyStateBarShort)} />
    </div>
  );
}
