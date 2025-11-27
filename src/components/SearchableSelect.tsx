import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Plus, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchableSelectProps {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
  onAddNew?: (newItem: string) => void;
  disabled?: boolean;
  required?: boolean;

  /** NEW — lazy load + searching */
  onLoadMore?: () => void;
  onSearchChange?: (query: string) => void;
  loading?: boolean;
}

const SearchableSelect = ({
  label,
  placeholder,
  value,
  options,
  onValueChange,
  onAddNew,
  disabled = false,
  required = false,

  // NEW
  onLoadMore,
  onSearchChange,
  loading = false,
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔍 Trigger backend search
  useEffect(() => {
    if (onSearchChange) onSearchChange(searchTerm);
  }, [searchTerm]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onValueChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleAddNew = () => {
    if (searchTerm.trim() && onAddNew) {
      onAddNew(searchTerm.trim());
      onValueChange(searchTerm.trim());
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <Label>
        {label} {required && "*"}
      </Label>

      <div className="relative">
        <Button
          type="button"
          variant="outline"
          className={`w-full justify-between ${disabled ? "opacity-50" : ""}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {value || placeholder}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-hidden"
            >
              {/* Search Box */}
              <div className="p-2 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                    autoFocus
                  />
                </div>
              </div>

              {/* Scrollable List */}
              <div
                className="max-h-40 overflow-y-auto"
                onScroll={(e) => {
                  const target = e.currentTarget;
                  if (
                    target.scrollTop + target.clientHeight >=
                    target.scrollHeight - 20
                  ) {
                    onLoadMore?.(); // 🔥 Lazy load next batch
                  }
                }}
              >
                {filteredOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="w-full text-left px-3 py-2 hover:bg-muted text-sm"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </button>
                ))}

                {loading && (
                  <div className="px-3 py-2 text-center text-sm text-gray-400">
                    Loading more...
                  </div>
                )}
              </div>

              {/* Create new */}
              {onAddNew && searchTerm.trim() && (
                <div className="border-t p-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={handleAddNew}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create "{searchTerm.trim()}"
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchableSelect;
