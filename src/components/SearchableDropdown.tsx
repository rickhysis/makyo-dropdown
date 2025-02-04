import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "../assets/close.svg";
import SearchIcon from "../assets/search.svg";
import ArrowDownIcon from "../assets/arrow-down.svg";

export interface Option {
    label: string;
    value: string | number;
}

export interface SearchableDropdownProps {
    id?: string;
    withSearch: boolean;
    options: Option[];
    multiple: boolean;
    optionLabel?: string;
    onChange: (selected: Option | Option[] | null) => void;
    outlined?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
    id,
    withSearch = true,
    options,
    multiple = false,
    optionLabel,
    onChange,
    outlined = false,
}) => {
    const [selectedOptions, setSelectedOptions] = useState<Option | Option[] | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const filteredOptions = searchTerm
        ? options.filter((opt) => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
        : options;

    const handleSelect = (option: Option) => {
        let newSelection: Option | Option[] | null;

        if (multiple) {
            newSelection = Array.isArray(selectedOptions)
                ? selectedOptions.includes(option)
                    ? selectedOptions.filter((o) => o.value !== option.value)
                    : [...selectedOptions, option]
                : [option];
        } else {
            newSelection = option;
            setIsOpen(false);
        }

        setSelectedOptions(newSelection);
        onChange(newSelection);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }, [isOpen]);

    const highlightText = (label: string) => {
        if (!searchTerm) return label;

        const parts = label.split(new RegExp(`(${searchTerm})`, "gi"));
        return parts.map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ? (
                <span key={index} className="bg-blue-300">{part}</span>
            ) : (
                part
            )
        );
    };

    const removeItem = (itemToRemove: Option) => {
        if (Array.isArray(selectedOptions)) {
            const updatedItems = selectedOptions.filter((item) => item !== itemToRemove);
            setSelectedOptions(updatedItems);
        }
    };

    const dropdownContent = (
        <>
            <div ref={buttonRef} className="relative w-full">
                <div
                    className="p-2 border rounded-lg bg-white cursor-pointer flex justify-between items-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex gap-2">
                        {multiple
                            ? Array.isArray(selectedOptions) && selectedOptions.length > 0
                                ? selectedOptions.map((o) => (
                                    <span className="flex justify-between gap-2 rounded-xl bg-gray-200 px-2 py-1">
                                        {o.label}
                                        <img src={CloseIcon} alt="close" className="w-4" onClick={() => removeItem(o)} />
                                    </span>
                                ))
                                : optionLabel
                            : <span className="p-2">
                                {!Array.isArray(selectedOptions) ? selectedOptions?.label : optionLabel}
                            </span>
                        } &nbsp;
                    </div>
                    <img src={ArrowDownIcon} alt="arrow-down" className="w-4 mr-2" />
                </div>
            </div>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
                    style={{
                        top: dropdownPosition?.top || 0,
                        left: dropdownPosition?.left || 0,
                        width: dropdownPosition?.width || "auto",
                        position: "absolute",
                        zIndex: 1000,
                    }}
                >
                    {withSearch && (
                        <div className="flex gap-2 p-2">
                            <img src={SearchIcon} alt="search" className="w-5" />
                            <input
                                type="text"
                                className="w-full p-2 border-b outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    )}
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => {
                            const isSelected = Array.isArray(selectedOptions)
                                ? selectedOptions.some((o) => o.value === option.value)
                                : selectedOptions?.value === option.value;

                            return (
                                <div
                                    key={option.value}
                                    className={`p-2 cursor-pointer hover:bg-gray-100 ${isSelected ? "bg-blue-100" : ""
                                        }`}
                                    onClick={() => handleSelect(option)}
                                >
                                    {outlined ? highlightText(option.label) : option.label}
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-2 text-gray-500">No results found</div>
                    )}
                </div>
            )}
        </>
    )

    return (
        id && document.getElementById(id) ?
            createPortal(dropdownContent, document.getElementById(id)!)
            : dropdownContent
    );
};

export default SearchableDropdown;
