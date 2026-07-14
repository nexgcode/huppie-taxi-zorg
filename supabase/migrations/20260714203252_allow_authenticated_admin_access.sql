drop policy if exists "Admins can read form submissions" on public.contact_submissions;
drop policy if exists "Huppie staff can read submissions" on public.contact_submissions;
drop policy if exists "Admins can read ride requests" on public.ride_requests;
drop policy if exists "Huppie staff can read ride requests" on public.ride_requests;
drop policy if exists "Admins can read partner requests" on public.partner_requests;
drop policy if exists "Huppie staff can read partner requests" on public.partner_requests;
drop policy if exists "Admins can read driver applications" on public.driver_applications;
drop policy if exists "Huppie staff can read driver applications" on public.driver_applications;
drop policy if exists "Admins can read driver documents" on public.driver_application_documents;
drop policy if exists "Huppie staff can read driver documents" on public.driver_application_documents;

create policy "Authenticated users can read contact submissions"
on public.contact_submissions for select to authenticated using (true);

create policy "Authenticated users can read ride requests"
on public.ride_requests for select to authenticated using (true);

create policy "Authenticated users can read partner requests"
on public.partner_requests for select to authenticated using (true);

create policy "Authenticated users can read driver applications"
on public.driver_applications for select to authenticated using (true);

create policy "Authenticated users can read driver documents"
on public.driver_application_documents for select to authenticated using (true);

drop policy if exists "Admins can update contact submissions" on public.contact_submissions;
drop policy if exists "Huppie admins can update contact submissions" on public.contact_submissions;
drop policy if exists "Admins can update ride requests" on public.ride_requests;
drop policy if exists "Huppie admins can update ride requests" on public.ride_requests;
drop policy if exists "Admins can update partner requests" on public.partner_requests;
drop policy if exists "Huppie admins can update partner requests" on public.partner_requests;
drop policy if exists "Admins can update driver applications" on public.driver_applications;
drop policy if exists "Huppie admins can update driver applications" on public.driver_applications;

create policy "Authenticated users can update contact submissions"
on public.contact_submissions for update to authenticated using (true) with check (true);

create policy "Authenticated users can update ride requests"
on public.ride_requests for update to authenticated using (true) with check (true);

create policy "Authenticated users can update partner requests"
on public.partner_requests for update to authenticated using (true) with check (true);

create policy "Authenticated users can update driver applications"
on public.driver_applications for update to authenticated using (true) with check (true);

drop policy if exists "Admins can download driver documents" on storage.objects;
drop policy if exists "Huppie staff can download driver files" on storage.objects;

create policy "Authenticated users can download driver documents"
on storage.objects for select to authenticated
using (bucket_id = 'driver-application-documents');
