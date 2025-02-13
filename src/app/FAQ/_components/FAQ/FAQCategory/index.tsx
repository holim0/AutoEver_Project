import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

const FAQCategory = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-[var(--px-md)]">
      <ul className="flex flex-wrap">{children}</ul>
    </div>
  );
};

interface FAQCategoryItemProps {
  name: string;
  isChecked: boolean;
  onChange: () => void;
}

const FAQCategoryItem = ({ name, isChecked, onChange }: FAQCategoryItemProps) => (
  <label className="relative cursor-pointer h-[var(--btn-md)]">
    <input type="radio" name="filter" checked={isChecked} onChange={onChange} className="hidden" />
    <span
      className={cn(
        'flex items-center px-[var(--space-sm)] transition-all rounded-full font-semibold h-full',
        isChecked ? 'bg-mint-900 text-white' : 'text-gray-900'
      )}
    >
      {name}
    </span>
  </label>
);

FAQCategory.Item = FAQCategoryItem;
export default FAQCategory;
