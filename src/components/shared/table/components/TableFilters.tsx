/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, CalendarDays, X } from "lucide-react";
import BodyThree from "@/components/typography/BodyThree";
import BodyOne from "@/components/typography/BodyOne";
import BodySix from "@/components/typography/BodySix";

interface AdvancedFilterConfigType {
  key: string;
  label: string;
  type: "select" | "multiselect" | "input" | "number" | "checkbox";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface TableFiltersProps {
  title: string;
  filters?: Record<string, any>;
  onFiltersChange?: (filters: any) => void;
  quickFilterConfig?: {
    key: string;
    placeholder?: string;
    options?: { value: string; label: string }[];
  };
  advancedFilterConfig?: AdvancedFilterConfigType[];
  addDateRangeFilter?: boolean;
  removeSearch?: boolean;
  addCta?: boolean; // Automatically removes search when true
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaLogo?: React.ReactNode;
  // Add these new props
  tabs?: TableFiltersProps[];
  activeTab?: number;
  onTabChange?: (tabIndex: number) => void;
}

const TableFilters = ({
  title,
  filters = {},
  onFiltersChange,
  quickFilterConfig = {
    key: "",
  },
  advancedFilterConfig = [],
  addDateRangeFilter,
  removeSearch,
  tabs,
  activeTab,
  onTabChange,
  addCta,
  ctaLabel,
  onCtaClick,
  ctaLogo,
}: TableFiltersProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: filters.startDate || null,
    to: filters.endDate || null,
  });

  const handleQuickFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters };
    if (value === "all" || value === "") {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    if (onFiltersChange) onFiltersChange(newFilters);
  };

  const handleAdvancedFilterChange = (
    key: string,
    value: string | null | undefined | boolean,
    type = "string"
  ) => {
    const newFilters = { ...filters };

    if (type === "array") {
      if (newFilters[key]) newFilters[key] = newFilters[key].split(",");
      if (!newFilters[key]) newFilters[key] = [];
      const currentArray = [...newFilters[key]];
      const index = currentArray.indexOf(value);

      if (index > -1) {
        currentArray.splice(index, 1);
      } else {
        currentArray.push(value);
      }

      if (currentArray.length === 0) {
        delete newFilters[key];
      } else {
        newFilters[key] = currentArray.join(",");
      }
    } else if (type === "boolean") {
      // Handle boolean values for checkbox
      if (value === false || value === null || value === undefined) {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
    } else if (value === "" || value === null || value === undefined) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }

    if (onFiltersChange) onFiltersChange(newFilters);
  };

  const handleDateRangeChange = (field: string, date: Date | undefined) => {
    const newDateRange = { ...dateRange, [field]: date };
    setDateRange(newDateRange);

    const newFilters = { ...filters };
    if (field === "from") {
      if (date) {
        newFilters.startDate = date.toISOString();
      } else {
        delete newFilters.startDate;
      }
    } else {
      if (date) {
        newFilters.endDate = date.toISOString();
      } else {
        delete newFilters.endDate;
      }
    }

    if (onFiltersChange) onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    setDateRange({ from: null, to: null });
    if (onFiltersChange) onFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    return Object.keys(filters).length;
  };

  const renderAdvancedFilter = (config: AdvancedFilterConfigType) => {
    const { key, label, type, options, placeholder } = config;

    switch (type) {
      case "select":
        return (
          <div key={key} className="space-y-2">
            <Label>{label}</Label>
            <Select
              value={filters[key] || ""}
              onValueChange={(value) => handleAdvancedFilterChange(key, value)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={placeholder || `Select ${label.toLowerCase()}`}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {options?.map((option: { value: string; label: string }) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "multiselect":
        return (
          <div key={key} className="space-y-2">
            <Label>{label}</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {options?.map((option: { value: string; label: string }) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${key}-${option.value}`}
                    checked={filters[key]?.includes(option.value) || false}
                    onCheckedChange={() =>
                      handleAdvancedFilterChange(
                        key,
                        option.value != null ? option.value : "",
                        "array"
                      )
                    }
                  />
                  <Label htmlFor={`${key}-${option.value}`} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case "input":
        return (
          <div key={key} className="space-y-2">
            <Label>{label}</Label>
            <Input
              placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              value={filters[key] || ""}
              onChange={(e) => handleAdvancedFilterChange(key, e.target.value)}
            />
          </div>
        );

      case "number":
        return (
          <div key={key} className="space-y-2">
            <Label>{label}</Label>
            <Input
              type="number"
              placeholder={placeholder || `Enter ${label.toLowerCase()}`}
              value={filters[key] || ""}
              onChange={(e) =>
                handleAdvancedFilterChange(
                  key,
                  e.target.value ? String(Number(e.target.value)) : ""
                )
              }
            />
          </div>
        );

      case "checkbox":
        return (
          <div key={key} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={filters[key] || false}
                onCheckedChange={(checked) =>
                  handleAdvancedFilterChange(key, checked, "boolean")
                }
              />
              <Label htmlFor={key} className="text-sm font-normal">
                {label}
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-between pb-[30px] hidden">
      <div className="flex items-center space-x-2">
        {tabs && tabs.length > 1 ? (
          <div className="flex items-center">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => onTabChange?.(index)}
                className={`px-8 py-1.5 transition-all duration-200 ${
                  activeTab === index
                    ? "text-primary border-b-[3px] border-primary"
                    : "text-[#B2B1B1] hover:bg-gray-100 border-b-[1.2px] border-[#CFD0D3]"
                }`}
              >
                <BodyOne className="font-[500]">{tab.title}</BodyOne>
              </button>
            ))}
          </div>
        ) : (
          <BodyThree className="font-[500] text-text-brand">{title}</BodyThree>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {/* Quick Filter Dropdown */}
        {quickFilterConfig.key && onFiltersChange && (
          <Select
            value={filters[quickFilterConfig.key] || "all"}
            onValueChange={(value) =>
              handleQuickFilterChange(quickFilterConfig.key, value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={quickFilterConfig.placeholder || "Filter"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {quickFilterConfig.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Advanced Filters Popover */}
        {advancedFilterConfig && onFiltersChange && (
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {getActiveFiltersCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filters</h4>
                  {getActiveFiltersCount() > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-sm"
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                {/* Date Range Filter */}
                {addDateRangeFilter && (
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {dateRange.from
                              ? dateRange.from.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                                })
                              : "From"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={dateRange.from}
                            onSelect={(date) =>
                              handleDateRangeChange("from", date)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {dateRange.to
                              ? dateRange.to.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric",
                                })
                              : "To"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={dateRange.to}
                            onSelect={(date) =>
                              handleDateRangeChange("to", date)
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {(dateRange.from || dateRange.to) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDateRange({ from: null, to: null });
                          const newFilters = { ...filters };
                          delete newFilters.startDate;
                          delete newFilters.endDate;
                          if (onFiltersChange) onFiltersChange(newFilters);
                        }}
                        className="w-full"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Clear dates
                      </Button>
                    )}
                  </div>
                )}

                {/* Dynamic Advanced Filters */}
                {advancedFilterConfig.map(renderAdvancedFilter)}

                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPopoverOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Search Input */}
      {!removeSearch && !addCta && (
        <div className="flex items-center space-x-2 max-md:hidden">
          <Input
            placeholder="Search..."
            value={filters.searchTerm || ""}
            onChange={(e) =>
              handleAdvancedFilterChange("searchTerm", e.target.value)
            }
            className="w-64"
          />
        </div>
      )}

      {/* Call to Action Button */}
      {addCta && (
        <Button
          onClick={onCtaClick}
          className="flex items-center gap-[10px] rounded-[30px] px-[18px] py-[8px] bg-primary hover:bg-primary/90 relative top-[10px] max-md:hidden"
        >
          {ctaLogo}
          <BodySix>{ctaLabel || "Create New"}</BodySix>
        </Button>
      )}
    </div>
  );
};

export default TableFilters;
