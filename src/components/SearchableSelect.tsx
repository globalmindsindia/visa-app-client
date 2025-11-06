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
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddNew, setShowAddNew] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sort options alphabetically
  const sortedOptions = [...options].sort((a, b) => a.localeCompare(b));

  // Filter options based on search term
  const filteredOptions = sortedOptions.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if search term matches any existing option
  const exactMatch = sortedOptions.some(option => 
    option.toLowerCase() === searchTerm.toLowerCase()
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
        setShowAddNew(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onValueChange(option);
    setIsOpen(false);
    setSearchTerm("");
    setShowAddNew(false);
  };

  const handleAddNew = () => {
    if (searchTerm.trim() && onAddNew && !exactMatch) {
      onAddNew(searchTerm.trim());
      onValueChange(searchTerm.trim());
      setIsOpen(false);
      setSearchTerm("");
      setShowAddNew(false);
    }
  };

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <Label>{label} {required && "*"}</Label>
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          className={`w-full justify-between ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {value || placeholder}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
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
              <div className="p-2 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowAddNew(e.target.value.trim().length > 0 && !exactMatch);
                    }}
                    className="pl-8"
                    autoFocus
                  />
                </div>
              </div>

              <div className="max-h-40 overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-sm"
                      onClick={() => handleSelect(option)}
                    >
                      {option}
                    </button>
                  ))
                ) : searchTerm ? (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    No results found
                  </div>
                ) : (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Start typing to search...
                  </div>
                )}
              </div>

              {onAddNew && searchTerm.trim() && !exactMatch && (
                <div className="border-t p-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-primary hover:text-primary hover:bg-primary/10"
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