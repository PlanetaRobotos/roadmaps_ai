// SearchInput.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from '@/components/icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Debounce function to delay the filtering
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Handle input change with debounce
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    debouncedFetch(newValue);
  };

  // Fetch suggestions from the API
  const fetchSuggestions = async (input: string) => {
    if (input.trim() === '') {
      setFilteredSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `/api/suggestions?query=${encodeURIComponent(input)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }
      const data = await response.json();
      setFilteredSuggestions(data.suggestions);
      setIsDropdownOpen(data.suggestions.length > 0);
    } catch (err) {
      console.error(err);
      setError('Error fetching suggestions');
      setIsDropdownOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a debounced version of the fetch function
  const debouncedFetch = useCallback(debounce(fetchSuggestions, 300), []);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle selecting a suggestion
  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setFilteredSuggestions([]);
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (
        highlightedIndex >= 0 &&
        highlightedIndex < filteredSuggestions.length
      ) {
        handleSelect(filteredSuggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    if (
      highlightedIndex >= 0 &&
      highlightedIndex < filteredSuggestions.length
    ) {
      const suggestionElement = document.getElementById(
        `suggestion-${highlightedIndex}`
      );
      suggestionElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [highlightedIndex, filteredSuggestions]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type to create a new course..."
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
        onFocus={() => {
          if (filteredSuggestions.length > 0) {
            setIsDropdownOpen(true);
          }
        }}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-expanded={isDropdownOpen}
        ref={inputRef}
      />
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            className="absolute left-0 right-0 z-10 mt-1 rounded-md border border-gray-300 bg-white shadow-lg"
            role="listbox"
            id="suggestions-list"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.1 }}
          >
            <ul className="max-h-60 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  id={`suggestion-${index}`}
                  role="option"
                  aria-selected={highlightedIndex === index}
                  className={`cursor-pointer px-4 py-2 ${
                    highlightedIndex === index ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => handleSelect(suggestion)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {suggestion}
                </li>
              ))}
              {error && <li className="px-4 py-2 text-red-500">{error}</li>}
              {isLoading && (
                <li className="flex items-center px-4 py-2 text-gray-500">
                  <Icons.spinner className="mr-2 animate-spin" />
                  Cooking up your roadmap magic!
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
