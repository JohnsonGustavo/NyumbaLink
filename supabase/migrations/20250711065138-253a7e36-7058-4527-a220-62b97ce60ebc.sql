-- Add foreign key constraint from properties.landlord_id to profiles.user_id
ALTER TABLE public.properties 
ADD CONSTRAINT fk_landlord_profile 
FOREIGN KEY (landlord_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;