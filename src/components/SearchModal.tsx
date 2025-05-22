"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/use-debounce";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

// Mock products data - replace with your actual data fetching logic
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium T-Shirt",
    category: "Clothing",
    price: 29.99,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    name: "Leather Wallet",
    category: "Accessories",
    price: 49.99,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "4",
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "5",
    name: "Running Shoes",
    category: "Footwear",
    price: 79.99,
    image: "/placeholder.svg?height=80&width=80",
  },
];

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Search function
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      setResults([]);
      return;
    }

    const searchQuery = debouncedQuery.toLowerCase();
    const filtered = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)
    );
    setResults(filtered);
  }, [debouncedQuery]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full cursor-pointer"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="px-4 pt-4 pb-0">
          <div className="flex items-center border-b">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-2"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto p-4">
          {debouncedQuery.trim() === "" ? (
            <div className="text-center py-6 text-muted-foreground">
              Start typing to search products
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No products found for &quot;{debouncedQuery}&quot;
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {results.length} {results.length === 1 ? "result" : "results"}{" "}
                found
              </p>
              <div className="space-y-2">
                {results.map((product) => (
                  <SearchResult
                    key={product.id}
                    product={product}
                    setOpen={setOpen}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SearchResult({
  product,
  setOpen,
}: {
  product: Product;
  setOpen: (open: boolean) => void;
}) {
  return (
    <a
      href={`/product/${product.id}`}
      className="flex items-center gap-4 p-2 rounded-md hover:bg-muted transition-colors"
      onClick={() => setOpen(false)}
    >
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        className="h-16 w-16 object-cover rounded-md"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm">{product.name}</h4>
        <p className="text-sm text-muted-foreground">{product.category}</p>
      </div>
      <div className="text-sm font-medium">${product.price.toFixed(2)}</div>
    </a>
  );
}
