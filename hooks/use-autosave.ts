//use-autosav.ts
"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

type AutosaveFunction = () => void | Promise<void>;

export const useAutosave = (
  saveFn: AutosaveFunction,
  data: any,
  options: {
    debounceMs?: number;
    showToast?: boolean;
    saveOnUnmount?: boolean;
  } = {}
) => {
  const { 
    debounceMs = 1500, 
    showToast = true,
    saveOnUnmount = true 
  } = options;
  
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dataRef = useRef(data);
  const saveFnRef = useRef(saveFn);
  

  useEffect(() => {
    dataRef.current = data;
    saveFnRef.current = saveFn;
  }, [data, saveFn]);
  
  // Save function with toast
  const save = async () => {
    try {
      await saveFnRef.current();
      if (showToast) {
        toast({
          description: "Changes saved",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to save",
        description: "Your changes could not be saved. Please try again.",
      });
      console.error("Autosave error:", error);
    }
  };
  

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      save();
    }, debounceMs);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, debounceMs]);
  
  // Save on unmount
  useEffect(() => {
    return () => {
      if (saveOnUnmount && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        save();
      }
    };
  }, [saveOnUnmount]);
  
  // Return function to manually save
  return {
    saveNow: save,
    cancelSave: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
  };
};