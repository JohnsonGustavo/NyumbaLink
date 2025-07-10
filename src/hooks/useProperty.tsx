import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Property } from './useProperties';

export const useProperty = (id: string | undefined) => {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('Property ID is required');
      }

      console.log('Fetching property with ID:', id);
      
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          profiles!fk_landlord_profile (
            full_name,
            phone
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching property:', error);
        throw error;
      }

      // Transform the data to match our Property type
      const transformedProperty = {
        ...data,
        profiles: Array.isArray(data.profiles) && data.profiles.length > 0 
          ? data.profiles[0] 
          : undefined
      } as Property;

      console.log('Property fetched successfully:', transformedProperty);
      return transformedProperty;
    },
    enabled: !!id, // Only run query if ID exists
  });
};