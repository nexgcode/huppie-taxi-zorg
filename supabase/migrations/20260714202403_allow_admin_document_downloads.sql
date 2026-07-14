create policy "Admins can download driver documents"
on storage.objects for select to authenticated
using (
  bucket_id = 'driver-application-documents'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);
