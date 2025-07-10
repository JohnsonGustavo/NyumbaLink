
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Property = Tables<'properties'> & {
  profiles?: {
    full_name: string | null;
    phone: string | null;
  };
};

export const useProperties = () => {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      console.log('Fetching properties...');
      
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          profiles!properties_landlord_id_fkey (
            full_name,
            phone
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error);
        throw error;
      }

      // Transform the data to match our Property type
      // Supabase returns profiles as an array, but we need a single object
      const transformedData = data?.map(property => ({
        ...property,
        profiles: Array.isArray(property.profiles) && property.profiles.length > 0 
          ? property.profiles[0] 
          : undefined
      })) || [];

      console.log('Properties fetched successfully:', transformedData);
      return transformedData as Property[];
    },
  });
};
